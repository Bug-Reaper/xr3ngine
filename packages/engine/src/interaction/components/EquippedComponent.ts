import { Component } from "../../ecs/classes/Component";
import { Types } from "../../ecs/types/Types";
import { Entity } from "../../ecs/classes/Entity";

export class EquippedComponent extends Component<EquippedComponent> {
  static _schema = {
    equippedEntity:  { type: Types.Ref, default: null},
    data: { type: Types.Ref }
  }

  public equippedEntity: Entity
  public data: any
}
