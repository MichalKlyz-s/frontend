<script setup>
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";

const {pedal, playMethod, chanel, chosenOutput, koppledManuals, kopplesPlayed} = defineProps({
  pedal: Array,
  playMethod: String,
  chanel: Number,
  chosenOutput: String,
  koppledManuals: Array,
  kopplesPlayed: Array
});
const emit = defineEmits(['playingNote'])
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
      disabled: x < pedal[0] || x > pedal[1]
    });
  }
  pedalKey.value = keyList.filter((key) => !key.disabled);
};

const updateChannels = (note) => {
  let channels = [chanel];
  koppledManuals.forEach((r) => {
    if(r.range[0] <= note && r.range[1] >= note){
      channels.push(r.chanel)
    }
  });
  return channels;
}

const updateNotes = (note) => {
  let notes = [note];
  koppledManuals.forEach((r) => {
    if(r.range[0] <= note && r.range[1] >= note){
      if (r.tran) {
      let noteTran = note;
        if (
          r.tran === "sup" &&
          ((note < 116 && playMethod === "MiDi") ||
            (note < 52 && playMethod === "ProgramChange"))
        ) {
          noteTran = note * 1 + 12;
        } else if (r.tran === "sub" && note > 11) {
          noteTran = note * 1 - 12;
        }
      notes.push(noteTran);
      }
    }
  });
  return notes;
}

const isKopplePlayed = (note) => {
  return kopplesPlayed.some(r => r.note === note) 
}

const pressKey = async (note) => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    pressedKey.value = note;
    let  noteData = {
      note: [note],
      noteOnOff: "pressed",
      channel: [chanel],
      playMethod: playMethod,
      chosenOutput: chosenOutput
    };
    let koppelNote ={
      note: note,
      manual: 0,
      noteOnOff: "pressed",
    };
    emit('playingNote', koppelNote);
    if(koppledManuals.length > 0){
      noteData.channel = updateChannels(note);
      noteData.note = updateNotes(note);
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
      playMethod: playMethod,
      chosenOutput: chosenOutput
    };
     let koppelNote ={
      note: note,
      manual: 0,
      noteOnOff: "released",
    }
    emit('playingNote', koppelNote);
    if(koppledManuals.length > 0){
      noteData.channel = updateChannels(note);
      noteData.note = updateNotes(note);
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
  <div class="keybordWood">
    <div class="keyboard">  
      <v-slide-group
        show-arrows
        style="color: white">
        <v-slide-item
          v-for="key in pedalKey"
          :key="key.noteNumber"
        >
          <div
            class="key"
            :class="{
              disabledKey: key.disabled
            }"
            :style="{ opacity: (key.noteNumber === pressedKey ||  isKopplePlayed(key.noteNumber) ) ? 0.1 : 1 }"
            @pointerdown="pressKey(key.noteNumber)"
            @pointerup="releaseKey(key.noteNumber)">
           <div style="align-content: start"> {{key.note }}</div>
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
 width: 40px;
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
