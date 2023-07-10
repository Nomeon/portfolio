<script lang='ts'>
    import { onMount } from "svelte";
    // @ts-ignore
    import NET from "$lib/components/vanta";
    import * as THREE from "three";

    // @ts-ignore
    let effect: { destroy: () => void; resize: () => any; };

    onMount(() => {
        effect = NET({
            el: '#background',
            THREE: THREE,
        });
    });
</script>

<div id="background" class="absolute top-8 left-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)]" />
<svelte:window on:resize={effect.resize()} />