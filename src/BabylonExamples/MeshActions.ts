import {
    AbstractMesh, ActionManager, Color3,
    CubeTexture,
    Engine,
    FreeCamera, IncrementValueAction, InterpolateValueAction,
    MeshBuilder, PBRMaterial,
    Scene, SceneLoader, SetValueAction,
    Vector3
} from "@babylonjs/core";
import {CreateAsphalt} from "../helpers/createAsphalt";

import "@babylonjs/loaders";

export class MeshActions {
    scene: Scene
    engine: Engine
    cube: AbstractMesh
    sphere: AbstractMesh;
    cylinder: AbstractMesh;
    sphereMat: PBRMaterial;

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true)
        this.scene = this.createScene()
        this.createMeshes();
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera('Camera', new Vector3(0, 0, -8), this.scene)

        const envTexture = CubeTexture.CreateFromPrefilteredData('/environments/sky.env', scene);

        envTexture.gammaSpace = false;
        envTexture.rotationY = Math.PI;

        scene.environmentTexture = envTexture;

        scene.createDefaultSkybox(envTexture, true, 1000, 0.2, true)

        scene.environmentIntensity = 1.5;

        return scene
    }


    disposeEngine(): void {
        this.engine.dispose()
    }

    async createMeshes(): void {
        this.sphereMat = new PBRMaterial('sphereMat', this.scene);
        this.sphereMat.albedoColor = new Color3(1, 0, 0);
        this.sphereMat.roughness = 1;

        const {meshes} = await SceneLoader.ImportMeshAsync(
            '',
            '/models/',
            'gifts.glb',
            this.scene
        );

        this.cube = meshes[1];
        this.sphere = meshes[2];
        this.cylinder = meshes[3];

        this.cylinder.rotation = new Vector3(-Math.PI / 4, 0, 0)

        this.sphere.material = this.sphereMat;

        this.createActions()
    }

    createActions(): void {
        this.cube.actionManager = new ActionManager(this.scene);
        this.sphere.actionManager = new ActionManager(this.scene);
        this.scene.actionManager = new ActionManager(this.scene);

        this.cube.actionManager.registerAction(new SetValueAction(
            ActionManager.OnPickDownTrigger,
            this.cube,
            'scaling',
            new Vector3(1.5, 1.5, 1.5)
        ))

        this.sphere.actionManager.registerAction(new InterpolateValueAction(
            ActionManager.OnPickDownTrigger,
            this.sphereMat,
            'roughness',
            0,
            3000
        ))?.then(new InterpolateValueAction(
            ActionManager.NothingTrigger,
            this.sphereMat,
            'roughness',
            1,
            1000
        ))

        this.scene.actionManager.registerAction(new IncrementValueAction(
            ActionManager.OnEveryFrameTrigger,
            this.cylinder,
            'rotation.x',
            0.01
        ))

    }
}