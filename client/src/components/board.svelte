<script>
  import BoardCell from './board-cell.svelte';
  import ProgressBar from './progress-bar.svelte';
</script>

<div class="flex w-1/4 flex-col gap-4">
  <ProgressBar />
  <div class="grid aspect-square min-w-80 grid-rows-5 gap-3">
    {#each Array(5) as _, i}
      <div class="grid w-full grid-cols-5 gap-3">
        {#each Array(5) as _, j}
          <BoardCell {i} {j} />
        {/each}
      </div>
    {/each}
  </div>
</div>
