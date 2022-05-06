import wordBank from './word-bank.json'

export enum LetterState{
    Miss,
    Present,
    Match
}

function getRandomWord():string{
    return wordBank[Math.floor(Math.random() * wordBank.length)]
}

function computeGuess(guess:string,answer:string):LetterState[]{
    const result:LetterState[] = []
    const guessArray = guess.split('')
    const answerArray = answer.split('')

    guessArray.forEach((letter,index) =>{
        if(letter === answerArray[index]){
            result.push(LetterState.Match)
        }else if(answerArray.includes(letter)){
            result.push(LetterState.Present)
        }else {
            result.push(LetterState.Miss)
        }
    })

    return result
}

export {getRandomWord, computeGuess}