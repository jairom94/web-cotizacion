<template>
<div>
    <header class="h-[60%] w-full py-1 px-2">
        <img class="size-full object-cover object-center" :src="img" :alt="name" />
    </header>
    <section class="[user-select:none] flex flex-col justify-between h-[40%] w-full">
        <h3 class="name-product">
            <a
            rel="noopener" target="_blank"
            :title="name"
            class="text-black font-semibold transition-all hover:underline"  
            :href="url">
                {{ name }}
            </a>
        </h3>
        <h4 class="text-sm">
        <span>{{ Price }}</span>        
        </h4>
    </section>
</div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps([
    'name',
    'img',
    'url',
    'price'
])
const Price = computed(()=>{    
    return props.price.length>10 ? props.price.split('US')[1] : props.price.split(' ')[1]   //.split('US')[1];
})
</script>
<style scoped>
.name-product{
    @apply text-xs whitespace-normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
}
</style>