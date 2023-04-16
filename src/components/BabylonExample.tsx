import {useEffect} from "react";
import {CustomModel} from "../BabylonExamples/CustomModel";

const BabylonExample = () => {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!;
        new CustomModel(canvas)
    })
    return <canvas></canvas>
}

export default BabylonExample;
