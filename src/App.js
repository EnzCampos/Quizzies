import React from "react"
import Question from "./Question.js"
import NewGameTab from "./Newgametab.js"

export default function App() {
    
    const [questData, setQuestions] = React.useState({"results":[{"question":"The Game is loading","correct_answer":"Loading","incorrect_answers":["0"]}]})
        
    const [gameState, setGameState] = React.useState("new")   
    const [formAnswers, setFormAnswers] = React.useState({})
    const [gameSettings, setGameSettings] = React.useState({
        numberOfQuestions: "5",
        category: "",
        difficulty: ""
    })
    
    function handleChange(event) {
        if (gameState == "finished") {
            return
        } else 
        setFormAnswers(prevFormAnswers => {
        return {
            ...prevFormAnswers,
            [event.target.name]: event.target.value
        }})
    }
    
    function changeSettings(event) {
        event.preventDefault();
        return setGameSettings(prevGameSettings => {
        return {
            ...prevGameSettings,
            [event.target.name]: event.target.value
        }});
    }
    
    function changeGameSettingsButton() {
        setGameState("new");
    }
    
    function finishGame() {
        setGameState("finished");
        setFormAnswers({})
    }
    
    const markedAnswers = Object.values(formAnswers);
    let correctAnswersCount = 0
    for (let i=0; i < questData.results.length; i++) {
        for (let j=0; j < markedAnswers.length; j++) {
            if (markedAnswers[j] == questData.results[i].correct_answer) {
                correctAnswersCount++
            }
        }
    }
    
    //Conditionally changes the request URL to the user set options
    
    function handleGameApi() {
        if (gameSettings.category) {
            if (gameSettings.difficulty) {
                return `&category=${gameSettings.category}&difficulty=${gameSettings.difficulty}`
            } return `&category=${gameSettings.category}`
        } if (gameSettings.difficulty) {
            return `&difficulty=${gameSettings.difficulty}`
        } 
        return ""
    }
    
    
    function newGame() {
        fetch(`https://opentdb.com/api.php?amount=${parseInt(gameSettings.numberOfQuestions, 10)}${handleGameApi()}`)
        .then(response => response.json())
        .then(data => setQuestions(data))
        setGameState("ongoing")
        setFormAnswers({})
        correctAnswersCount = 0
    }
    
    const questionsElem = questData.results.map(quest => (
        <Question 
            key={quest.question}
            question={quest.question} 
            correctAnswer={quest.correct_answer} 
            incorretAnswers={quest.incorrect_answers}
            onChange={handleChange}
            markedAnswers={markedAnswers}
            gameState={gameState}/>  
    ));
    
    return (
        <div className="main-content">
            <h1 className="main-title center">Quizzies</h1>
            {gameState === "new" && 
            <div>
                <NewGameTab 
                handleChange={changeSettings} 
                gameSettings={gameSettings} 
                />
                <button className="blue-button" onClick={newGame}>Start Game</button>
            </div>}
            {gameState !== "new" && 
            <div>
                {questionsElem}
                {gameState == "finished" ? 
                <button className="blue-button" onClick={newGame}>You got {correctAnswersCount} out of {questData.results.length} questions, Click to start a New Game</button> : 
                <button className="blue-button" onClick={finishGame}>Check Answers</button> }
                <button className="settings-button" onClick={changeGameSettingsButton}>Change Quiz Settings</button>
            </div>}
        </div>
    )
}