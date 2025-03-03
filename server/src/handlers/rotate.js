import { get_instances, instance_exists } from "../shared/instances.js";

export function rotate_left(request, response) {
  try {
    const instances = get_instances();

    let id = instance_exists(request.params.id);

    instances[id].get_robot().rotate_left();

    response.status(200).send({
      state: instances[id].get_robot().get_state(),
      message: "Rotating Left",
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
}

export function rotate_right(request, response) {
  try {
    const instances = get_instances();

    let id = instance_exists(request.params.id);

    instances[id].get_robot().rotate_right();

    response.status(200).send({
      state: instances[id].get_robot().get_state(),
      message: "Rotating Right",
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
}
