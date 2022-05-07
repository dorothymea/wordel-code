import {computeGuess, LETTER_LENGTH, LetterState} from "../word-utils";
import {useStore} from "../store";



interface WordRowProps{
    letters:string
}

function WordRow({letters:lettersProp = ''}:WordRowProps) {
    const answer = useStore(state => state.answer)
    const lettersRemaining = LETTER_LENGTH - lettersProp.length
    const letters = lettersProp
        .split('')
        .concat(Array(lettersRemaining).fill(''))
    const guessState = computeGuess(lettersProp,answer)

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
        <span className={`border-2 border border-gray-500 px-2  py-3 uppercase font-semibold text-4xl text-center before:inline-block before:content-['_'] ${stateStyles}`}>
            {value}
        </span>
    )

}
const charStateStyles = {
    [LetterState.Miss]:'bg-gray-400 border-gray-400',
    [LetterState.Present]:'bg-yellow-400 border-yellow-400',
    [LetterState.Match]:'bg-green-400 border-green-400'
}
export default WordRow

























