<template>
  <div class="rating"
  ref="contentStars"
  >
    <span v-for="star in ratingTotal" :key="star" class="star"></span>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
const props = defineProps({
  rating: {
  type:Number,
  required: true,
  default: 5
  }
})
const contentStars = ref();
const ratingTotal = 5;
const raitingProducto = computed(()=>{
  return props.rating;
});
const updateRaiting = () => {
    const starFilled = Math.trunc(raitingProducto.value);
    //console.log(raitingProducto.value)
    const partialStar = raitingProducto.value - starFilled;    
    const stars = contentStars.value.querySelectorAll(".rating .star")
    stars.forEach((star,i)=>{
        const index = (i+1);
        if(index <= starFilled){
            star.classList.add("filled");
        }
        if(partialStar > 0 && index === (starFilled+1)){
            star.classList.add("partial");
            const halfStarPercentage = (partialStar * 100);
            //console.log(halfStarPercentage)
            star.style.setProperty('--half-star-width', `${halfStarPercentage}%`);
        }
    
    })
}
onMounted(()=>{
    updateRaiting();
})
</script>
<style scoped>
.star {
  display: inline-block;
  font-size: 1rem; /* Ajusta el tamaño según tus necesidades */
  color: white; /* Color de la estrella vacía */
  position: relative;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
}

.star::before {
  content: "\2605"; /* Icono de estrella llena */
}
.star.filled::before {
  color: #ffd700; /* Color de la estrella llena */
}
.star.partial::after {
  width: var(
    --half-star-width,
    0%
  ); /* Ajusta el porcentaje según la parte decimal */
}
.star::after {
  content: "\2605";
  color: #ffd700;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 0%; /* Inicialmente, la estrella está vacía */
}
</style>
