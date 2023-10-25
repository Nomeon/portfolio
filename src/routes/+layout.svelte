<script lang='ts'>
    import { isMobile } from "./stores";
    import { useMediaQuery } from "svelte-breakpoints";
    import Navbar from "$lib/components/Navbar.svelte";
    import Background from "$lib/components/Background.svelte";
    import "@fontsource/poppins";
    import "../app.css";
    
    const mobile = useMediaQuery('(max-width: 768px)');
    $: $mobile, $isMobile = $mobile;
</script>
  
<div id="app" class="bg-black text-white font-sofia font-light">
    <main class='absolute h-[100dvh] w-full z-10'>
        <Navbar />
        <div class='h-full px-48 mt-16'>
            <slot />
        </div>
    </main>
    <Background/>
</div>

<style lang='postcss'>
    :global(body) {
        font-family: 'Poppins', sans-serif;
        overflow: hidden;
    }
</style>