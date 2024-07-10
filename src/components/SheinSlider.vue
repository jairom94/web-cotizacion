<template>
    <div
    ref="$contenedor"
    class="contenedor relative"
    >
    <div class="size-8 absolute rounded-full flex justify-center items-center top-[45%] -left-4">
        <button 
        @click="moveLeft"
        class="size-full rounded-[inherit] p-1 bg-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"><</button>
    </div>
        <div
        ref="$slider"
        class="slider"
        @touchstart="dragStart"
        @mousedown="dragStart"
        @touchend="dragEnd"
        @touchmove="dragging"  
        @pointerenter="hoverProduct"
        @pointerleave="leaveProduct"              
        >
            <div class="item cursor-pointer" draggable="false"
            v-for="product in useProducts.products_shein_superventas"
            :key="product.name"
            >
                <product-shein
                :img="product.img"
                :name="product.name"
                :url="product.url"
                :price="product.price"
                :discount="product.discount"
                ></product-shein>
            </div>                
            
        </div>
    <div class="size-8 rounded-full absolute flex justify-center items-center -right-4 top-[45%]">
        <button 
        @click="moveRight"
        class="size-full rounded-[inherit] p-1 bg-indigo-300 hover:bg-indigo-600 hover:text-white transition-all">></button>
    </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const $contenedor = ref(null);
const $slider = ref(null);
const startDrag = ref(false);
const isDragging = ref(false);

//PRODUCTO
import productShein from "./partial/ProductShein.vue";
//SORE
import useProductsStore from '../store/useProductsStore';
let positionDiff,prevScrollLeft, prevPageX = 0;
const moveLeft = () => {
    const $firstEl = $slider.value.firstElementChild;
    $slider.value.scrollLeft -= $firstEl.clientWidth;
}
const moveRight = () => {    
    const $firstEl = $slider.value.firstElementChild;
    $slider.value.scrollLeft += $firstEl.clientWidth;
}
const autoSlide = () => {
    const $firstEl = $slider.value.firstElementChild;
    positionDiff = Math.abs(positionDiff);
    let valDifference = $firstEl.clientWidth - positionDiff;
    if($slider.value.scrollLeft > prevScrollLeft){
        $slider.value.scrollLeft += positionDiff > $firstEl.clientWidth / 3 ? valDifference : -positionDiff;
        return;
    }
    $slider.value.scrollLeft -= positionDiff > $firstEl.clientWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    //console.log('Inica Deslizado')
    startDrag.value = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = $slider.value.scrollLeft;
}
const dragging = (e) => {
    if(!startDrag.value)return;
    
    e.preventDefault();
    //console.log('Arrastrando...')
    isDragging.value = true;
    $slider.value.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;    
    $slider.value.scrollLeft = prevScrollLeft - positionDiff;
    
}
const dragEnd = (e) => {
    //console.log('Fin del deslizado')
    $slider.value.classList.remove("dragging");
    startDrag.value = false;
    if(!isDragging.value)return;
    isDragging.value = false;
    autoSlide();
}
let offset = 1;
let animationID = null;
const startSlice = () => {    
    //($slider.value.querySelectorAll('div').length * $slider.value.firstElementChild.clientWidth) - $slider.value.clientWidth;    
    const scrollMax = useProducts.getLenSheinSuperventas * $slider.value.clientWidth;
    //console.log($contenedor.value.querySelectorAll('.slider > .item').length)
    if(scrollMax === offset){
        offset = 1;
        return;        
    }
    //console.log('Animando...');
    $slider.value.scrollLeft = offset;
    offset++;
    animationID = requestAnimationFrame(startSlice);
}
const pauseAnimation = () => {
  if (animationID) {
    cancelAnimationFrame(animationID);
    animationID = null;
  }
};
const hoverProduct = () => {
  cancelAnimationFrame(animationID);
};
const leaveProduct = () => {
  startSlice();
};

const useProducts = useProductsStore();
onMounted(async()=>{
    await useProducts.fetchProducts('SHEIN_SUPERVENTAS');
})
onMounted(() => {
    document.addEventListener('mousemove', dragging);
    document.addEventListener("mouseup", dragEnd);        
});
onMounted(()=>{
    startSlice();
})

onUnmounted(() => {
    document.removeEventListener('mousemove', dragging);
    document.addEventListener("mouseup", dragEnd);
})
</script>
<style scoped>

.contenedor{
    --width-contenedor:45vw;
    --height-contenedor:300px;
    @apply w-[calc(var(--width-contenedor)*1.9)] md:w-[calc(var(--width-contenedor)*2)] h-[var(--height-contenedor)] border-2 border-white;
    .slider{
        @apply overflow-hidden flex h-full scroll-smooth;
        .dragging{
            @apply cursor-grab scroll-auto;
        }
        .item{
            @apply flex-[0_0_auto] h-full w-[calc(var(--width-contenedor))] md:w-[calc((var(--width-contenedor)*2)/3)] lg:w-[calc((var(--width-contenedor))/3)];            
        }
        .item1{
            @apply bg-red-500;
        }
        .item2{
            @apply bg-yellow-400;
        }
        .item3{
            @apply bg-orange-300;
        }
        .item4{
            @apply bg-indigo-600;
        }
    }
}



</style>