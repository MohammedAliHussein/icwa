<script>
  import { board } from '$lib/state';
  import { circOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
</script>

<div
  in:fly|global={{ y: 10, delay: 150, duration: 400, easing: circOut }}
  class="relative h-1.5 w-full rounded-full bg-slate-200"
>
  <div
    style="width: {Math.ceil(($board.completed_steps / $board.total_steps) * 100)}%;"
    class="absolute top-0 left-0 h-full rounded-full bg-blue-700 transition-all duration-700"
  ></div>
</div>
