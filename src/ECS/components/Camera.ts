import { mat3 } from "gl-matrix";

import Entity from "@src/ECS/Entity";
import Component from "@src/ECS/Component";

import { CAMERA_COMPONENT } from "@src/ECS/types";

import Box2 from "@src/shared/math/Box2";
import Vector2 from "@shared/math/Vector2";

import { configSvc } from "@shared/services/config.service";

interface ICameraMetadata {
  mode?: CameraMode;
  smoothing?: number;
}

export enum CameraMode {
  POSITION_LOCKING = 0,
  LERP_SMOOTHING = 1,
}

export class Camera implements Component {
  public readonly type: symbol = CAMERA_COMPONENT;

  public projectionMatrix: mat3 = mat3.create();
  public projectionMatrixInverse: mat3 = mat3.create();
  public previousPosition: Vector2 = new Vector2();

  public shouldUpdateProjectionMatrix: boolean = true;

  public viewBox: Box2 = new Box2();

  public mode: CameraMode = CameraMode.LERP_SMOOTHING;
  public smoothing: number;

  public target: Entity;
  public boundaries: Box2;

  public zoom: number = configSvc.scale;

  public constructor({ mode }: ICameraMetadata) {
    this.mode = mode ?? CameraMode.LERP_SMOOTHING;
    this.smoothing = 0.4;
  }

  public follow(target: Entity) {
    this.target = target;
  }

  public unfollow() {
    this.target = undefined;
  }

  public toString(): string {
    return `Camera`;
  }
}