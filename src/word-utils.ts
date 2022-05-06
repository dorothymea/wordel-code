import wordBank from './word-bank.json'

export default function getRandomWord():string{
    return wordBank[Math.floor(Math.random() * wordBank.length)]
}

