import wordBank from './word-bank.json'


export enum LetterState{
    Miss,
    Present,
    Match
}
const word = getRandomWord()
console.log(word)
function getRandomWord():string{
    return wordBank[Math.floor(Math.random() * wordBank.length)]
}

function computeGuess(guess:string,answer:string=word):LetterState[]{
    const result:LetterState[] = []

    if(guess.length !== answer.length){return result}

    const guessArray = guess.split('')
    const answerArray = answer.split('')
    const answerLetterCount:Record<string, number> = {}

    guessArray.forEach((letter,index) =>{
        const currentAnswerLetter = answerArray[index]

        answerLetterCount[currentAnswerLetter]= answerLetterCount[currentAnswerLetter]?answerLetterCount[currentAnswerLetter]+1:1

        if(currentAnswerLetter === letter){
            result.push(LetterState.Match)
        }else if(answerArray.includes(letter)){
            result.push(LetterState.Present)
        }else {
            result.push(LetterState.Miss)
        }
    })

    result.forEach((curResult,resultIndex) =>{
        if(curResult !== LetterState.Present){return}
        const guessLetter = guessArray[resultIndex]

        answerArray.forEach((curAnswer,ansIndex)=>{
            if(curAnswer !== guessLetter){ return }
            if(result[ansIndex] === LetterState.Match){
                result[resultIndex] = LetterState.Miss
            }
            if(answerLetterCount[guessLetter]<=0){
                result[resultIndex] = LetterState.Miss
            }
        })
    })

    return result
}

export {getRandomWord, computeGuess}















