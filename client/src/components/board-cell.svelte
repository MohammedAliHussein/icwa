<script>
	import { board } from '$lib/state';
	import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-svelte';
	import { circOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	export let i;
	export let j;
</script>

<div
	in:fly|global={{ y: 10, delay: i * j * 50 + 200, duration: 400, easing: circOut }}
	class="flex aspect-square grow items-center justify-center rounded outline-1 outline-black/10 transition-colors hover:bg-blue-50/50"
>
	{#if $board.robot.row == i && $board.robot.column == j}
		<div
			transition:scale|global={{ opacity: 0, duration: 500, easing: circOut }}
			class="aspect-square rounded-full bg-blue-600 p-1 text-white"
		>
			{#if $board.robot.direction == 'North'}
				<ChevronUp size="13.5" strokeWidth="2.75" />
			{:else if $board.robot.direction == 'South'}
				<ChevronDown size="13.5" strokeWidth="2.75" />
			{:else if $board.robot.direction == 'East'}
				<ChevronRight size="13.5" strokeWidth="2.75" />
			{:else if $board.robot.direction == 'West'}
				<ChevronLeft size="13.5" strokeWidth="2.75" />
			{/if}
		</div>
	{/if}
</div>
