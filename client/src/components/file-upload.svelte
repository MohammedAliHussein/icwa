<script lang="ts">
  import axios from 'axios';

  import { circOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import { board } from '$lib/state';
  import { get_endpoint, update_message_with_transition } from '$lib/shared';
  import { LoaderCircle } from 'lucide-svelte';

  let loading = false;

  function process_instructions(instructions) {
    for (const [i, instruction] of instructions.entries()) {
      setTimeout(() => {
        board.update_robot(
          instruction.state.row,
          instruction.state.column,
          instruction.state.direction
        );

        // we want the message to have a slide out transition to distinguish them
        update_message_with_transition(instruction.message, i, instructions.length);

        // increment steps for progress bar to continue
        board.increment_completed_steps();
      }, i * 1500);
    }
  }

  function reset_state(instructions) {
    board.reset_completed_steps();
    board.update_total_steps(instructions.length);
    board.set_executing(true);
  }

  async function handle_file_input(e) {
    const file = e.target.files[0];
    const instanceId = localStorage.getItem('instance_id') ?? -1;

    if (!file) {
      return;
    }

    const data = new FormData();
    data.append('input_file', file);

    try {
      loading = true;

      const response_data = (await axios.post(`${get_endpoint()}/${instanceId}/upload`, data)).data;

      localStorage.setItem('instance_id', response_data.id);

      reset_state(response_data.move_sequence);
      process_instructions(response_data.move_sequence);

      // so that the switch back to text isn't abrupt
      // if the response comes back fast
      setTimeout(() => {
        loading = false;
      }, 750);
    } catch (error: any) {
      board.update_message(error.response.data.message);
    }
  }
</script>

<div class="flex gap-3">
  <label
    for="file"
    in:fly|global={{ y: 5, delay: 26 * 25 + 200, duration: 600, easing: circOut }}
    class="cursor flex max-h-8 min-w-36 cursor-pointer justify-center rounded bg-blue-700 px-5 py-2 text-center text-xs text-white transition-colors hover:bg-blue-800"
  >
    {#if loading}
      <LoaderCircle size="18" class="animate-spin ease-linear" />
    {:else}
      Upload Input (.txt)
    {/if}
  </label>
  <input
    disabled={$board.executing}
    on:change={handle_file_input}
    type="file"
    id="file"
    class="hidden"
    accept="text/plain"
  />
</div>
