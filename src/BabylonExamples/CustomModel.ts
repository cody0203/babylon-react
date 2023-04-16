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

export class CustomModel {
    scene: Scene
    engine: Engine

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true)
        this.scene = this.createScene()
        this.createGround()
        this.createBarrel()
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera('Camera', new Vector3(0, 1, -2), this.scene)
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

    createBarrel(): void {
        SceneLoader.ImportMesh('', '/models/', 'barrel.glb', this.scene, (meshes) => {
            console.log('mesh', meshes)
        });
    }
}