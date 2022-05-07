import imhURL from '../help.png'

function Help(show:boolean){
    const page = (<div className='w-full h-full bg-opacity-50'>
        <div className="flex flex-col justify-center bg-gray-50">
            <p>Guess the WORDLE in six tries.</p>
            <p>
                Each guess must be a valid five-letter word. Hit the enter button to submit.
            </p>
            <p>
                After each guess, the color of the tiles will change to show how close your guess was to the word.
            </p>
            <img src={imhURL} alt=""/>
            <button className='border rounded w-1/2'>Close</button>
        </div>
    </div>)

}
export default Help