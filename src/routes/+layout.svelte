<script lang='ts'>
    import { isMobile } from "./stores";
    import { useMediaQuery } from "svelte-breakpoints";
    import Navbar from "$lib/components/Navbar.svelte";
    import Background from "$lib/components/Background.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import "@fontsource/poppins";
    import "../app.css";
    
    const mobile = useMediaQuery('(max-width: 768px)');
    $: $mobile, $isMobile = $mobile;
</script>
  
<div id="app" class="bg-dark1 text-light1 font-sofia font-light">
    <main class='absolute h-[100dvh] w-full z-10 overflow-y-scroll scroll-smooth'>
        <Navbar />
        <div class='h-full px-48 mt-16'>
            <slot />
        </div>
        <Footer />
    </main>
    <Background/>
</div>

<style lang='postcss'>
    :global(body) {
        font-family: 'Poppins', sans-serif;
        overflow: hidden;
    }
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
</style>