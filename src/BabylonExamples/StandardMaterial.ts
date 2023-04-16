import {
    Engine,
    FreeCamera,
    HemisphericLight,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Texture,
    Vector3
} from "@babylonjs/core";

export class StandardMaterials {
    scene: Scene
    engine: Engine

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true)
        this.scene = this.createScene()
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera('Camera', new Vector3(0, 1, -3), this.scene)
        camera.attachControl();
        camera.speed = .25;

        const hemiLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), this.scene)
        hemiLight.intensity = 1;

        const ground = MeshBuilder.CreateGround('ground', {
            width: 10,
            height: 10,
        }, this.scene)
        ground.material = this.createGroundMaterial();

        const ball = MeshBuilder.CreateSphere('ball', {
            diameter: 1
        }, this.scene)
        ball.position = new Vector3(0, 1, 0)
        ball.material = this.createBallMaterial();
        return scene
    }

    createGroundMaterial(): StandardMaterial {
        const groundMaterial = new StandardMaterial('ground', this.scene)
        const uvScale = 3;
        const textures: Texture[] = []
        const diffuseTexture = new Texture('/stone/cobblestone_diffuse.png', this.scene)
        groundMaterial.diffuseTexture = diffuseTexture

        textures.push(diffuseTexture)

        const normalTexture = new Texture('/stone/cobblestone_normal.png', this.scene)
        groundMaterial.bumpTexture = normalTexture;
        textures.push(normalTexture)

        const aoTexture = new Texture('/stone/cobblestone_ao.png', this.scene);
        groundMaterial.ambientTexture = aoTexture
        textures.push(aoTexture)

        const specTexture = new Texture('/stone/cobblestone_spec.png', this.scene);
        groundMaterial.specularTexture = specTexture;
        textures.push(specTexture)



        for (let i = 0; i < textures.length; i++) {
            textures[i].uScale = uvScale;
            textures[i].vScale = uvScale;
        }

        return groundMaterial
    }

    createBallMaterial(): StandardMaterial {
        const ballMaterial = new StandardMaterial('ball', this.scene)
        const uvScale = 1;
        const textures: Texture[] = []
        const diffuseTexture = new Texture('/metal/metal_diffuse.png', this.scene)
        ballMaterial.diffuseTexture = diffuseTexture

        textures.push(diffuseTexture)

        const normalTexture = new Texture('/metal/metal_normal.png', this.scene)
        ballMaterial.bumpTexture = normalTexture;
        ballMaterial.invertNormalMapX = true;
        ballMaterial.invertNormalMapY = true;

        textures.push(normalTexture)

        const aoTexture = new Texture('/metal/metal_ao.png', this.scene);
        ballMaterial.ambientTexture = aoTexture
        textures.push(aoTexture)

        const specTexture = new Texture('/metal/metal_spec.png', this.scene);
        ballMaterial.specularTexture = specTexture;
        ballMaterial.specularPower = 5;
        textures.push(specTexture)



        for (let i = 0; i < textures.length; i++) {
            textures[i].uScale = uvScale;
            textures[i].vScale = uvScale;
        }

        return ballMaterial
    }
}