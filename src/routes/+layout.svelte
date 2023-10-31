<script lang='ts'>
    import { isMobile } from "./stores";
    import { useMediaQuery } from "svelte-breakpoints";
    import Navbar from "$lib/components/Navbar.svelte";
    import Background from "$lib/components/Background.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import "../app.css";
    
    const mobile = useMediaQuery('(max-width: 768px)');
    $: $mobile, $isMobile = $mobile;
</script>
  
<div id="app" class=" text-white font-light">
    <main class='absolute h-[100dvh] w-full z-10'>
        <Navbar />
        <div class='overflow-y-scroll scroll-smooth h-[100dvh]'>
            <slot />
            <Footer />
        </div>
    </main>
    <Background/>
</div>

<style lang='postcss'>
    :global(body) {
        font-family: 'Roboto', sans-serif;
        overflow: hidden;
    }
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
</style>