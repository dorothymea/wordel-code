import create from "zustand"
import {persist} from "zustand/middleware"
import {computeGuess, getRandomWord, LetterState} from "./word-utils";

interface StoreState{
    answer:string;
    rows:GuessRow[];
    addGuess:(guess:string) =>void;
    newGame:()=> void;
    gameState:'playing'|'win'|'lose'
}
interface GuessRow{
    guess:string;
    result?:LetterState[];
}

export const useStore = create<StoreState>(
    persist(
        (set, get) => ({
            answer: getRandomWord(),
            rows:[],
            gameState:'playing',
            addGuess:(guess:string) =>{
                const result = computeGuess(guess,get().answer)
                const didWin = result.every(i=> i === LetterState.Match)
                const rows = [
                    ...get().rows,
                    {
                        guess,
                        result
                    }
                ]

                set((state) =>({
                    rows,
                    gameState:didWin ? 'win':rows.length ===6 ? 'lose':'playing'
                }))
            } ,
            newGame:()=>{
                set({
                    answer:getRandomWord(),
                    rows:[],
                    gameState:'playing'
                })
            }
        }),
        {
            name: 'wordle',
            getStorage: () => localStorage,
        }
    )
);