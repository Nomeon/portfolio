<script lang='ts'>
    import { isMobile, toggled } from "./stores";
</script>

<div id="content" class="absolute top-0 left-0 w-[calc(100%-4rem)] h-[calc(100%-4rem)] p-4">
    <h1 class="text-4xl/8 font-extralight">Stijn Nijhuis</h1>
    <h2 class="text-xl/normal font-extralight">Business & IT</h2>
</div>
<div id='info' class='w-2/3 md:w-1/3 lg:w-1/5 absolute right-0 text-right p-4 transition-all duration-300' style='bottom: {$toggled ? `${2 + ($isMobile ? 14 : 4)}rem` : '0'}'>
    <h3 class="text-lg/normal">Passionate about business optimizations and IT implementations, combining these worlds to deliver solutions that benefit both.</h3>
</div>