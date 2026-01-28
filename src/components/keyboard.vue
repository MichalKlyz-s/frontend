<script setup>
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";
//TODO
// Sprawdzić czy potrzebne jest wysyałnie kopla bo wydaje się ze nei potrzeba chyba ze kople dziłają na jakieś wybrane klawiatury
// to wtedy dodać jakieś wysyłąnie bądź obsługę na backend

const {keyboard, playMethod, chanel, kople} = defineProps({
  keyboard: Object,
  playMethod: String,
  chanel: Number,
  disabled: Boolean
});
const keys = ref([]);
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

const keyColor = (key) => {
  const keyColor = key % 12;
  return [1,3,6,8,10].includes(keyColor);
};
const getKeys = () => {
  let keyList = [];
  for(let x = 0; x <= 127; x++){
    keyList.push({
      noteNumber: x,
      note: noteName(x),
      color: keyColor(x),
      disabled: x < keyboard.range[0] || x > keyboard.range[1]
    });
  }
  keys.value = keyList.filter((key) => !key.disabled);
};
//TODO
// Przekanaznie zmiennych wpromptach dla innych komponentów, dodanie zmiennych by wysłyały sie nabackend i sprwdzenie przyciskaniajak działa ale chyba dpbrze, wiec no podpięcie pozostałych i tam może program change też na tamte registry itp
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
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const releaseKey = async (note) =>{
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  ////TODO
  //// To w zalezności czy kole blokując czy nie ale chyba nei potrzbene ogólnie
  // //if (kople[0] === keyboard) {
  ////   //noteData = { note, noteOnOff: "released", channel: kople };
  // //} else {
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
//TODO
// Maybe ID of a keybord or so bc idk if all are on seperete chanles

</script>
<template>
  <div class="keybordWood" >
    <div class="keyboard">
      <v-slide-group
        show-arrows>
        <v-slide-item
          v-for="key in keys"
          :key="key.noteNumber"
        >
          <div
            class="key"
            :class="{
              blackKey: key.color,
              whiteKey: !key.color,
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
.key.whiteKey {
 width: 28px;
 height: 180px; 
 background: white;
 border: 1px solid black;
 align-content: end;
 word-break: break-all;
 position: relative;

}
.key.blackKey {
  word-break: break-all;
  width: 16px;
  height: 110px;
  background: black;
  margin-left: -8px;
  margin-right: -9px;
  z-index: 2;
  color: white;
   position: relative;

}
.key.disabledKey {
  opacity: 0.7;
  pointer-events: none;
   position: relative;

}

</style>
