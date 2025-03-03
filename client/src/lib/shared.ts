import { board } from './state';

export function update_message_with_transition(
	message: string,
	current_position = null,
	total_instructions = null
) {
	// update state to allow transition/animation
	board.update_message('');

	setTimeout(() => {
		// allow interaction/upload again after completion
		if (total_instructions && current_position == total_instructions - 1) {
			board.set_executing(false);
		}

		board.update_message(message);
	}, 500);
}

// just so when i deploy, only one place
// needs to change for the 'prod' endpoint
export function get_endpoint() {
	return 'http://localhost:3500';
}
