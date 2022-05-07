import create from "zustand"
import {persist} from "zustand/middleware"
import {computeGuess, getRandomWord, LetterState} from "./word-utils";

interface StoreState{
    answer:string;
    rows:GuessRow[];
    addGuess:(guess:string) =>void;
    newGame:()=> void;
    gameState:'playing'|'win'|'lose';
    keyboardLetterState:{[letter:string]:LetterState}
}
interface GuessRow{
    guess:string;
    result?:LetterState[];
}

export const useStore = create<StoreState>(
    persist(
        (set, get) => {
            function addGuess(guess:string){
                const result = computeGuess(guess, get().answer);

                const rows = get().rows.concat({
                    guess,
                    result,
                });
                const didWin = result.every((i) => i === LetterState.Match)
                const keyboardLetterState = get().keyboardLetterState
                result.forEach((r,index) =>{
                    const resultGuessLetter = guess[index]
                    const curLetterState = keyboardLetterState[resultGuessLetter]
                    switch (curLetterState) {
                        case LetterState.Match:
                            break;
                        case LetterState.Present:
                            if (r === LetterState.Miss) {
                                break;
                            }
                        default:
                            keyboardLetterState[resultGuessLetter] = r;
                            break;
                    }
                })
                set({
                    rows,
                    gameState: didWin ? 'win' : rows.length === 6 ? 'lose' : 'playing',
                });
            }
            return {
                answer: getRandomWord(),
                rows: [],
                gameState: 'playing',
                keyboardLetterState: {},
                addGuess,
                newGame(initialRows = []) {
                    set({
                        gameState: 'playing',
                        answer: getRandomWord(),
                        rows: [],
                        keyboardLetterState: {},
                    });
                }
            }
        },
        {
            name: 'wordle',
            getStorage: () => localStorage,
        }
    )
);