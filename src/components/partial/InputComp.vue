<template>
  <div class="relative">
    <div 
    :class="[showTag ? '' : 'hidden']"
    :style="{top: y + 'px', left: x + 'px'}"
    class="absolute size-5 bg-red-500 transition-all delay-400 blur-[10px]">          
        </div>
    <input
      required
      ref="input"
      :title="title"
      :disabled="disabled"
      @mousemove="putTag"
      @pointerleave="showTag = false"
      @paste="handlePaste"
      @input="updateValue"
      :value="modelValue"
      class="txt-description w-full peer"
      :class="[detectarError ? 'border-red-500' : '', disabled ? 'border-slate-600' : '']"
      placeholder=" "
    />
    <span
      @mousemove="putTag"
      class="lbl-description transition-all delay-200 pointer-events-none peer-focus:-translate-y-4 peer-focus:text-sm peer-valid:-translate-y-4 peer-valid:text-sm"
      :class="[disabled ? 'text-slate-600': 'text-slate-400']"
      >{{ placeholder }}</span
    >
    <div>
      <span 
      class="text-red-500 text-xs" v-if="error">{{ error.message }}</span>  
    </div>
  </div>
</template>
<script setup>

import { computed, ref, defineExpose } from "vue";

const input = ref(null)
const showTag = ref(false)
const x = ref(0)
const y = ref(0)
const props = defineProps({
    modelValue:String,
    placeholder:{
        type:String,
        default:'Default'
    },
    error:{
      type:Object,
      default:null
    },
    title:{
      type:String,
      default:'Rellene este campo.'
    },
    disabled:{
      type:Boolean,
      default:false
    }
})
defineExpose({
  focus:()=>{
    input.value?.focus();
  }
})
const emit = defineEmits(['update:modelValue','paste'])
const updateValue = (e) => {
    emit('update:modelValue', e.target.value)
}
const handlePaste = (e) => {
    emit('paste', e)
}
const detectarError = computed(()=>{
  //console.log(props.error)
  return props.error != null;
})
const putTagg = (e) => {
  showTag.value = true;  
  const rect = input.value.getBoundingClientRect();
  x.value = e.clientX - rect.left + 5;
  y.value = e.clientY - rect.top + 5;
  console.log(x.value,y.value)
}
</script>
<style scoped>
.txt-description{
    @apply p-1 text-lg text-gray-100 bg-inherit outline-none border-b-2 transition-all ease-linear;
}
.lbl-description{
    @apply text-lg absolute p-1 rounded left-0 top-0 transition-all ease-linear;
}
</style>
