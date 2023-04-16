import {PBRMaterial, Scene, Texture} from "@babylonjs/core";

export class CreateAsphalt {
    scene: Scene

    constructor(scene: Scene) {
        this.scene = scene
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
}