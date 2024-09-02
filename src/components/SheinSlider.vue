<template>
  <div class="relative">
    <div
      class="size-8 absolute rounded-full flex justify-center items-center top-[45%] -left-4 z-10"
    >
      <button
        @click="moveLeft"
        class="size-full rounded-[inherit] p-1 bg-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
      >
        <
      </button>
    </div>
  <div ref="$contenedor" class="contenedor relative">
    
    <div
      ref="$slider"
      class="slider"
      @touchstart="dragStart"
      @touchmove="dragging"
      @touchend="dragEnd"
      :style="{
        transform: `translateX(-${slideX * 100}%)`,
      }"
      :class="[animation ? 'animate-slide' : '', isPaused ? 'pause':'']"
    >
      <div
        class="item cursor-pointer"
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
  </div>
  <div
      class="size-8 rounded-full absolute flex justify-center items-center -right-4 top-[45%]"
    >
      <button
        @click="moveRight"
        class="size-full rounded-[inherit] p-1 bg-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
      >
        >
      </button>
    </div>
</div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
const props = defineProps([
  'animation'
])
const isPaused = ref(false);
const $contenedor = ref(null);
const $slider = ref(null);
const startDrag = ref(false);
const isDragging = ref(false);
const slideX = ref(0);
const anchoSlider = computed(()=>{
    return useProducts.products_shein_superventas.length * 200;
})
const anchoContenedor = computed(()=>{
    return $contenedor.value.offsetWidth;
})
let startX = 0;
let currentX = 0;
let diffX = 0;
const increX = computed(()=>{    
    return 200/anchoContenedor.value
});
//PRODUCTO
import productShein from "./partial/ProductShein.vue";
//SORE
import useProductsStore from "../store/useProductsStore";

const moveLeft = () => {
    if(slideX.value > 0){
        if(props.animation){
          isPaused.value = true;
          slideX.value-=increX.value;  
          isPaused.value = false;
        }
        slideX.value-=increX.value;
    }
    if(slideX.value < 0){
        slideX.value=0;
    }    
};
const moveRight = () => {        
    if (slideX.value < useProducts.products_shein_superventas.length - 1){
        //const diff = slideX.value - (anchoContenedor.value/anchoSlider.value);                
        slideX.value+=increX.value;        
    }
    //console.log(slideX.value);
};
const autoSlide = () => {
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      if (slideX.value < useProducts.products_shein_superventas.length - 1) {
        slideX.value+=increX.value;
      }
    } else {
      if (slideX.value > 0) {
        slideX.value-=increX.value;
      }
    }
    startX = 0;
    currentX = 0;
  }
};
const dragStart = (e) => {
  startDrag.value = true;
  startX = e.touches[0].clientX;
};
const dragging = (e) => {
  if (!startDrag.value) return;
  isDragging.value = true;
  currentX = e.touches[0].clientX;
  diffX = startX - currentX;
};
const dragEnd = (e) => {
  startDrag.value = false;
  if (!isDragging) return;
  isDragging.value = false;
  autoSlide();
};
let offset = 1;
let animationID = null;
const startSlice = () => {
  animationID = requestAnimationFrame(startSlice);
};
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
onMounted(async () => {
  await useProducts.fetchProducts("SHEIN_SUPERVENTAS");
});
onMounted(() => {
  //document.addEventListener('mousemove', dragging);
  //document.addEventListener("mouseup", dragEnd);
});
onMounted(() => {
  //startSlice();
});

onUnmounted(() => {
  //document.removeEventListener('mousemove', dragging);
  //document.addEventListener("mouseup", dragEnd);
});
</script>
<style scoped>
.contenedor {
  --width-contenedor: 45vw;
  --height-contenedor: 300px;
  @apply w-[85vw] h-[300px] border-2 border-white overflow-hidden;
  .slider {
    @apply flex size-full transition-all ease-in-out duration-300;
    .item {
      @apply h-full box-border min-w-[200px];
    }
    .item1 {
      @apply bg-red-500;
    }
    .item2 {
      @apply bg-yellow-400;
    }
    .item3 {
      @apply bg-orange-300;
    }
    .item4 {
      @apply bg-indigo-600;
    }
  }
}
.animate-slide{
  animation: slide 60s linear infinite;
}
.pause{
  animation-play-state: paused;
}
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-900%);
  }
  
}
</style>
