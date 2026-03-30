<script setup>
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";

const {keyboard, playMethod, chanel, chosenOutput,  koppledManuals, kopplesPlayed} = defineProps({
  keyboard: Object,
  playMethod: String,
  chanel: Number,
  chosenOutput: String,
  koppledManuals: Array,
  kopplesPlayed: Array,
});
const emit = defineEmits(['playingNote'])
const keys = ref([]);
const keyboardSlider = ref();
const pressedKey = ref('');
const requestCancelToken = ref(null);

onMounted(() => {
  getKeys();
});

const noteName = (key) => {
  const keyNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  // const keyNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'];

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

const updateChannels = (note) => {
  let channels = [chanel];
  koppledManuals.forEach((r) => {
    if(r.range[0] <= note && r.range[1] >= note){
      channels.push(r.chanel)
    }
  });
  return channels;
}

const updateNote = (note) => {
   if (keyboard.transpozytor) {
    let noteTran = note;
    if (
      keyboard.transpozytor === "sup" &&
      ((note < 116 && playMethod === "MiDi") ||
        (note < 52 && playMethod === "ProgramChange"))
    ) {
      noteTran = note * 1 + 12;
    } else if (keyboard.transpozytor === "sub" && note > 11) {
      noteTran = note * 1 - 12;
    }
    return [noteTran];
  }
  else return [note];
}
const updateNotes = (note) => {
  let notes = updateNote(note);
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
  return kopplesPlayed.some(r => r.note === note);
}

const pressKey = async (note) => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    pressedKey.value = note;
    let noteData = {
      note: updateNote(note),
      noteOnOff: "pressed",
      channel: [chanel],
      playMethod: playMethod,
      chosenOutput: chosenOutput
    };
    let koppelNote ={
      note: note,
      manual: keyboard.id,
      noteOnOff: "pressed",
    };
    emit('playingNote', koppelNote);
     if(koppledManuals.length > 0){
      noteData.channel = updateChannels(note);
      noteData.note = updateNotes(note);
    };
    const stats = await api.midiPlay(noteData, requestCancelToken.value);
    if (!stats) {
      throw new Error(stats);
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
 
  requestCancelToken.value = api.getNewCancelToken();
  try {
    pressedKey.value = '';
    let noteData = {
      note: updateNote(note),
      noteOnOff: "released",
      channel: [chanel],
      playMethod: playMethod,
      chosenOutput: chosenOutput
    };
    let koppelNote ={
      note: note,
      manual: keyboard.id,
      noteOnOff: "released",
    };
    emit('playingNote', koppelNote);
    if(koppledManuals.length > 0){
      noteData.channel = updateChannels(note);
      noteData.note = updateNotes(note);
    };
    const stats = await api.midiPlay(noteData, requestCancelToken.value);
    if (!stats) {
      throw new Error(stats);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
defineExpose({updateChannels, updateNotes, updateNote, koppledManuals, chanel, keyboard, playMethod, keys });
</script>
<template>
  <div class="keybordWood" >
    <div class="keyboard">
      <v-slide-group
        show-arrows
        style="color: white">
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
            :style="{ opacity: (key.noteNumber === pressedKey || isKopplePlayed(key.noteNumber) ) ? 0.1 : 1 }"
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
 width: 50px;
 height: 180px; 
 background: white;
 border: 1px solid black;
 color: black;
 align-content: end;
 word-break: break-all;
 position: relative;

}
.key.blackKey {
  word-break: break-all;
   align-content: end;

  width: 32px;
  height: 110px;
  background: black;
  margin-left: -16px;
  margin-right: -17px;
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
