import { mat3 } from "gl-matrix";

import System from "@src/ECS/System";

import { Position, Sprite, RigidBody, Camera, BoundingBox } from "@src/ECS/components";

import { CAMERA_COMPONENT, POSITION_COMPONENT, SPRITE_COMPONENT, BOUNDING_BOX_COMPONENT, RIGID_BODY_COMPONENT } from "@src/ECS/types";

export class RenderingSystem extends System {
  public constructor() {
    super([POSITION_COMPONENT, SPRITE_COMPONENT]);
  }

  execute(alpha: number): void {
    const cameraComponent = this.world.camera.getComponent<Camera>(CAMERA_COMPONENT);

    const entities = this.world.getEntities(this.componentTypes);

    if (entities.length === 0) {
      return;
    }

    entities.forEach((entity) => {
      if (this.world.isFrustumCulled(entity)) {
        return;
      }

      const sprite = entity.getComponent<Sprite>(SPRITE_COMPONENT);

      if (!sprite.visible) {
        return;
      }

      const position = entity.getComponent<Position>(POSITION_COMPONENT);
      const rigidBody = entity.getComponent<RigidBody>(RIGID_BODY_COMPONENT);
      const bbox = entity.getComponent<BoundingBox>(BOUNDING_BOX_COMPONENT);

      if (position.shouldUpdateTransform) {
        const offsetX = -sprite.atlas.tileWidth / 2;
        const offsetY = sprite.align === "bottom" ? -Math.floor(sprite.atlas.tileHeight / 2 + (sprite.atlas.tileHeight / 2 - (bbox?.height ?? 0) / 2)) : -sprite.atlas.tileWidth / 2 - 1;

        position.transform = mat3.fromTranslation(
          position.transform,
          position
            .clone()
            .trunc()
            .addValues(offsetX, offsetY)
            .addValues(position.rotation !== 0 ? sprite.atlas.tileWidth / 2 : 0, position.rotation !== 0 ? sprite.atlas.tileHeight / 2 : 0)
            .toGlArray()
        );

        if (position.rotation !== 0) {
          const r = mat3.fromRotation(mat3.create(), position.rotation);
          mat3.multiply(position.transform, position.transform, r);

          const t = mat3.fromTranslation(mat3.create(), [-sprite.atlas.tileWidth / 2, -sprite.atlas.tileHeight / 2]);
          mat3.multiply(position.transform, position.transform, t);
        }

        position.shouldUpdateTransform = false;
      }

      sprite.atlas.use();
      sprite.atlas.render(this.world.projectionMatrix, cameraComponent.viewMatrix, position.transform, sprite.row, sprite.col, rigidBody?.orientation, sprite.parameters);
    });
  }
}
