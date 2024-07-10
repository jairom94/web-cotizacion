<template>
    <div class="container-shein-box">
        <div 
        v-for="product in productStore.products_shein_novedades"
        :key="product.name"
        class="item">
            <div 
                class="product">
                <header class="image">
                    <img class="size-full object-cover object-center" :src="product.img" :alt="product.name" />
                </header>
                <section class="detail">
                    <h3 class="title">
                        <a
                        rel="noopener" target="_blank"
                        class="text-black font-semibold transition-all hover:underline"  
                        :title="product.name"
                       :href="product.url">
                       {{product.name}}
                        </a>
                    </h3>
                    <h4 class="price">
                    <span>$ {{ product.price }}</span>                    
                    <span class="ml-1 border border-black rounded-full">
                        <a rel="noopener" target="_blank" class="size-full rounded-[inherit] px-2 py-1" :href="product.url">Ver</a>
                    </span>
                    </h4>
                </section>
            </div>
        </div>        
    </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import useProductsStore from '../store/useProductsStore';
const productStore = useProductsStore();
onMounted(async()=>{
    await productStore.fetchProducts('SHEIN_NOVEDADES');
})
</script>
<style scoped>
.container-shein-box{
    @apply w-[90vw] md:w-[90vw] bg-white rounded grid grid-cols-3 gap-2 place-items-center py-2;
    .item{
        @apply h-[150px] md:h-[180px] w-[calc((90vw-20px)/3)] md:w-[170px] shadow-md;
        .product{
            @apply h-full w-full;
            .image{
                @apply h-[60%] md:h-[70%] w-full;
            }
            .detail{
                @apply h-[40%] md:h-[30%] w-full text-xs flex flex-col justify-between;
                .title{
                    @apply text-xs whitespace-normal;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    line-clamp: 1;
                }
                .price{
                    @apply flex justify-between items-center p-2;
                }
            }
        }
    }
}
</style>