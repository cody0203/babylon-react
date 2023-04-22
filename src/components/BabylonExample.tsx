import {useEffect} from "react";
import {MeshActions} from "../BabylonExamples/MeshActions";

const BabylonExample = () => {
    useEffect(() => {
        const canvas = document.querySelector('canvas')!;
        // const loadingBar = document.getElementById('loadingBar') as HTMLElement;
        // const percentLoaded = document.getElementById('percentLoaded') as HTMLElement;
        // const loader = document.getElementById('loader') as HTMLElement;
        const model = new MeshActions(canvas)
        return () => {
            model.disposeEngine()
        }
    }, [])
    return <canvas></canvas>
}

export default BabylonExample;
