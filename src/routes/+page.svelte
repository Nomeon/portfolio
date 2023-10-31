<script>
    import Icon from "@iconify/svelte";
</script>

<section id="personal" class='h-screen justify-center flex flex-col px-4'>
    <h1 class="text-4xl w-full border-b-2 pb-1 border-sky-500">Stijn Nijhuis</h1>
    <div id='info' class='pt-4'>
        <h3 class="text-lg">Passionate about business optimizations and IT implementations, combining these worlds to deliver solutions that benefit both.</h3>
    </div>
    <div class='mt-8 justify-center flex'>
        <button class='px-8 py-2 text-slate-950 rounded-md bg-white font-semibold'>Find out more</button>
    </div>
</section>
<section id='story' class='h-screen justify-center flex flex-col px-4'>
    <h1 class="text-4xl w-full border-b-2 pb-1 border-sky-500">My background</h1>
    <div id='info' class='pt-4'>
        <p class="text-lg">After graduating in Business & IT at the University of Twente, I found my groove: coming up with smart solutions that fit just right with the company. My goal? Making things simpler and better, so everyone can do their job with ease and do it well.</p>
        <p class='text-lg mt-8'>Curious about how I can benefit your company? Dive into my <a class='text-sky-500' href='/projects'>portfolio</a> or send me a message!</p>
    </div>
    <div class='mt-8 justify-center flex'>
        <button class='px-8 py-2 text-slate-950 rounded-md bg-white font-semibold'>Contact me</button>
    </div>
</section>
<section id="coding" class='h-[calc(100vh-5rem)] justify-center flex flex-col px-4'>
    <h1 class="text-4xl w-full border-b-2 pb-1 border-sky-500">Two languages</h1>
    <div id='info' class='pt-4'>
        <p class="text-lg">In the dynamic landscape of Business & IT, two distinct languages often emerge: the strategic voice of business and the technical dialect of IT. Bridging the gap between these worlds is what I do best. I comprehend the business challenges and translate them seamlessly for the tech team. This ensures solutions that are aligned with business goals and technically robust.</p>
        <p class='text-lg mt-4'>When the off-the-shelf solutions fall short, I take a proactive approach. I create custom software that fits; whether it's to transform data, run detailed production simulations, or connecting two existing software systems.</p>
        <div id='icons' class='flex gap-8 mt-4 w-full justify-center'>
            <Icon width='32' icon="logos:python" />
            <Icon width='32' icon="vscode-icons:file-type-rust" />
            <Icon width='32' icon="devicon:svelte" />
            <Icon width='32' icon="skill-icons:typescript" />    
            <Icon width='32' icon="skill-icons:javascript" />
        </div>
    </div>
</section>

<svelte:head>
	<title>Home | Nomeon</title>
</svelte:head>

<style>
    button {
        transition: all 0.25s;
    }
    button:hover {
        transform: scale(1.05);
    }
</style>