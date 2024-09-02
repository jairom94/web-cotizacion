<template>
  <div class="bg-slate-900 max-w-[100vw]">
    <nav-bar :tiendas="data.tiendas"></nav-bar>
    <main class="grid grid-cols-1 place-items-center pt-[80px] pb-6">
      <tienda-slider :tiendas="data.tiendas"> </tienda-slider>
      <div class="grid grid-col-1 gap-2 place-items-center">
        <h3 class="text-white w-full font-bold grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">          
          <span class="md:block md:text-left md:w-full">AMAZON HOGAR</span>
          <a class="md:block md:text-right md:w-full" :href="data.tiendas[0].url">
            <button class="font-normal border rounded px-4 py-1 hover:bg-slate-700 transition-all">Visitar Tienda</button>
          </a>          
        </h3>
        <amazon-slider tienda="AMAZON_HOGAR"</amazon-slider>
          <h3 class="text-white w-full font-bold grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">          
          <span class="md:block md:text-left md:w-full">AMAZON CUIDADO</span>
          <a class="md:block md:text-right md:w-full" :href="data.tiendas[0].url">
            <button class="font-normal border rounded px-4 py-1 hover:bg-slate-700 transition-all">Visitar Tienda</button>
          </a>          
        </h3>
        <amazon-slider tienda="AMAZON_CUIDADO"></amazon-slider>
        <h3 class="text-white w-full font-bold grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">          
          <span class="md:block md:text-left md:w-full">SHEIN SUGERIDOS</span>
          <a class="md:block md:text-right md:w-full" :href="data.tiendas[1].url">
            <button class="font-normal border rounded px-4 py-1 hover:bg-slate-700 transition-all">Visitar Tienda</button>
          </a>          
        </h3>
        <shein-slider animation="true"></shein-slider>
        <h3 class="text-white w-full font-bold grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">          
          <span class="md:block md:text-left md:w-full">SHEIN SUPERVENTAS</span>
          <a class="md:block md:text-right md:w-full" :href="data.tiendas[1].url">
            <button class="font-normal border rounded px-4 py-1 hover:bg-slate-700 transition-all">Visitar Tienda</button>
          </a>          
        </h3>
        <shein-box></shein-box>    
        <h3 class="text-white w-full font-bold grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">          
          <span class="md:block md:text-left md:w-full">ALIEXPRESS SUGERIDOS</span>
          <a class="md:block md:text-right md:w-full" :href="data.tiendas[2].url">
            <button class="font-normal border rounded px-4 py-1 hover:bg-slate-700 transition-all">Visitar Tienda</button>
          </a>          
        </h3>
        <ali-slider></ali-slider>
        <h3 class="text-white w-full font-bold grid grid-cols-1 place-items-center gap-2">
          <span>COTIZAR COMPRAS</span>
        </h3>
        <cotizar-compra></cotizar-compra>
        
      </div>
    </main>
    <footer>
      <footer-comp></footer-comp>
    </footer>
  </div>
</template>
<script setup>
import NavBar from "./components/partial/NavBar.vue";
import amazonFont from "./assets/imgs/amazonFont.jpg";
import sheinFont from "./assets/imgs/sheinFont.webp";
import aliexpressFont from "./assets/imgs/aliexpressFont.jpg";
import adidasFont from "./assets/imgs/adidasFont.jpg";
import victoriaFont from "./assets/imgs/victoriaFont.webp";
import calvinFont from "./assets/imgs/calvinFont.jpeg";
import asosFont from "./assets/imgs/asosFont.webp";
import nikeFont from "./assets/imgs/nikeFont.webp";

const data = {
  tiendas: [
    {
      name: "Amazon",
      url: "https://www.amazon.com/",
      font: amazonFont,
      carrusel: [],
    },
    {
      name: "Shein",
      url: "https://www.shein.com/",
      font: sheinFont,
      carrusel: [],
    },
    {
      name: "Aliexpress",
      url: "https://best.aliexpress.com/",
      font: aliexpressFont,
      carrusel: [],
    },
    {
      name: "Adidas",
      url: "",
      font: adidasFont,
      carrusel: [],
    },
    {
      name: "Victoria Secret",
      url: "",
      font: victoriaFont,
      carrusel: [],
    },
    {
      name: "Calvin Klein",
      url: "",
      font: calvinFont,
      carrusel: [],
    },
    {
      name: "Asos",
      url: "",
      font: asosFont,
      carrusel: [],
    },
    {
      name: "Nike",
      url: "",
      font: nikeFont,
      carrusel: [],
    },
    
  ],
};
import { computed, onMounted, ref } from "vue";
const flag = ref(false);
const showMenu = () => {
  flag.value = !flag.value;
};

//ICONS
import IconMenu from "./components/icons/IconMenu.vue";
import IconClose from "./components/icons/IconClose.vue";
//COMPONENTS
import TiendaSlider from "./components/TiendaSlider.vue";
import AmazonSlider from "./components/AmazonSlider.vue";
import CotizarCompra from "./components/CotizarCompra.vue";
import SheinSlider from "./components/SheinSlider.vue";
import SheinBox from "./components/SheinBox.vue";
import AliSlider from "./components/AliSlider.vue";
import FooterComp from "./components/partial/FooterComp.vue";
</script>
<style scoped>
.btn {
  @apply bg-slate-950 text-white px-2 py-3 rounded;
}

.menu {
  top: -90%;
  left: -100%;
  right: 0;
  bottom: 0;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 200%;
  transition: all 0.5s ease-in-out;  
}


.transition-hide {
  transition: height 0.3s ease-in-out;
}
</style>
