import {
    CubeTexture,
    Engine,
    FreeCamera,
    MeshBuilder,
    Scene, SceneLoader,
    Vector3
} from "@babylonjs/core";
import {CreateAsphalt} from "../helpers/createAsphalt";

import "@babylonjs/loaders";
import {CustomLoading} from "./CustomLoading";

export class CustomLoadingScreen {
    scene: Scene
    engine: Engine
    loadingScreen: CustomLoading;

    constructor(private canvas: HTMLCanvasElement,
                private loadingBar: HTMLElement,
                private percentLoaded: HTMLElement,
                private loader: HTMLElement
    ) {
        this.engine = new Engine(canvas, true)
        this.loadingScreen = new CustomLoading(loadingBar, percentLoaded, loader)
        this.engine.loadingScreen = this.loadingScreen;
        this.engine.displayLoadingUI()

        this.scene = this.createScene()
        this.createGround()
        this.createBarrel()
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera('Camera', new Vector3(0, 1, -5), this.scene)
        camera.attachControl();
        camera.speed = 0.25;

        const envTexture = CubeTexture.CreateFromPrefilteredData('/environments/sky.env', scene);

        scene.environmentTexture = envTexture;

        scene.createDefaultSkybox(envTexture, true)

        scene.environmentIntensity = 0.5;
        return scene
    }

    createGround(): void {
        const ground = MeshBuilder.CreateGround('ground', {
            width: 10,
            height: 10,
        }, this.scene)

        ground.material = new CreateAsphalt(this.scene).createAsphalt()
    }

    async createBarrel(): Promise<void> {
        // SceneLoader.ImportMesh('', '/models/', 'barrel.glb', this.scene, (meshes) => {
        //     console.log('mesh', meshes)
        // });

        await SceneLoader.ImportMeshAsync('', '/models/', 'barrel.glb', this.scene, (e) => {
            const loadStatus = ((e.loaded * 100) / e.total).toFixed()
            this.loadingScreen.updateLoadStatus(loadStatus)
        })
        this.engine.hideLoadingUI()
    }

    disposeEngine(): void {
        this.engine.dispose()
    }
}