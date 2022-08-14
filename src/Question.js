import React from "react"

export default function Question(props) {  
    let newArr = [...props.incorretAnswers, props.correctAnswer];
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        } return array;
    }
    
    let [answerArr, setAnswerArr] = React.useState(shuffle(newArr));

    function fixText(str) {
        return str.replace(/&quot;/g,'"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&rsquo;/g,"’").replace(/&hellip;/g, '…').replace(/&rdquo;/, '"').replace(/&ldquo;/, '"').replace(/&eacute;/g,"é");
    }
    
    function answerStyle(str) {
        if (props.gameState == "finished") {
            if (str == props.correctAnswer) {
                return "correct-markedAnswer";
            }        
        }
    }
    
    const answersElem = answerArr.map(answer => (
        <div key={answer} className="flex">
            <input 
                type="radio" 
                id={`${props.question} ${answer}`} 
                name={props.question} 
                value={answer} 
                onChange={props.onChange}/>
            <label htmlFor={`${props.question} ${answer}`} className={`${answerStyle(answer)}`}>{fixText(answer)}</label>
        </div>))
    
    return (
        <div>
            <h2>{fixText(props.question)}</h2>
                <div className="answer-box">
                    {answersElem}
                </div>
            <hr/>
        </div>
        )
}