<template>
<div class="size-full bg-white">
    <header class="h-[63%] w-full py-2 px-7 md:px-4">
        <img class="size-full object-cover object-center" :src="img" :alt="name" />
    </header>
    <section class="[user-select:none] flex flex-col justify-between h-[37%] w-full p-2">
        <h3 class="name-product">
            <a
            rel="noopener" target="_blank"
            class="text-black font-semibold transition-all hover:underline"  
            :href="Url">
                {{ name }}
            </a>
        </h3>
        <h4 class="flex justify-between items-center pl-1 pr-4 py-1">
            <span class="">
                <span v-if="flagDiscount" class="line-through text-[0.6rem] mr-1">{{ Price }}</span>
                <span :class="[flagDiscount ? 'text-orange-500':'']">{{ TotalPrice }}</span>
                <span v-if="flagDiscount" class="ml-1 text-sm text-orange-500 rounded border px-1 border-orange-600">{{ Discount }}</span>
            </span>
            <span class="ml-1 border border-black rounded-full">
                <a rel="noopener" target="_blank" class="size-full rounded-[inherit] px-2 py-1" :href="Url">Ver</a>
            </span>
        </h4>
    </section>
</div>
</template>
<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps([
    'img',
    'name',
    'url',
    'price',
    'discount'
])
const flagDiscount = computed(()=>{
    return props.discount!=='' ? true : false;
})
const Url = computed(()=>{
    return `https://es.shein.com${props.url}`;
})
const Price = computed(()=>{
    return `$${props.price}`;
})
const Discount = computed(()=>{
    if(props.discount==='')return '';
    return `-${props.discount}%`;
})
const TotalPrice = computed(()=>{
    if(props.discount==='')return `$${props.price}`;
    return `$${(props.price - (props.price * props.discount / 100)).toFixed(2)}`;
})
onMounted(()=>{
    //console.log(TotalPrice);
})
</script>
<style scoped>
.name-product{
    @apply text-sm whitespace-normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
}
</style>