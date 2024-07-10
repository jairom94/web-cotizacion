<template>
  <div class="inline-block h-[300px] w-[160px] cursor-pointer">
    <header class="h-[60%] bg-teal-500 w-full">
        <img class="size-full object-cover object-center" :src="image" :alt="name">
    </header>
    <div>
      <h3 class="title">
        <a :href="url" rel="noopener" target="_blank">
          {{ name }}
        </a>
      </h3>
      <div>
          <rating-comp :rating="rating"></rating-comp>
      </div>
      <span class="price">{{ price }}</span>
    </div>
  </div>
</template>
<script setup>
import RatingComp from "./RatingComp.vue";
const props = defineProps([
    'image',
    'name',
    'url',
    'rating',
    'price'
])
</script>
<style scoped>
.title {
  @apply text-sm whitespace-normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;

  a {
    @apply text-blue-700 font-semibold transition-all hover:underline;        
  }
  
}
.price {
  @apply text-base text-red-800;
}

</style>
