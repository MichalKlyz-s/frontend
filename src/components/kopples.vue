<script setup>
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";

const { kopple,  playMethod, chanel, chosenOutput, kopplesOnList } = defineProps({
  kopple: Array,
  playMethod: String,
  chanel: Number,
  chosenOutput: String,
  kopplesOnList: Array
});

const emit = defineEmits(['update:kopplesOnList']);

const selectedkopples = ref([]);
const requestCancelToken = ref(null);

const doInclude = (number) => {
  if (selectedkopples.value.includes(number)) {
    return "koppleOn";
  } else {
    return "koppleOff";
  }
};

const pressKey= async (note) => {
  try {
    let  noteData = {
      note: [note],
      noteOnOff: "",
      channel: [chanel],
      playMethod: playMethod,
      chosenOutput: chosenOutput
    };
    if (selectedkopples.value.includes(note)) {
      selectedkopples.value = selectedkopples.value.filter((n) => n !== note);
      noteData.noteOnOff = "released";
    } else {
      selectedkopples.value = [...selectedkopples.value, note];
      noteData.noteOnOff = "pressed";
    }
       emit('update:kopplesOnList', [... selectedkopples.value]);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

</script>
<template>
  <div class="keybordWood" >
    <div class="keyboard">
      <div
      v-for="kop in kopple"
      :key="kop.id"
      class="note"
      :class="doInclude(kop.id)"
      @click="pressKey(kop.id)">
      {{ kop.name }}
      </div>
    </div> 
  </div>
</template>
<style lang="scss" scoped>
.keybordWood {
  border: 1px solid black;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  background-image: linear-gradient(to bottom, #623412 20%, #8d643f);
}
.keyboard {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap 
}
.note {
  border: 1px solid black;
  border-radius: 15px;
  outline: 2px solid #474747;
  color: black;
  background-color: lightcyan;
  margin: 5px;
  padding: 10px;
}
.koppleOn {
  opacity: 0.5;
}
.koppleOff {
  opacity: 1;
}
</style>
