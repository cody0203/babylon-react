import {
    CubeTexture,
    Engine,
    FreeCamera,
    HemisphericLight,
    MeshBuilder,
    PBRMaterial,
    Scene, Texture,
    Vector3,
} from "@babylonjs/core";

export class PBR {
    scene: Scene
    engine: Engine

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas)
        this.scene = this.createScene()
        this.createEnvironment()
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera('Camera', new Vector3(0, 1, -2), this.scene)
        camera.attachControl();
        camera.speed = 0.25;
        const hemiLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), this.scene)
        hemiLight.intensity = 0;

        const envTexture = CubeTexture.CreateFromPrefilteredData('/environments/sky.env', scene);
        scene.environmentTexture = envTexture;

        scene.createDefaultSkybox(envTexture, true)

        return scene
    }

    createEnvironment(): void {
        const ground = MeshBuilder.CreateGround('ground', {
            width: 10,
            height: 10,
        }, this.scene)
        const ball = MeshBuilder.CreateSphere('ball', {
            diameter: 1
        }, this.scene)
        ball.position = new Vector3(0, 1, 0)

        ground.material = this.createAsphalt()
        ball.material = this.createFlower();
    }

    createAsphalt(): PBRMaterial {
        const pbr = new PBRMaterial('pbr', this.scene)
        pbr.albedoTexture = new Texture('/alphalt/asphalt_diffuse.png', this.scene)
        pbr.bumpTexture = new Texture('/alphalt/asphalt_normal.png', this.scene)

        pbr.invertNormalMapY = true
        pbr.invertNormalMapX = true

        pbr.useAmbientOcclusionFromMetallicTextureRed = true;
        pbr.useRoughnessFromMetallicTextureGreen = true;
        pbr.useMetallnessFromMetallicTextureBlue = true

        pbr.metallicTexture = new Texture('/alphalt/asphalt_arm.png', this.scene)
        // pbr.roughness = 1;

        return pbr
    }

    createFlower(): PBRMaterial {
        const flower = new PBRMaterial('flower', this.scene);


        flower.roughness = 1;

        return flower
    }
}