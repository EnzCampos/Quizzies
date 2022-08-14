import React from "react"

export default function NewGameTab(props) {
    return (
        <div>
            <h2 className="center">Select your game options:</h2>
            <form>
                <h4 className="options-select-text center">Number of questions</h4>
                <input 
                    type="number" 
                    max={50} min={1}
                    name="numberOfQuestions"
                    onChange={props.handleChange}
                    value={props.gameSettings.numberOfQuestions}
                    placeholder="Maximum of 50 questions"/>
                <h4 className="options-select-text center">Select the category</h4>
                <select id="category" name="category" onChange={props.handleChange} value={props.gameSettings.category}>
                    <option value="">Any category</option>
                    <option value={9}>General Knowlodge</option>
                    <option value={10}>Enternaiment: Books</option>
                    <option value={11}>Enternaiment: Film</option>
                    <option value={12}>Enternaiment: Music</option>
                    <option value={13}>Enternaiment: Musicals & Theatres</option>
                    <option value={14}>Enternaiment: Television</option>
                    <option value={15}>Enternaiment: Video Games</option>
                    <option value={16}>Enternaiment: Board Games</option>
                    <option value={17}>Science & Nature</option>
                    <option value={18}>Science: computers</option>
                    <option value={19}>Science: Mathematics</option>
                    <option value={20}>Mythology</option>
                    <option value={21}>Sports</option>
                    <option value={22}>Geography</option>
                    <option value={23}>History</option>
                    <option value={24}>Politics</option>
                    <option value={25}>Art</option>
                    <option value={26}>Celebrities</option>
                    <option value={27}>Animals</option>
                    <option value={28}>Vehicles</option>
                    <option value={29}>Enternaiment: Comics</option>
                    <option value={30}>Science: Gadgets</option>
                    <option value={31}>Enternaiment: Japanese Anime & Manga</option>
                    <option value={32}>Enternaiment: Cartoon & Animations</option>
                </select>
                <h4 className="options-select-text center">Select the difficulty</h4>
                <select id="difficulty" name="difficulty" onChange={props.handleChange} value={props.gameSettings.difficulty}>
                    <option value="">Any difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option> 
                </select>                   
            </form>
        </div>
    )
}