<script>
    import { isMobile, height } from "./stores";
    import { useMediaQuery } from "svelte-breakpoints";
    import Navbar from "$lib/components/Navbar.svelte";
    import Background from "$lib/components/Background.svelte";
    import "@fontsource-variable/sofia-sans"
    import "../app.css";
    
    const mobile = useMediaQuery('(max-width: 768px)');
    $: $mobile, $isMobile = $mobile;

</script>
  
<div id="app" class="bg-black text-white font-sofia font-light {$isMobile ? '' : 'h-screen'} w-screen" style="{$isMobile ? `height: ${$height - 0.5}px;` : ''}">
    <Navbar />
    <main class='absolute h-[calc(100%-4rem)] w-[calc(100%-4rem)] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10'>
        <slot />
    </main>
    <Background />
</div>
<svelte:window bind:innerHeight={$height} />

<style lang='postcss'>
    :global(body) {
        font-family: 'Sofia Sans Variable', sans-serif;
        overflow: hidden;
    }
</style>