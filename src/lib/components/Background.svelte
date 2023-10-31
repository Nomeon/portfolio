<script lang='ts'>
    import { onMount } from "svelte";
    // @ts-ignore
    import NET from "$lib/components/vanta";
    import * as THREE from "three";

    let effect: { destroy: () => void; resize: () => any; };

    onMount(() => {
        effect = NET({
            el: '#background',
            THREE: THREE,
        });
    });
</script>

<div id="background" class="absolute h-full w-full bg-slate-950" />
<svelte:window on:resize={effect.resize()} />