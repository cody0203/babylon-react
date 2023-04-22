import {
    AbstractMesh,
    ArcRotateCamera,
    CubeTexture,
    Engine,
    Scene, SceneLoader,
    Vector3
} from "@babylonjs/core";

import "@babylonjs/loaders";

export class CameraMechanics {
    scene: Scene
    engine: Engine
    watch: AbstractMesh | undefined
    camera: ArcRotateCamera | undefined

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true)
        this.scene = this.createScene()
        this.createCamera()
        this.createWatch()
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);
        const envTexture = CubeTexture.CreateFromPrefilteredData('/environments/xmas_bg.env', scene);

        envTexture.gammaSpace = false;
        envTexture.rotationY = Math.PI;

        scene.environmentTexture = envTexture;

        scene.createDefaultSkybox(envTexture, true, 1000, 0.25)

        return scene
    }

    createCamera(): void {
        this.camera = new ArcRotateCamera(
            "camera",
            -Math.PI / 2,
            Math.PI / 2,
            40,
            Vector3.Zero(),
            this.scene
        );

        this.camera.attachControl(this.canvas, true);

        this.camera.wheelPrecision = 100;
        this.camera.minZ = 0.3;
        this.camera.lowerRadiusLimit = 2;
        this.camera.upperRadiusLimit = 5;
        this.camera.panningSensibility = 0;
        this.camera.useAutoRotationBehavior = true
        if (this.camera.autoRotationBehavior) {
            this.camera.autoRotationBehavior.idleRotationSpeed = 0.5;
            this.camera.autoRotationBehavior.idleRotationSpinupTime = 1000;
            this.camera.autoRotationBehavior.idleRotationSpinupTime = 2000;
            this.camera.autoRotationBehavior.zoomStopsAnimation = true;
        }

        this.camera.useFramingBehavior = true;
        if (this.camera.framingBehavior) {
            this.camera.framingBehavior.radiusScale = 2;
            this.camera.framingBehavior.framingTime = 4000;
        }
    }


    disposeEngine(): void {
        this.engine.dispose()
    }

    async createWatch(): Promise<void> {
        const {meshes} = await SceneLoader.ImportMeshAsync('', '/models/', 'vintage_watch.glb', this.scene)
        this.watch = meshes[3];
        if (this.camera) {
            this.camera.setTarget(this.watch)
        }
    }
}