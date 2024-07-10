<template>
  <div class="relative">
    <button
      @click="slideLeft"
      class="bg-indigo-300 absolute size-8 z-[1] top-[42%] rounded-full -left-3 text-md text-center text-slate-900 transition-all delay-300 hover:bg-indigo-400"
    >
      <
    </button>
  <div
    class="carrusel-cont-product"
    
    ref="contentCarrusel"
  >        
    <div
      class="grande animate-slider"
      @pointerenter="hoverProduct"
      @pointerleave="leaveProduct"
      ref="contentProduct"
    >
      <product-comp
        v-for="(product, index) in stackData"
        :key="index"
        :name="product.name"
        :image="product.image"
        :price="product.price"
        :rating="product.stars"
        :url="product.url"
      ></product-comp>
    </div>
    
  </div>
  <button
      @click="slideRight"
      class="bg-indigo-300 size-8 absolute top-[42%] rounded-full -right-3 text-md text-center text-slate-900 transition-all delay-300 hover:bg-indigo-500"
    >
      >
    </button>
</div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import ProductComp from "../components/partial/ProductComp.vue";
import useProductsStore from "../store/useProductsStore.js";
//PROPIEDADES
const props = defineProps([
    'tienda'
])
//STORE PRODUCT
const useProducts = useProductsStore();
//SLIDER PRODUCTO
const contentCarrusel = ref(null);
const contentProduct = ref();
//COMPUTED
const widthCont = computed(() => {
  if (window.innerWidth < 500 || stackData.value.length <= 4) {
    return 160 * 2;
  } else if (window.innerWidth < 800 && window.innerWidth > 500) {
    return 160 * 3;
  }
  return 160 * 6;
});
const stackData = computed(() => {
    if(props.tienda === 'AMAZON_HOGAR'){
        return useProducts.products_amazon_hogar;
    }        
    else if(props.tienda === 'AMAZON_CUIDADO'){
        return useProducts.products_amazon_cuidado
    }

});
//FUNCIONES
let animationID = null;
const hoverProduct = () => {
  cancelAnimationFrame(animationID);
};
const leaveProduct = () => {
  startAnimation();
};

function rollNodeList(sliderEl) {
  sliderEl.appendChild(sliderEl.firstElementChild);
}
function backNodeList(sliderEl) {
  sliderEl.prepend(sliderEl.lastElementChild);
}

let offset = 0;
let contItem = 0;

const startAnimation = () => {
  const sliderEl = contentProduct.value;
  const animate = () => {
    offset -= 1;
    if (Math.abs(offset) % 168 === 0) {
      //sliderEl.style.setProperty('--transition','none');
      rollNodeList(sliderEl);
      offset += 168;
      contItem++;
    }
    //console.log('Pasos caminados', contItem)
    sliderEl.style.transform = `translateX(${offset}px)`;
    //sliderEl.style.setProperty('--transition','transform 1s');
    animationID = requestAnimationFrame(animate);
  };
  animate();
};
const pauseAnimation = () => {
  if (animationID) {
    cancelAnimationFrame(animationID);
    animationID = null;
  }
};
const slideRight = () => {
  const sliderEl = contentProduct.value;
  const contSliderEl = contentCarrusel.value;
  pauseAnimation();
  offset -= 50;
  sliderEl.style.transform = `translateX(${offset}px)`;
  console.log(offset, sliderEl.scrollWidth);
  console.log(contentCarrusel.value.clientWidth);
  if (
    Math.abs(offset) >= sliderEl.scrollWidth - contSliderEl.clientWidth &&
    Math.abs(offset) <= sliderEl.scrollWidth
  ) {
    rollNodeList(sliderEl);
    offset = contSliderEl.clientWidth * -1;
    startAnimation();
  }
};
const slideLeft = () => {
  //pauseAnimation();
  const sliderEl = contentProduct.value;
  if (contItem >= 1) {
    pauseAnimation();
    for (let i = 0; i < contItem; i++) {
      backNodeList(sliderEl);
    }
    contItem = 0;
    startAnimation();
  } else {
    offset = 0;
    pauseAnimation();
    backNodeList(sliderEl);
    startAnimation();
  }
};
//ON MOUNTED
onMounted(() => {
  startAnimation();
});
//API AMAZON
onMounted(async () => {
  await useProducts.fetchProducts(`${props.tienda}`);
});
</script>
<style scoped>
.carrusel-cont-product {
  --width-contenedor:45vw;
  @apply h-[300px] w-[calc(var(--width-contenedor)*1.9)] md:w-[calc(var(--width-contenedor)*2)] whitespace-nowrap relative overflow-hidden;

  .grande {
    @apply h-full bg-white inline-block space-x-2 whitespace-nowrap;
  }
}
</style>
