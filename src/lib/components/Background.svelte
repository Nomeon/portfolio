<script lang='ts'>
    import { onMount } from "svelte";
    // @ts-ignore
    import NET from "$lib/components/vanta";
    import * as THREE from "three";
    import { page } from "$app/stores";

    // @ts-ignore
    let effect: { resize: () => any; };

    onMount(() => {
        if ($page.route.id === '/projects/ifcviewer') return;
        effect = NET({
            el: '#background',
            THREE: THREE,
        })
    });
</script>

<div id="background" class="absolute top-8 left-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)]" />
<div id="frame" class="fixed left-8 top-8 right-8 bottom-8 pointer-events-none">
    <div class="left-0 top-0 w-[1px] h-full absolute opacity-70 bg-white"></div>
    <div class="left-0 top-0 w-full h-[1px] absolute opacity-70 bg-white"></div>
    <div class="right-0 bottom-0 w-[1px] h-full absolute opacity-70 bg-white"></div>
    <div class="right-0 bottom-0 w-full h-[1px] absolute opacity-70 bg-white"></div>
</div>
<svelte:window on:resize={effect.resize()} />