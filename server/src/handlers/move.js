import { get_instances, instance_exists } from '../shared/instances.js';

export function move_robot(request, response) {
	try {
		const instances = get_instances();

		let id = instance_exists(request.params.id);

		try {
			instances[id].move_robot();

			response.status(200).send({
				state: instances[id].get_robot().get_state(),
				message: 'Moving',
			});
		} catch (error) {
			response.status(400).send({
				message: error.message,
				state: instances[id].get_robot().get_state(),
			});
		}
	} catch (error) {
		response.status(500).send({ message: error.message });
	}
}
