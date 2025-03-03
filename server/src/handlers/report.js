import { get_instances, instance_exists } from '../shared/instances.js';

export function report_position(request, response) {
	try {
		const instances = get_instances();

		let id = instance_exists(request.params.id);

		response.status(200).send({
			state: instances[id].get_robot().get_state(),
			message: instances[id].report_position(),
		});
	} catch (error) {
		response.status(500).send({ message: error.message });
	}
}
