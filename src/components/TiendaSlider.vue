<template>
  <div ref="$container" class="carrusel">
    <div
      ref="$slider"
      @touchstart="dragStart"
      @touchmove="dragging"
      class="grande"
      :style="{
        transform: `translateX(-${transitionImg}%)`,
        width: `${widthCarrusel}%`,
      }"
    >
      <figure
        v-for="tienda in tiendas"
        :key="tienda.name"
        class="cont-img relative"
        :style="{ width: `${widthImg}%` }"
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
const widthCarrusel = computed(() => {
  return imgsTotal.value * 100;
});
const widthImg = computed(() => {
  return `${100 / imgsTotal.value}`;
});
const imgSelect = ref();
const transitionImg = ref(0);
const changeImg = (e, index) => {
  const sizeImg = 100 / imgsTotal.value;
  transitionImg.value = index * sizeImg;
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
let positionDiff,
  prevScrollLeft,
  prevPageX = 0;
const autoSlide = () => {
  const $firstEl = $slider.value.firstElementChild;
  positionDiff = Math.abs(positionDiff);
  let valDifference = $firstEl.clientWidth - positionDiff;
  if ($slider.value.scrollLeft > prevScrollLeft) {
    $slider.value.scrollLeft +=
      positionDiff > $firstEl.clientWidth / 3 ? valDifference : -positionDiff;
    return;
  }
  $slider.value.scrollLeft -=
    positionDiff > $firstEl.clientWidth / 3 ? valDifference : -positionDiff;
};
let touchStart = 0;
let touchEnd = 0;
let startX = 0;
let currentX = 0;
//const currentSlide = ref(0);
const dragStart = (e) => {
  console.log("Inica Deslizado");
  startX = e.event.touches[0].clientX;
  //console.log(e.touches[0]);
  //const sliderX = $slider.value.offsetLeft;
  //const toqueX = e.touches[0].clientX - sliderX;
  //const anchoContainer = $container.value.offsetWidth;
  //const perSlide = toqueX/anchoContainer;
  //touchStart = perSlide*Number(widthImg.value);

  //startDrag.value = true;
  //prevPageX = e.touches[0].pageX;
  //prevScrollLeft = $slider.value.scrollLeft;
};
const dragging = (e) => {
  console.log("Moviendo el selector");
  if (!startX) return;
  currentX = e.event.touches[0].clientX;
  const diffX = startX - currentX;
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      transitionImg.value++;
    } else {
      transitionImg.value--;
    }
    startX = 0;
    currentX = 0;
  }
  /*e.preventDefault();
    const sliderX = $slider.value.offsetLeft;  
    const toqueX = e.touches[0].clientX - sliderX;
    const anchoContainer = $container.value.offsetWidth;
    const perSlide = toqueX/anchoContainer;
    touchEnd = perSlide - touchStart;*/
  /*isDragging.value = true;
    $slider.value.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;    
    $slider.value.scrollLeft = prevScrollLeft - positionDiff;*/
};
const dragEnd = (e) => {
  console.log("Fin del deslizado");
  //$slider.value.classList.remove("dragging");
  startDrag.value = false;
  if (!isDragging.value) return;
  isDragging.value = false;
  transitionImg.value = touchEnd;
  //autoSlide();
};
</script>
<style scoped>
.carrusel {
  @apply w-[90vw] bg-slate-900 pb-1 overflow-hidden;

  .grande {
    @apply flex flex-nowrap justify-between items-center gap-2 p-1 transition-all;

    .cont-img {
      @apply h-[40vh];

      .img {
        mask-image: linear-gradient(black 60%, transparent);
      }
      .btn-tiendas {
        @apply absolute transition-all block border-2 border-white px-4 py-2 text-white left-2 bottom-2 z-10 rounded;
      }
      .btn-tiendas:hover {
        @apply border-slate-300 text-slate-300;
      }
    }
  }
  .puntos {
    @apply flex flex-row gap-2 justify-center py-2;

    .punto {
      @apply size-3 bg-gray-500 rounded-full transition-all;
    }
    .activo {
      @apply bg-[#3498db];
    }
  }
}
</style>
