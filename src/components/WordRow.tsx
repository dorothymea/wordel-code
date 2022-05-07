import {computeGuess, LetterState} from "../word-utils";

const LETTER_LENGTH = 5

interface WordRowProps{
    letters:string
}

function WordRow({letters:lettersProp = ''}:WordRowProps) {
    const lettersRemaining = LETTER_LENGTH - lettersProp.length
    const letters = lettersProp
        .split('')
        .concat(Array(lettersRemaining).fill(''))
    const guessState = computeGuess(lettersProp)

    return (
        <div className="grid grid-cols-5 gap-4">
            {letters.map((char,index)=> (
                <CharBox value={char} key={index} state={guessState[index]}/>
            ))}
        </div>
    )
}
interface CharBoxProps {
    value:string;
    state?:LetterState
}
function CharBox ({value,state}:CharBoxProps){
    const stateStyles = state == null ? '' : charStateStyles[state]
    return(
        <div className={`inline-block border-2 border border-gray-500 p-4  uppercase font-bold text-2xl text-center ${stateStyles}`}>
            {value}
        </div>
    )

}
const charStateStyles = {
    [LetterState.Miss]:'bg-gray-400 border-gray-400',
    [LetterState.Present]:'bg-yellow-400 border-yellow-400',
    [LetterState.Match]:'bg-green-400 border-green-400'
}
export default WordRow

























