<template>
    <div class="h-[100px] text-white grid grid-cols-1 place-items-center">
        <div class="social-media">
            <div class="glass">
            <a href="#">
            <span class="h-full flex justify-center items-center">
                <ico-whatsapp width="50%" height=""></ico-whatsapp>
            </span>
            </a>
            </div>
            <div class="glass">
            <a href="#">
            <span class="h-full flex justify-center items-center">
                <ico-instagram width="50%" height=""></ico-instagram>
            </span>
            </a>
            </div>
        </div>
        <h5 class="text-sm text-slate-400">All rights reserved 2024</h5>
    </div>
</template>
<script setup>
import IcoWhatsapp from "../icons/IcoWhatsapp.vue";
import IcoInstagram from "../icons/IcoInstagram.vue";
</script>
<style scoped>
.social-media{
    @apply flex flex-row gap-2;
    .glass{
        background: linear-gradient(#fff2, transparent);
        border: 1px solid rgba(255, 255, 255, .4);
        box-shadow: 0 25px 25px rgba(0, 0, 0, .25);
        @apply relative size-14 backdrop-blur-[10px] rounded-md transition-all;
        &:before{
            content: '';            
            @apply absolute bottom-0 h-[6px] w-full rounded-b-[inherit];
            background: rgba(255, 255, 255, .2);
        }
        &:hover{
            border: 2px solid rgba(255, 255, 255, .9);
        }
    }
}
</style>