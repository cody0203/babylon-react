import './App.css'
import BabylonExample from "./components/BabylonExample";
import LoadingScreen from "./components/LoadingScreen";

function App() {
    return (
        <div className="App">
            <h3>
                Babylon Example
            </h3>
            <LoadingScreen/>
            <BabylonExample/>
        </div>
    )
}

export default App
