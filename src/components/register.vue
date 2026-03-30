<script setup>
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";

const { voices, playMethod, chosenOutput } = defineProps({
  voices: Array,
  playMethod: String,
  chosenOutput: String
});

const selectedVoices = ref([]);
const requestCancelToken = ref(null);

const doInclude = (number) => {
  if (selectedVoices.value.includes(number)) {
    return "koppleOn";
  } else {
    return "koppleOff";
  }
};

const pressKey= async (note, channel) => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    let  noteData = {
      note: [note],
      noteOnOff: "",
      channel: [channel],
      playMethod: playMethod,
      chosenOutput: chosenOutput
    };
    if (selectedVoices.value.includes(note)) {
      selectedVoices.value = selectedVoices.value.filter((n) => n !== note);
      noteData.noteOnOff = "released";
    } else {
      selectedVoices.value = [...selectedVoices.value, note];
      noteData.noteOnOff = "pressed";
    }
    const stats = await api.midiPlay(noteData, requestCancelToken.value);
    if (!stats) {
      throw new Error(stats);
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
      v-for="voice in voices"
      :key="voice.id"
      class="note"
      :class="doInclude(voice.button, voice.channel)"
      @click="pressKey(voice.button, voice.channel)">
      {{ voice.name }}
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
