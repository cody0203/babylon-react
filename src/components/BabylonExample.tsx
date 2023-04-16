import {useEffect} from "react";
import {CustomModel} from "../BabylonExamples/CustomModel";

const BabylonExample = () => {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!;
        const model = new CustomModel(canvas)
        return () => {
            model.disposeEngine()
        }
    }, [])
    return <canvas></canvas>
}

export default BabylonExample;
