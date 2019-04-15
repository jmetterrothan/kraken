import { mat3, vec2 } from 'gl-matrix';

import Animation from '@src/animation/Animation';
import Object2d from '@src/objects/Object2d';

import { IAnimationList } from '@src/shared/models/animation.model';
import { IEntityData } from '@src/shared/models/entity.model';

class Entity extends Object2d {

  protected orientation: vec2;
  private animationList: IAnimationList;
  private currentAnimationKey: string;

  constructor(x: number, y: number, data: IEntityData) {
    super(x, y);

    this.orientation = vec2.fromValues(
      data.defaultState.orientation.x,
      data.defaultState.orientation.y,
    );

    // convert animation parameters in Animation objects
    this.currentAnimationKey = data.defaultAnimationKey;
    this.animationList = {};

    for (const key of Object.keys(data.animationList)) {
      this.animationList[key] = new Animation(key, data.animationList[key]);
    }
  }

  public update(delta: number) {
    this.animationList[this.currentAnimationKey].update();

    super.update(delta);
  }

  public render(viewProjectionMatrix: mat3) {
    this.animationList[this.currentAnimationKey].render(viewProjectionMatrix, this.modelMatrix, this.orientation);

    super.render(viewProjectionMatrix);
  }
}

export default Entity;
