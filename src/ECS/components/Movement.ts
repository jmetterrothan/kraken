import { Component } from "@src/ECS";

import SoundManager from "@src/animation/SoundManager";

interface IMovementMetadata {
  initialJumpBoost?: number;
  jumpSpeed?: number;
  speed?: number;
  acceleration?: number;
  deceleration?: number;
  jumpSFX?: string;
}

export class Movement implements Component {
  public static COMPONENT_TYPE = "movement";

  public wallJumping = false;
  public wallSliding = false;
  public falling = false;
  public jumping = false;
  public walking = false;
  public idle = true;

  public isBlockedLeft = false;
  public isBlockedRight = false;
  public isBlockedUp = false;
  public isBlockedDown = false;

  public readonly initialJumpBoost: number;
  public readonly jumpSpeed: number;
  public readonly speed: number;
  public readonly acceleration: number;
  public readonly deceleration: number;

  public lastEffectTime: number;
  public lastWallJumpTime: number;

  public jumpSFX: Howl | undefined;

  public constructor({ initialJumpBoost, jumpSpeed, speed, acceleration, deceleration, jumpSFX }: IMovementMetadata) {
    this.initialJumpBoost = initialJumpBoost ?? 0;
    this.jumpSpeed = jumpSpeed ?? 0;
    this.speed = speed ?? 0;
    this.acceleration = acceleration ?? 0;
    this.deceleration = deceleration ?? 0;

    this.lastEffectTime = -1;
    this.lastWallJumpTime = -1;

    if (jumpSFX) {
      this.jumpSFX = SoundManager.create(jumpSFX, {
        volume: 0.1,
      });
    }
  }

  public toString(): string {
    return Movement.COMPONENT_TYPE;
  }
}
