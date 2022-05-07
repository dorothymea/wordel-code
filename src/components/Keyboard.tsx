import React from "react";
import {useStore} from "../store";
import {LetterState} from "../word-utils";

interface KeyboardProps {
    onClick:(key:string) => void
}

const keys =[
    ['q','w','e','r','t','y','u','i','o','p'],
    ['','a','s','d','f','g','h','j','k','l',''],
    ['Enter','z','x','c','v','b','n','m','Backspace']
]

const keyStateStyles = {
    [LetterState.Miss]:' bg-gray-500',
    [LetterState.Present]:' bg-yellow-400',
    [LetterState.Match]:' bg-green-400'
}

function Keyboard({onClick:onClickProp}:KeyboardProps){
    const keyboardLetterSate = useStore((s) => s.keyboardLetterState)
    console.log(keyboardLetterSate);

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        const {textContent,innerHTML} = e.currentTarget
        onClickProp(textContent!)
        console.log(textContent)
    }
    return (
        <div className="flex flex-col">
            {keys.map((keysRow ,rowIndex)=> {
                return <div key={rowIndex} className="flex justify-center space-x-1 my-2">
                    {keysRow.map((key,index )=> {
                        let styles = "rounded font-semibold uppercase flex-1 py-2"

                        if(key === ''){styles += ' pointer-events-none'}
                        const letterState = keyStateStyles[keyboardLetterSate[key]]
                        if(letterState){
                            styles += `${letterState}`
                        }else if(key !== ''){styles += ' bg-gray-300'}
                        return <button onClick={onClick} className={styles} key={index}>{key}</button>
                    })}
                </div>
            })}
        </div>
    )


}

export default Keyboard