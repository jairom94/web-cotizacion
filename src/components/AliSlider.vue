<template>
<div class="bg-white rounded">
    
        <div class="container-ali">        
            <product-ali 
            v-for="product in ali_sugeridos"
            :key="product.name"
            :name="product.name"
            :img="product.img"
            :url="product.url"
            :price="product.price"
            class="item">
            
            </product-ali>     
        </div>
    
<div class="pagination">
<button 
@click="prevPage"
:class="pag_actual===1 ? 'hidden' : ''" 
class="btn-pag">Anterior</button>
<button 
class="btn-pag"
:class="pag_actual===i ? 'active' : ''" 
v-for="i in total_page"
:key="i"
@click="goTo(i)"
>{{ i }}</button>
<button 
@click="nextPage" 
:class="pag_actual===total_page ? 'hidden' : ''"
class="btn-pag">Siguiente</button>
</div>
</div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import useProductsStore from '../store/useProductsStore';
import ProductAli from "./partial/ProductAli.vue";

const pag_actual = ref(1);
const items_page = ref(8);
const productStore = useProductsStore();

const widthWindow = ref(window.innerWidth);
function defineItemsPage(){
    if(widthWindow.value <= 450){
        items_page.value = 8;
    }
    if(widthWindow.value > 450 && widthWindow.value <= 605){
        items_page.value = 9;
    }
    if(widthWindow.value > 605 && widthWindow.value < 760){
        items_page.value = 12;
    }
    if(widthWindow.value >= 760 && widthWindow.value < 912){
        items_page.value = 15;
    }
    if(widthWindow.value >= 912){
        items_page.value = 18;
    }
}
defineItemsPage();
onMounted(()=>{
    //widthWindow.value = window.innerWidth;
    //defineItemsPage();
    window.addEventListener('resize',()=>{
        widthWindow.value = window.innerWidth;
        defineItemsPage();

    })
})

onUnmounted(()=>{
    window.removeEventListener('resize',()=>{
        widthWindow.value = window.innerWidth;
        defineItemsPage();
    })
})

onMounted(async()=>{
 await productStore.fetchProducts('ALIEXPRESS_SUGERIDOS');
 //console.log(productStore.products_aliexpress_sugeridos);
})
const total_page = computed(()=>{
    const entero = Math.floor(productStore.getLenAliSugeridos/items_page.value)
    const cant =  productStore.getLenAliSugeridos/items_page.value
    if((cant-entero)>0){
        return entero+1;
    }    
    return entero;
});
const ali_sugeridos = computed(()=>{ 
    const start = (pag_actual.value - 1) * items_page.value;
    const fin = start + items_page.value;
    return productStore.sliceAliexpressSugeridos(start,fin);
});
const nextPage = () => {
    if(pag_actual.value < total_page.value){
        pag_actual.value++;
    }
    //console.log(ali_sugeridos.value);
}
const prevPage = () => {
    if(pag_actual.value > 1){
        pag_actual.value--;
    }
}
const goTo = (index) => {
    pag_actual.value = index;
}
//h-[calc(var(--item-height)*var(--row-container)+(var(--gap-item)*var(--row-container)+(2*var(--gap-item))))] grid grid-cols-3 md:grid-cols-5 py-2 place-items-center gap-2
</script>
<style scoped>
.container-ali{
    --item-height:150px;
    --row-container:5;
    --row-container-md:3;
    --gap-item:.5rem;    
    @apply grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2 place-items-center;
    .item{
        @apply h-[150px] w-[130px] shadow-md;
    }
}
.pagination{
    @apply bg-white w-[90vw] pl-4 rounded pb-2 pt-3 flex gap-2;
    .btn-pag{
        @apply border border-black rounded p-2 transition-all;
        &:hover{
            @apply bg-indigo-300 text-white;
        }
    }    
}
.active {
    @apply bg-indigo-500 text-white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>