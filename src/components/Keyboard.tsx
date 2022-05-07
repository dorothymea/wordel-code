import React from "react";

interface KeyboardProps {
    onClick:(key:string) => void
}

const keys =[
    ['q','w','e','r','t','y','u','i','o','p'],
    ['','a','s','d','f','g','h','j','k','l',''],
    ['Enter','z','x','c','v','b','n','m','Backspace']
]

function Keyboard({onClick:onClickProp}:KeyboardProps){
    // const keyboardLetterSate = useStore((s) => s.keyboardLetterState)

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
                        if(key !== ''){styles += ' bg-gray-400'}
                        if(key === ''){styles += ' pointer-events-none'}
                        return <button onClick={onClick} className={styles} key={index}>{key}</button>
                    })}
                </div>
            })}
        </div>
    )


}

export default Keyboard