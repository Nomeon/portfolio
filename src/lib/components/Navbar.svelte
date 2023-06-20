<script lang='ts'>
    import { toggled, isMobile } from '../../routes/stores';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    onMount(() => {
        moveMenu();
    })

    const menu = ['', 'about', 'projects', 'contact']
    
    function toggleNav() {
        $toggled ? $toggled = false : $toggled = true;
        moveMenu();
    }

    function handleClick() {
        $toggled = false;
        moveMenu();
    }

    function moveMenu() {
        let navmenu = document.getElementById('navmenu');
        if (navmenu) {
            if ($isMobile) {
                $toggled ? navmenu.style.height = '16rem' : navmenu.style.height = '0';
            } else {
                $toggled ? navmenu.style.height = '4rem' : navmenu.style.height = '0';
            }
        }
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={toggleNav} class='fixed bottom-8 right-8 rotate-90 origin-bottom-right items-end m-0 p-0 text-xl/normal text-white flex gap-2 cursor-pointer'>
    <div id='box' class='text-3xl p-0 m-0 {$toggled ? 'before:content-["■"]' : 'before:content-["□"]'}'></div>
    <h3 class=''>MENU</h3>
</div>
<nav id='navmenu' class='mix-blend-difference {$isMobile ? 'bg-gradient-to-r to-75%' : 'bg-gradient-to-t '} from-cyan-500 to-transparent w-[calc(100%-4rem)] absolute bottom-8 left-8 z-40 transition-all duration-300'>
    {#if $toggled}
    <div  in:fade={{ duration: 500 }} class='flex {$isMobile ? 'flex-col' : 'flex-row'} h-full'>
        {#each menu as menuitem}
            {#if $isMobile}
                <div class='h-[0.5px] w-full bg-[rgba(255,255,255,.7)]'></div>
            {/if}
            <div id='navlist' class='{$isMobile ? 'h-1/4 w-full justify-start pl-4 active:bg-gradient-to-r hover:bg-gradient-to-r' : 'h-full w-1/4 justify-center active:bg-gradient-to-t hover:bg-gradient-to-t'} flex items-center text-white [&>a]:hover:text-black active:from-white active:to-transparent hover:from-white hover:to-transparent'>        
                <a on:click={handleClick} class='text-white text-2xl capitalize' href={`/${menuitem}`}>{menuitem === '' ? 'Home' : menuitem}</a>
            </div>
        {/each}
    </div>
    {/if}
</nav>
<svelte:window on:resize={moveMenu}/>