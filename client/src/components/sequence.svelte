<script>
	import { board } from '$lib/state';
	import { circOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<div class="h-7">
	{#if $board.message}
		<button
			in:fly|global={{ x: -10, delay: 50, duration: 400, easing: circOut }}
			out:fly|global={{ x: 10, delay: 50, duration: 400, easing: circOut }}
			class="cursor cursor-pointer rounded bg-slate-200 px-5 py-1.5 text-xs text-gray-600 transition-colors"
		>
			<p>
				{$board.message}
			</p>
		</button>
	{/if}
</div>
