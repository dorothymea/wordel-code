import WordRow from "./components/WordRow";
import React, {useState} from "react";
import {useStore} from "./store";
import {LETTER_LENGTH} from "./word-utils";


const NUMBER_OF_GUESS = 6

function App() {
    const state = useStore()
    const [guess,setGuess] = useState('')
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const newGuess = e.target.value
        if(newGuess.length === LETTER_LENGTH){
            state.addGuess(newGuess)
            setGuess('')
            return
        }
        setGuess(newGuess)
    }
    let rows = [...state.guesses]
    if(rows.length < NUMBER_OF_GUESS ){
        rows.push(guess)
    }

    const guessesRemaining = NUMBER_OF_GUESS - rows.length
    rows = rows.concat(Array(guessesRemaining).fill(''))
    const isGameOver = state.guesses.length === NUMBER_OF_GUESS


    return (
        <div  className="mx-auto w-96">
            <header className="border-b border-gray-500 pb-2 my-2">
                <h1 className="text-4xl text-center">Wordle </h1>
                <div>
                    <input
                        type="text"
                        value={guess}
                        className="w-1/2 border-2 border-gray-500"
                        onChange={onChange}
                        disabled ={isGameOver}
                    />
                </div>
            </header>
            <main className="grid grid-rows-6 gap-4">
                {rows.map((word,index)=>(
                    <WordRow key={index} letters={word}/>
                ))}
            </main>
            {isGameOver && (
                <div role="modal"
                className="absolute bg-white rounded border border-gray-500 text-center left-0 right-0 top-1/4 p-6 w-1/4 mx-auto">
                    Game Over!
                    <button
                        onClick={state.newGame}
                    className="block border rounded border-green-400 bg-green-400 p-2 mt-4 mx-auto shadow"
                    >New Game</button>
                </div>
            )}
        </div>
    )
}

export default App
