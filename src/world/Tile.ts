import { mat3, vec2, vec3 } from "gl-matrix";

import Vector2 from "@src/shared/math/Vector2";

import { ITileTypeData } from "@src/shared/models/tilemap.model";
import { ISpriteRenderParameters } from "@shared/models/animation.model";

interface TileOptions {
  collision?: boolean;
  wireframe?: boolean;
  grayscale?: boolean;
  flickering?: boolean;
  alpha?: number;
  direction?: Vector2;
}

class Tile {
  public readonly row: number;
  public readonly col: number;
  public readonly size: number;
  public readonly position: Vector2;
  public readonly model: mat3;

  public collision: boolean;

  public renderOptions: ISpriteRenderParameters;

  public slot1: ITileTypeData;
  public slot2: ITileTypeData;

  constructor(
    row: number,
    col: number,
    size: number,
    collision: boolean,
    options: TileOptions = {}
  ) {
    this.row = row;
    this.col = col;
    this.size = size;
    this.collision = collision;

    this.model = mat3.fromTranslation(
      mat3.create(),
      vec2.fromValues(col * size, row * size)
    );

    this.position = new Vector2(col * size, row * size);

    this.renderOptions = {
      fill: false,
      wireframe: false,
      grayscale: false,
      flickering: false,
      alpha: 1,
      color: vec3.fromValues(1, 0, 0),
      direction: new Vector2(1, 1),
      ...options,
    };
  }

  public getX1() {
    return this.position.x;
  }

  public getX2() {
    return this.position.x + this.size;
  }

  public getY1() {
    return this.position.y;
  }

  public getY2() {
    return this.position.y + this.size;
  }
}

export default Tile;
