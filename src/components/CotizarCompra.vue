<template>
  <div class="text-white w-full space-y-2">
    <div class="relative p-2 border w-[90vw] border-white rounded">
      
      <div 
        ref="$notify"                
        class="transition-all duration-700 ease-in-out absolute top-1 right-1 rounded flex items-center gap-2 px-2 py-1 bg-emerald-500"
        :style="{opacity: productAdd ? '1' : '0'}"
        >
        <ico-check width="20" height="20"></ico-check>
        <span class="text-xs">
          Producto Agregado
        </span>
      </div>

      <div 
      ref="$formCotizar"
      class="grid grid-cols-1 gap-2 pb-4 pt-2">   
        <input v-if="flagChange" type="hidden" v-model="compraID">     
        <input-comp
          v-model="link"
          @paste="urlPegado"
          :class="[flagUrl ? 'hidden': '']"
          :error="errorUrl"
          title="Porfavor pegue la url del producto"
          ref="$link"
          placeholder="Pegar Url/link del producto"
        ></input-comp>
        <span         
        class="url-pegado text-lg"
        :style="{display: flagUrl ? '' : 'none'}"
        >{{ link }}</span>
      </div>
      <div class="pb-4">
        <checkbox-comp v-model="productoUnico"></checkbox-comp>
      </div>
      <div class="grid grid-cols-1 gap-2">
        <input-comp
          :error="errorColorTalla"
          title="Ingrese el color y talla del producto, si es requerido."
          ref="$color_talla"
          v-model="description"
          :disabled="disabledInputDescription"
          placeholder="Color, talla, etc..."
        ></input-comp>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-3">
        <Button class="btn-add" @click="addUrl">
        <span v-if="!flagChange">Añadir</span>
        <span v-else>Editar</span>
        </Button>
        <Button 
        @click="clearUrl"
        class="bg-red-500 rounded hover:bg-red-600 transition-colors ease-in-out">
          Borrar
        </Button>
      </div>
    </div>

    <div class="">
      <div class="">
        <compra-comp v-for="(compra,index) in urls" 
        :key="index"
        :compra="compra"
        :index="index"
        @delete-compra="deleteCompra"
        @edit-compra="editCompra"
        >
      </compra-comp>        
        <div v-if="urls.length > 0" class="flex px-2">
            <button class="btn-cotizar">
                <div class="">
                    <ico-whatsapp width="30" height="30"></ico-whatsapp>
                </div>
                <div class="font-semibold">
                    <span>Enviar Cotización</span>
                </div>                
            </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import InputComp from "./partial/InputComp.vue";
import CheckboxComp from "./partial/CheckboxComp.vue";
import CompraComp from "./CompraComp.vue";
import IcoWhatsapp from "../components/icons/IcoWhatsapp.vue";
import IcoCheck from "./icons/IcoCheck.vue";
const link = ref("");
const description = ref("");
const urls = ref([]);
const productoUnico = ref(false);
const flagUrl = ref(false);
const errorUrl = ref(null);
const errorColorTalla = ref(null);
const $formCotizar = ref(null);
const $link = ref(null);
const $color_talla = ref(null);
const $notify = ref(null);
const productAdd = ref(false);
const flagChange = ref(false);
const compraID = ref(0);
let ID_compra = 1;
//FUNCTIONS
const urlPegado = async (e) => {    
    await new Promise((resolve) => setTimeout(resolve, 0))
    if(link.value.slice(0,8) !== 'https://'){
        link.value = '';
        flagUrl.value = false;
        return;
    }
    flagUrl.value = true;    
}
const validarUrl = () => {
  if(link.value.slice(0,8) !== 'https://'){
    const message = 'La url no es valida.';
    errorUrl.value = {
      message:message,
      type:'danger'
    }    
    if($link.value) $link.value.focus();
    return false;
  }
  errorUrl.value = null;
  return true;
}
//COMPUTED PROPERTY
const disabledInputDescription = computed(()=>{
  if(productoUnico.value) {
    errorColorTalla.value = null;
    return true;
  }
  return false;
})
const validarColorTalla = () => {
  if(productoUnico.value || description.value !== ''){
    //disabledDescription.value = true;
    return true;
  }
  const message = 'Registre el color, talla o detalle del producto si lo requiere.';
  errorColorTalla.value = {
    message:message,
    type:'danger'
  }
  return false;
}
function showNotify(){
  productAdd.value = true;
  setTimeout(() => {
    productAdd.value = false;
  }, 3000);
}
const addUrl = () => {
  if(!validarUrl()) return;
  if(!validarColorTalla())return;
  if(flagChange.value){
    //const index = urls.value.findIndex((item) => item.id === compra_id.value);
    const compra = urls.value.find((item)=> item.id === compraID.value)
    compra.url = link.value;
    compra.unique = productoUnico.value;
    compra.description = description.value;
    flagChange.value = false;
    link.value = "";
    flagUrl.value = false;
    productoUnico.value = false;
    description.value = "";
    showNotify();
    return;
  }
  const item = {};
  item.id = ID_compra;
  item.url = link.value;
  item.unique = productoUnico.value;
  item.description = description.value;
  urls.value.push(item);
  link.value = "";
  flagUrl.value = false;
  productoUnico.value = false;
  description.value = "";
  ID_compra++;
  //disabledDescription.value = false;
  showNotify();
};
const clearUrl = () => {
  link.value = "";
  flagUrl.value = false;
  productoUnico.value = false;
  description.value = "";
  errorColorTalla.value = null;
  //disabledDescription.value = false;
};
//DELETE COMPRA
const urlsData = computed(()=>{
  //console.log(urls.value)
  return urls.value;
})
const deleteCompra = (compra_id) => {
  setTimeout(()=>{
    const index = urls.value.findIndex((item) => item.id === compra_id);
    urls.value.splice(index, 1);        
  },300);
  //console.log(urls.value)
}
const editCompra = (compra_id) => {
  const index = urls.value.findIndex((item) => item.id === compra_id);
  const compra = urls.value[index];
  link.value = compra.url;
  flagUrl.value = false;
  productoUnico.value = compra.unique;
  description.value = compra.description;
  $formCotizar.value.scrollIntoView();
  $link.value.focus();
  flagChange.value = true;
  compraID.value = compra_id;
}
async function cargarCotizaciones(){
    
}
</script>
<style scoped>
.url-pegado{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    @apply w-[300px] whitespace-normal;
}
.btn-add {
  @apply bg-indigo-800 px-6 py-2 rounded hover:bg-indigo-600 transition-colors ease-in-out;
}
.txt-url {
  @apply p-1 rounded text-black text-lg;
}
.lbl-url {
  @apply font-semibold text-lg absolute p-1 rounded;
}
.txt-description {
  @apply p-1 text-lg text-gray-100 bg-inherit outline-none border-b-2;
}
.lbl-description {
  @apply text-lg text-slate-400 absolute p-1 rounded;
}
.btn-cotizar{
    @apply bg-green-500 px-6 py-2 w-full rounded flex justify-center gap-2;
}

</style>
