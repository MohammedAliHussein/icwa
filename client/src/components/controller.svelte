<script lang="ts">
	import { get_endpoint, update_message_with_transition } from '$lib/shared';
	import { board } from '$lib/state';
	import axios from 'axios';
	import { RotateCcw, RotateCw } from 'lucide-svelte';
	import { circOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	function input_robot_control_wrapper(endpoint) {
		return async function shared_robot_control() {
			try {
				const data = (
					await axios.post(
						`${get_endpoint()}/${localStorage.getItem('instance_id') ?? -1}/${endpoint}`
					)
				).data;

				update_message_with_transition(data.message);

				board.update_robot(data.state.row, data.state.column, data.state.direction);
			} catch (error: any) {
				update_message_with_transition(error.response.data.message);
			}
		};
	}

	async function report_robot_position() {
		try {
			const data = (
				await axios.get(`${get_endpoint()}/${localStorage.getItem('instance_id') ?? -1}/report`)
			).data;

			update_message_with_transition(data.message);
		} catch (error: any) {
			update_message_with_transition(error.response.data.message);
		}
	}
</script>

<div
	class="flex w-full items-center gap-1 text-white"
	in:fly|global={{ y: 5, delay: 27 * 25 + 200, duration: 600, easing: circOut }}
>
	<button
		on:click={input_robot_control_wrapper('left')}
		disabled={$board.executing}
		class="aspect-square cursor-pointer rounded bg-blue-700 p-2 transition-all duration-500 disabled:opacity-50"
	>
		<RotateCcw size={19} />
	</button>
	<div class="flex flex-col gap-1">
		<button
			on:click={input_robot_control_wrapper('move')}
			disabled={$board.executing}
			class="cursor cursor-pointer rounded bg-blue-700 px-5 py-2 text-center text-xs text-white transition-all duration-500 hover:bg-blue-800 disabled:opacity-50"
			>Move Robot</button
		>
		<button
			on:click={report_robot_position}
			disabled={$board.executing}
			class="cursor cursor-pointer rounded bg-blue-700 px-5 py-2 text-center text-xs text-white transition-all duration-500 hover:bg-blue-800 disabled:opacity-50"
			>Report Position</button
		>
	</div>
	<button
		on:click={input_robot_control_wrapper('right')}
		disabled={$board.executing}
		class="cursor-pointer rounded bg-blue-700 p-2 transition-all duration-500 disabled:opacity-50"
	>
		<RotateCw size={19} />
	</button>
</div>
