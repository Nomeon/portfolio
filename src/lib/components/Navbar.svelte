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

    function logoToggle() {
        if ($toggled) {
            toggleNav();
        }
    }
</script>

<nav class='h-20 w-full bg-slate-950 flex justify-between fixed text-white border-b-2'>
    <div class='w-1/2 flex items-center justify-start h-full pl-4 z-20' id='logo'>
        <a href='/' on:click={logoToggle}><img class='h-8' src="/weblogo.svg" alt="Nomeon Logo" /></a>
    </div>
    <div class='{$toggled ? "translate-x-0" : "translate-x-full"} bg-slate-950 z-10 flex justify-center w-full h-full fixed flex-col transition-transform duration-500 ease-in-out' id='mobile'>
        <div class='flex items-center gap-8 basis-3/5 flex-col justify-center w-full text-3xl' id='links'>
            <a id='hover' on:click={toggleNav} href='/about' class='relative'>About</a>
            <a id='hover' on:click={toggleNav} href='/projects' class='relative'>Projects</a>
            <a id='hover' on:click={toggleNav} href='/contact' class='relative'>Contact</a>
        </div>
        <div class='flex items-center gap-8 justify-center w-full' id='socials'>
            <a href='/'>
                <Icon width='48' icon="mdi:linkedin" />
            </a>
            <a href='/'>
                <Icon width='48' icon="mdi:email" />
            </a>
        </div>
    </div>
    <button title="Menu" class="bg-transparent flex md:hidden z-20 items-center relative justify-end pr-4 w-1/2" type="button" on:click={toggleNav}>
        <div id="menu-toggle" class={$toggled ? 'toggled' : ''}>
            <div id="icon" class="relative h-[0.2rem] w-[1.8rem] transition-all duration-200 {$toggled ? 'bg-transparent before:bg-sky-400 after:bg-sky-400 after:rotate-45 before:-rotate-45' : 'bg-white before:bg-white after:bg-white'}"/>
        </div>
    </button>
</nav>
<svelte:window bind:innerWidth={width} on:resize={handleResize}/>

<style>
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
        top: -0.6rem;
    }
    #icon:after {
        bottom: -0.6rem;
    }
</style>