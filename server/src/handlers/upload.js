import { get_instances, instance_exists } from '../shared/instances.js';

import fs from 'fs';
import readline from 'readline';

export async function upload_file(request, response) {
	try {
		const instances = get_instances();

		let id = instance_exists(request.params.id);

		const path = `uploads/input_${id}.txt`;

		const lines = await read_file(path, request);

		const move_sequence = instances[id].generate_sequence(lines);

		response.status(200).send({ id: id, move_sequence: move_sequence });
	} catch (error) {
		response.status(500).send({ message: error.message });
	}
}

async function read_file(path, request) {
	const lines = [];

	fs.writeFileSync(path, request.body);

	const file_readline = readline.createInterface({
		input: fs.createReadStream(path),
	});

	for await (const line of file_readline) {
		if (!line) {
			continue;
		}

		lines.push(line.split(' '));
	}

	return lines;
}
