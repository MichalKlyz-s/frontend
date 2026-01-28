<script setup>
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";

const {pedals, playMethod, chanel, disabled} = defineProps({
  pedals: Array,
  playMethod: String,
  chanel: Number,
  disabled: Boolean
});
const pedalKey = ref([]);
const keyboardSlider = ref();
const pressedKey = ref('');
const requestCancelToken = ref(null);

onMounted(() => {
  getKeys();
});

const noteName = (key) => {
  const keyNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(key / 12);
  return keyNames[key % 12] + octave;
};

const getKeys = () => {
  let keyList = [];
  for(let x = 0; x <= 127; x++){
    keyList.push({
      noteNumber: x,
      note: noteName(x),
      disabled: x < pedals[0] || x > pedals[1]
    });
  }
  pedalKey.value = keyList.filter((key) => !key.disabled);
};

const pressKey = async (note) => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    pressedKey.value = note;
    let  noteData = {
      note: note,
      noteOnOff: "pressed",
      channel: chanel,
      playMethod: playMethod
    };
    const stats = await api.midiPlay(noteData, requestCancelToken.value);
    if (stats.data.success === false) {
      throw new Error(stats.message);
    }
  }catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const releaseKey = async (note) =>{
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    pressedKey.value = '';
    let  noteData = {
      note: note,
      noteOnOff: "released",
      channel: chanel,
      playMethod: playMethod
    };
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
      <v-slide-group
        show-arrows>
        <v-slide-item
          v-for="key in pedalKey"
          :key="key.noteNumber"
        >
          <div
            class="key"
            :class="{
              disabledKey: key.disabled
            }"
            :style="{ opacity: key.noteNumber === pressedKey ? 0.1 : 1 }"
            @pointerdown="pressKey(key.noteNumber)"
            @pointerup="releaseKey(key.noteNumber)">
            {{key.note }}
          </div>
        </v-slide-item>
      </v-slide-group>
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
}
.keyboard::v-deep(.v-slide-group__content){
  padding: 10px 15px;
  white-space: normal;
}
.key {
 width: 20px;
 height: 180px; 
 margin: 0px 1px;
 background: #311a09;
 border: 2px solid black;
 align-content: end;
 word-break: break-all;
 color: white;
}
.key.disabledKey {
  opacity: 0.7;
  pointer-events: none;
}
</style>
