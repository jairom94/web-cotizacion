<template>
  <header class="w-full bg-slate-800 h-[60px] flex items-center pl-2 fixed z-50">
    <div class="pt-2">
      <button @click="show = !show"       
      class="btn-menu"
      :class="[show ? 'btn-push':'']"
      >
        <div class="linea linea1"></div>
        <div class="linea linea2"></div>
        <div class="linea linea3"></div>
      </button>
    </div>
    <Transition name="slide-fade">
      <ul v-if="show" class="menu">
        <li
          class="bg-slate-700 w-full h-full flex justify-center items-center py-2 underline uppercase"
        >
          Tiendas disponibles
        </li>
        <li class="items flex gap-2" v-for="tienda in tiendas" :key="tienda.name">
          <span>
            <ico-shop width="15" height="20">            
            </ico-shop>
          </span>
          {{ tienda.name }}
        </li>
      </ul>
    </Transition>
  </header>
</template>
<script setup>
import IcoShop from '../icons/IcoShop.vue';
import { ref } from "vue";
const props = defineProps(["tiendas"]);
const show = ref(false);
</script>
<style scoped>
.btn-menu {
  @apply text-white size-[2.5rem] [border:0] flex flex-col gap-[.75rem];
  &:hover {
    .linea11 {
      @apply rotate-[45deg];
    }
    .linea22 {
      @apply opacity-0;
    }
    .linea33 {
      @apply rotate-[-45deg];
    }
  }

  .linea {
    @apply h-[3px] w-full bg-white rounded-[5px] origin-left transition-all duration-700;
  }
}
.btn-push {
  .linea1 {
    @apply rotate-[45deg];
  }
  .linea2 {
    @apply opacity-0;
  }
  .linea3 {
    @apply rotate-[-45deg];
  }
}
.menu {
  @apply absolute bg-slate-800 text-white top-[60px] left-0 w-[100vw] min-h-[calc(100vh-60px)];
  @apply grid grid-cols-1 place-items-center gap-1;
  .items {
    @apply p-2 cursor-pointer bg-slate-900 w-full h-full text-center flex justify-center items-center;
    &:hover {
      @apply bg-slate-800;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
