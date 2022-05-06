import WordRow from "./components/WordRow";
function App() {
    return (
        <div  className="mx-auto w-96">
            <header className="border-b border-gray-500 pb-2 my-2">
                <h1 className="text-4xl text-center">Wordle </h1>
            </header>
            <main>
                <WordRow letters='hello'/>
                <WordRow letters='world'/>
            </main>
        </div>
    )
}

export default App
