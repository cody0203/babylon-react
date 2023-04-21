import {useEffect} from "react";
import {CustomLoadingScreen} from "../BabylonExamples/CustomLoadingScreen";

const BabylonExample = () => {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!;
        const loadingBar = document.getElementById('loadingBar') as HTMLElement;
        const percentLoaded = document.getElementById('percentLoaded') as HTMLElement;
        const loader = document.getElementById('loader') as HTMLElement;
        const model = new CustomLoadingScreen(canvas, loadingBar, percentLoaded, loader)
        return () => {
            model.disposeEngine()
        }
    }, [])
    return <canvas></canvas>
}

export default BabylonExample;
