<template>
  <div class="card">
    <div class="figure-container"
    :class="[pressDelete ? 'translate-x-[-200%] translate-y-[-50%]' : '-translate-x-1/2 -translate-y-1/2']"
    >
      <div class="box box1"></div>
      <div class="box box2"></div>
    </div>
    <div ref="$cardBox" class="px-2 border-2 border-white size-full rounded relative z-10 transition-all duration-300 ease-in-out"
    :class="[pressDelete ? 'translate-x-[-110%]' : '']"
    >
      <div class="card-header">
        <h5 class="card-title text-blue-300 underline">
          <a :title="compra.url" :href="compra.url">{{ compra.url }}</a>
        </h5>
        <div class="h-5 px-2 flex items-center justify-center rounded-xl absolute top-2 right-3 bg-teal-600 text-xs">
          <span :title="(index + 1)">
            {{ (index+1) }}
          </span>
        </div>
      </div>
      <div class="card-body text-sm">
        <p v-if="compra.unique" class="card-text grow">{{ txt_unique }}</p>
        <p v-else class="card-text grow uppercase">DETALLE: {{ compra.description }}</p>
        <div class="space-x-2 grow-0 pl-4 pr-2">
          <button class="btn btn-danger" title="Borrar" @click="handleDeleteCompra(compra.id)">
            <ico-borrar width="10" height="20"></ico-borrar>
          </button>
          <button class="btn btn-primary" title="Editar" @click="handleEditCompra(compra.id)">
            <ico-editar width="10" height="20"></ico-editar>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import IcoBorrar from "../components/icons/IcoBorrar.vue";
import IcoEditar from "../components/icons/IcoEditar.vue";
const txt_unique = 'Producto unico.'
const $cardBox = ref(null);
const pressDelete = ref(false);
const props = defineProps({
  compra: {
    type: Object,
    default: {  
      id:"1",    
      url: "Amazon",
      unique: false,
      description:'Description'
    },
  },
  index:{
    type:Number,
    default:0
  }
});
const emit = defineEmits([
  'deleteCompra','editCompra'
])
const handleDeleteCompra = (compra_id) => {
  emit('deleteCompra',compra_id);
  //pressDelete.value = true;
}
const handleEditCompra = (compra_id) => {
  emit('editCompra',compra_id);
}
const deleteCompra = () => {
  pressDelete.value = true;
}
const effectDelete = computed(()=>{

})
</script>
<style scoped>
.figure-container {
  @apply w-[98%] h-[95%] absolute top-[50%] left-1/2 z-0 blur-[10px] rounded transition-all duration-300 ease-in-out;  
  background: rgba(255, 255, 255, 0.2);    
}
.box {
  @apply w-[60%] h-[10px] bg-red-300 absolute rotate-[0deg];
}
.box1{
  @apply right-2 top-10 bg-gradient-to-br from-indigo-600 to-pink-400;
}
.box2{
  @apply bottom-14 left-1 bg-sky-300 rounded-full;
}

.card {
  @apply grid grid-cols-1 place-items-center w-full p-2 relative overflow-hidden;
}
.card-header {
  @apply border-b-2 border-white py-2;
  .card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    @apply w-[90%] whitespace-normal text-sm;
    
  }
}
.card-body {
  @apply py-3 flex justify-stretch w-full;
}

.btn {
  @apply px-2 py-1 rounded;
}
.btn-danger {
  @apply bg-red-500 hover:bg-red-700 transition-all;
}
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700 transition-all;
}
</style>
