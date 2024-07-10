<template>
  <div ref="$container" class="carrusel relative">
    <div
      ref="$slider"
      @touchstart="dragStart"
      @touchmove="dragging"
      @touchend="dragEnd"
      class="grande"
      :style="{
        transform: `translateX(-${transitionImg*100}%)`,        
        }"
    >
      <figure
        v-for="tienda in tiendas"
        :key="tienda.name"
        class="cont-img relative"        
      >
        <button class="btn-tiendas">Visitar {{ tienda.name }}</button>
        <img
          class="size-full object-cover object-top img"
          :src="tienda.font"
          :alt="tienda.name"
        />
      </figure>
    </div>
    <ul class="puntos">
      <li v-for="(img, index) in imgsTotal" :key="index" class="punto relative">
        <button
          class="inline-block absolute inset-0 size-full rounded-[inherit]"
          :class="[index == 0 ? 'activo' : '']"
          @click="changeImg($event, index)"
        ></button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, computed, defineProps } from "vue";
const props = defineProps(["tiendas"]);
const $slider = ref(null);
const $container = ref(null);
const imgsTotal = computed(() => {
  return props.tiendas.length;
});
const imgSelect = ref();
const transitionImg = ref(0);
const changeImg = (e, index) => {
  transitionImg.value = index;  
  imgSelect.value = e.target;
  const puntos = document.querySelectorAll(".punto > button");
  puntos.forEach((punto) => {
    punto.classList.remove("activo");
  });
  imgSelect.value.classList.add("activo");
  //console.log(sizeImg);
};
//EVENTOS TOUCH MOVIL
const startDrag = ref(false);
const isDragging = ref(false);
const deslizarImage = () => {
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      if(transitionImg.value < imgsTotal.value -1)transitionImg.value++;     
    } else {
      if(transitionImg.value > 0)transitionImg.value--;
    }
    startX = 0;
    currentX = 0;
  }
};

let startX = 0;
let currentX = 0;
let diffX = 0;
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
  if(!isDragging)return;
  isDragging.value = false;
  deslizarImage();
};
</script>
<style scoped>
.carrusel {
  @apply w-[90vw] h-[40vh] bg-slate-900 overflow-hidden;

  .grande {
    @apply flex size-full transition-all ease-in-out duration-300;

    .cont-img {
      @apply min-w-full h-full box-border;
      .img {
        mask-image: linear-gradient(black 40%, transparent);
      }
      .btn-tiendas {
        @apply absolute transition-all block border-2 border-white px-4 py-2 text-white left-2 bottom-10 z-10 rounded;
      }
      .btn-tiendas:hover {
        @apply border-slate-300 text-slate-300;
      }
    }
  }
  .puntos {
    @apply flex flex-row gap-2 justify-center py-2 absolute bottom-2 left-[50%] translate-x-[-50%];

    .punto {
      @apply size-3 bg-gray-500 rounded-full transition-all;
    }
    .activo {
      @apply bg-[#3498db];
    }
  }
}
</style>
