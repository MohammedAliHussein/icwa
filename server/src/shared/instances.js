import { Game } from "../models/game.js";

let instances = null;

export function get_instances() {
  if (!instances) {
    instances = {};
  }

  return instances;
}

export function instance_exists(id) {
  if (!id || !(id in instances)) {
    const largest_id = Math.max(
      Object.keys(instances).map((key) => parseInt(key)),
    );

    id = largest_id + 1;

    instances[id] = new Game();
  }

  return id;
}
