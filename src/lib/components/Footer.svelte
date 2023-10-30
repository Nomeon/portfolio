<script lang='ts'>
    import Icon from '@iconify/svelte';
</script>

<div class='h-24 w-full flex bg-dark1 border-t-2'>
    <div id='socials' class='w-1/3 flex items-center justify-center'>
        <div class='flex items-center justify-center gap-8'>
            <a href='/'>
                <Icon width='32' icon="mdi:linkedin" />
            </a>
            <a href='/'>
                <Icon width='32' icon="mdi:email" />
            </a>
        </div>
    </div>
    <div id='tandc' class='w-1/3 flex items-center justify-center'>
        <a href='/terms.pdf' download>Terms and Conditions</a>
    </div>
    <div id='footer-text' class='w-1/3 flex items-center justify-center'>   
        <p class='text-center text-sm'>© 2023 Nomeon. All rights reserved.</p>
    </div>
</div>