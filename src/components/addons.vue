<script setup>
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";

const { addons, playMethod, chanel, chosenOutput } = defineProps({
  addons: Array,
  playMethod: String,
  chanel: Number,
  chosenOutput: String
});

const selectedAddons = ref([]);
const requestCancelToken = ref(null);

const doInclude = (number) => {
  if (selectedAddons.value.includes(number)) {
    return "koppleOn";
  } else {
    return "koppleOff";
  }
};

const pressKey= async (note) => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    let  noteData = {
      note: [note],
      noteOnOff: "",
      channel: [chanel],
      playMethod: playMethod,
      chosenOutput: chosenOutput
    };
    if (selectedAddons.value.includes(note)) {
      selectedAddons.value = selectedAddons.value.filter((n) => n !== note);
      noteData.noteOnOff = "addons";
    } else {
      selectedAddons.value = [...selectedAddons.value, note];
      noteData.noteOnOff = "addons";
    }
    const stats = await api.midiPlay(noteData, requestCancelToken.value);
    if (stats.data.success === false) {
      throw new Error(stats.message);
    }
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
      v-for="addon in addons"
      :key="addon.id"
      class="note"
      :class="doInclude(addon.id)"
      @click="pressKey(addon.id)">
      {{ addon.name }}
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
