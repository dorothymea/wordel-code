import WordRow from "./components/WordRow";
import React, {useEffect, useRef, useState} from "react";
import {useStore} from "./store";
import {isValidWord, LETTER_LENGTH} from "./word-utils";
import Keyboard from "./components/Keyboard";


const NUMBER_OF_GUESS = 6

function App() {
    const state = useStore()
    const [guess,setGuess] = useGuess()

    const [showInvalidGuess,setInvalidGuess] = useState(false)
    useEffect(()=>{
        let id:any
        if(showInvalidGuess){
            id = setTimeout(()=>setInvalidGuess(false),1000)
        }
        return ()=> clearTimeout(id)
    },[showInvalidGuess])

    const addGuess = useStore(s => s.addGuess)
    const preGuess = usePrevious(guess)
    useEffect(()=>{
        if(guess.length ===0 && preGuess?.length ===LETTER_LENGTH){
            if(isValidWord(preGuess)){
                setInvalidGuess(false)
                addGuess(preGuess)
            }else {
                setInvalidGuess(true)
                setGuess(preGuess)
            }

        }
    },[guess])

    let rows = [...state.rows]
    let curRow = 0
    if(rows.length < NUMBER_OF_GUESS ){
        curRow = rows.push({guess}) -1
    }

    const guessesRemaining = NUMBER_OF_GUESS - rows.length
    rows = rows.concat(Array(guessesRemaining).fill(''))
    const isGameOver = state.gameState !== 'playing'


    return (
        <div  className="mx-auto w-96">
            <header className="border-b border-gray-500 pb-2 my-2">
                <h1 className="text-4xl text-center">Wordle </h1>
            </header>
            <main className="grid grid-rows-6 gap-4">
                {rows.map(({guess,result},index)=>(
                    <WordRow key={index} letters={guess} result = {result} className={showInvalidGuess && index === curRow ? 'animate-bounce':''}/>
                ))}
            </main>
            <Keyboard/>
            {isGameOver && (
                <div role="modal"
                className="absolute bg-white rounded border border-gray-500 text-center left-0 right-0 top-1/4 p-6 w-1/2 mx-auto">
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

function useGuess(){

    const guessState = useState('')
    const [guess,setGuess] = guessState

    const onKeyDown = (e:KeyboardEvent)=>{

        setGuess((curGuess)=>{
            let letter = e.key

            const newGuess = letter.length === 1 && curGuess.length !== LETTER_LENGTH ? curGuess + letter : curGuess

            switch (e.key){
                case 'Backspace':
                    return newGuess.slice(0,-1)
                case 'Enter':
                    if(newGuess.length === LETTER_LENGTH){
                        return ''
                    }
            }
            if(newGuess.length === LETTER_LENGTH){return newGuess}
            return newGuess
        })

    }

    useEffect(()=>{
        document.addEventListener('keydown',onKeyDown)
        return ()=>{
            document.addEventListener('keydown',onKeyDown)
        }
    },[])



    return guessState
}
function usePrevious<T>(value:T):T{
    const ref:any = useRef<T>()

    useEffect(()=>{
        ref.current = value
    },[value])

    return ref.current
}


export default App
