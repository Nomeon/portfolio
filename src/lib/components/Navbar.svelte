<script lang='ts'>
    import { toggled, isMobile } from '../../routes/stores';
    import Icon from '@iconify/svelte';
    
    let width: number;

    function toggleNav() {
        $toggled = !$toggled;
    }

    function handleResize() {
        if (width <= 768) { $toggled = false}
    }
</script>

<nav class='h-24 flex justify-between relative font-semibold box-border md:border-b md:border-white'>
    <div class='md:w-1/4 w-1/2 flex items-center justify-start z-20 pl-12' id='logo'>
        <a href='/'><img class='h-8' src="/weblogo.svg" alt="Nomeon Logo" /></a>
    </div> 
    {#if $toggled === true && width <= 768}
        <div id='navunderlay' class='h-24 w-full z-10 absolute top-0'/>
    {/if}
    <div class='{$toggled ? "max-md:translate-y-0" : "max-md:-translate-y-[calc(100%-6rem)]"} md:pr-12 bg-black backdrop-blur-sm w-3/4 flex justify-center max-md:h-screen max-md:border-b-2 max-md:w-screen max-md:fixed max-md:flex-col max-md:transition-transform max-md:duration-500 max-md:ease-in-out' id='mobile'>
        <div class='w-3/4 flex items-center gap-16 max-md:basis-3/5 max-md:gap-16 max-md:flex-col justify-center max-md:w-full text-3xl md:text-2xl' id='links'>
            <a id='hover' on:click={toggleNav} href='/about' class='relative'>About</a>
            <a id='hover' on:click={toggleNav} href='/projects' class='relative'>Projects</a>
            <a id='hover' on:click={toggleNav} href='/contact' class='relative'>Contact</a>
        </div>
        <div class='w-1/4 flex items-center gap-8 justify-center md:justify-end max-md:w-full max-md:gap-16' id='socials'>
            <a href='/'>
                <Icon width='{$isMobile ? '48':'32'}' icon="mdi:linkedin" />
            </a>
            <a href='/'>
                <Icon width='{$isMobile ? '48':'32'}' icon="mdi:email" />
            </a>
        </div>
    </div>
    <button title="Menu" class="bg-transparent flex md:hidden z-20 items-center relative justify-end mr-12 w-1/4" type="button" on:click={toggleNav}>
		<div id="menu-toggle" class={$toggled ? 'toggled' : ''}>
			<div id="icon" class="relative h-[0.2rem] w-[1.8rem] transition-all duration-200 {$toggled ? 'bg-transparent before:bg-red-500 after:bg-red-500 after:rotate-45 before:-rotate-45' : 'bg-white before:bg-white after:bg-white'}"/>
		</div>
</nav>
<svelte:window bind:innerWidth={width} on:resize={handleResize}/>

<style>
    #hover:before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.2rem;
        background: #fff;
        transform: scaleX(0);
    }
    #hover:hover:before {
        transform: scaleX(1);
    }
    a:before, a:after {
        content: '';
        position: absolute;
        transition: transform .2s ease;
    }
    #hover:active:before {
        transform: scaleX(1);
    }
    #hover:focus:before {
        transform: scaleX(1);
    }

    /* Navbar toggle button */
    #menu-toggle.toggled > #icon:before {
        top: 0px;
    }
    #menu-toggle.toggled > #icon:after {
        bottom: 0px;
    }
    #icon:before,
    #icon:after {
        height: 0.2rem;
        left: 0px;
        position: absolute;
        transition: all 0.25s;
        width: 1.8rem;
    }
    #icon:before {
        top: -0.55rem;
    }
    #icon:after {
        bottom: -0.55rem;
    }
</style>