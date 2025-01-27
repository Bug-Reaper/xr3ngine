import { ParticleEmitterComponent } from "../components/ParticleEmitter";
import { registerComponent } from "../../ecs/functions/ComponentFunctions";
import { getMutableComponent } from "../../ecs/functions/EntityFunctions";
import { applyTransform } from "../functions/particleHelpers";
import { System, SystemAttributes } from "../../ecs/classes/System";

/** System class for particle system. */
export class ParticleSystem extends System {
  /** Constructs the system. */
  constructor(attributes?: SystemAttributes) {
    super();
    registerComponent(ParticleEmitterComponent);
  }

  /** Executes the system. */
  execute(deltaTime, time): void {
    for (const entity of this.queryResults.emitters.added) {
      const emitter = getMutableComponent(entity, ParticleEmitterComponent);
      this.clearEventQueues();
    }

    this.queryResults.emitters.all?.forEach(entity => {
      const emitter = getMutableComponent(entity, ParticleEmitterComponent);
      applyTransform(entity, emitter);
      emitter.particleEmitterMesh?.update(deltaTime);
    });

    for (const entity of this.queryResults.emitters.removed) {
    }
  }
}

ParticleSystem.queries = {
  emitters: {
    components: [ParticleEmitterComponent],
    listen: {
      added: true,
      removed: true,
    }
  },
};
