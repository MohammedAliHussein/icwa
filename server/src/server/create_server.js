import express, { raw } from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';

import {
	move_robot,
	upload_file,
	report_position,
	rotate_left,
	rotate_right,
} from '../handlers/index.js';

export function create_server() {
	const server = express();

	register_middleware(server);
	register_handlers(server);

	return server;
}

function register_middleware(server) {
	server.use(raw({ type: 'multipart/form-data', limit: '10mb' }));
	server.use(bodyParser.json());
	server.use(cors());
}

function register_handlers(server) {
	server.post('/:id/move', move_robot);
	server.post('/:id/upload', upload_file);
	server.post('/:id/left', rotate_left);
	server.post('/:id/right', rotate_right);
	server.get('/:id/report', report_position);
}
