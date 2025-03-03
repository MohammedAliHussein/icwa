<script lang="ts">
  import { onMount } from 'svelte';

  import Controller from '../components/controller.svelte';
  import FileUpload from '../components/file-upload.svelte';
  import Board from '../components/board.svelte';
  import Sequence from '../components/sequence.svelte';
  import { fly } from 'svelte/transition';
  import { circOut } from 'svelte/easing';

  let ready = false;

  onMount(() => {
    ready = true;
  });
</script>

{#if ready}
  <div class="flex h-full w-full flex-col items-center justify-center gap-5">
    <Sequence />
    <Board />
    <div class="flex flex-col items-center justify-center gap-4">
      <Controller />
      <p
        in:fly|global={{ y: 5, delay: 25.5 * 25 + 200, duration: 600, easing: circOut }}
        class="text-xs text-slate-500"
      >
        OR
      </p>
      <FileUpload />
    </div>
  </div>
{/if}
