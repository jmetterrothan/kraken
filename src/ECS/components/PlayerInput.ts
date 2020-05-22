import Component from "@src/ECS/Component";

import { PLAYER_INPUT_COMPONENT } from "@src/ECS/types";

import Vector2 from "@src/shared/math/Vector2";

export class PlayerInput implements Component {
  public readonly type: symbol = PLAYER_INPUT_COMPONENT;

  public left: boolean = false;
  public right: boolean = false;
  public up: boolean = false;
  public down: boolean = false;

  public usePrimary: boolean = false;
  public useSecondary: boolean = false;

  public aim: Vector2 = new Vector2(16, -16);

  public gamepadIndex: number = 0;

  public toString(): string {
    return `Player input`;
  }
}
