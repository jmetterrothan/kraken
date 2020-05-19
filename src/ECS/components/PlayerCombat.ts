import Component from "@src/ECS/Component";

import { PLAYER_COMBAT_COMPONENT } from "@src/ECS/types";

import Weapon from "@src/weapons/Weapon";
import ProjectileWeapon from "@src/weapons/ProjectileWeapon";

export class PlayerCombat implements Component {
  public readonly type: symbol = PLAYER_COMBAT_COMPONENT;

  public usingPrimaryWeapon: boolean = false;

  public _weapon: ProjectileWeapon = new ProjectileWeapon({
    projectile: { type: "energy_bolt", speed: 225, ttl: 1000 }, //
    rate: 500,
    maxAmmo: 32,
    fireSFX: "laser",
    minRange: 16,
    maxRange: 480,
  });

  public _weapon2: ProjectileWeapon = new ProjectileWeapon({
    projectile: { type: "health_potion", speed: 350, ttl: 10000 }, //
    rate: 75,
    maxAmmo: 32,
    fireSFX: "laser",
    minRange: 16,
    maxRange: 480,
  });

  public get weapon(): Weapon {
    return this._weapon2;
  }

  public toString(): string {
    return `Player combat`;
  }
}
