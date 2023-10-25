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

<div id="background" class="absolute h-full w-full" />
<svelte:window on:resize={effect.resize()} />