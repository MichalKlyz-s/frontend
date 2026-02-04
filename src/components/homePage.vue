<script setup>
import keybord from "../components/keyboard.vue";
import kopples from "../components/kopples.vue";
import register from "../components/register.vue";
import addons from '../components/addons.vue';
import pedal from '../components/pedal.vue';
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";
const configuration = ref({});
const outputs = ref([]);
const chosenOutput = ref('');
const kopplesList = ref([]);
const requestCancelToken = ref(null);
const kopplesOnList = ref([]);
const playingNotes = ref([]);
onMounted(() => {
  getConfig();
  getOutPuts();
});

const getOutPuts = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    const res = await api.midiOutputsList(requestCancelToken.value);
    if (res.success === true) {
      outputs.value = res.outputs;
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const setChosenOutPut = async () => {
  console.log('co jest')
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  console.log(chosenOutput.value);
  try {
    const stats = await api.setChosenOutPut(chosenOutput.value, requestCancelToken.value);
    if (stats.success === false) {
      throw new Error(stats.message);
    }
  } catch (error) {
    console.log(error);
  }
};
const getConfig = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    const data = await api.configuration(requestCancelToken.value);
    if (data.success === true) {
      configuration.value = data.configuration;
    } else {
      throw new Error(conf.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const playingNote = (note) => {
  if(note.noteOnOff === "pressed"){
    playingNotes.value.push(note)
  }
  if(note.noteOnOff === "released"){
    playingNotes.value = playingNotes.value.filter(n => n.note !== note.note && n.manual !== note.manual)
  }
};

let revManuals = computed(()=> 
[... configuration.value.manuals].reverse());

let kopplesOn = computed(() => {
  let test = configuration.value.kopples.filter((r) =>{
    return kopplesOnList.value.includes(r.id);
  });
  return test;
}
);
// Dodać jakie nuty są zwracane i numer keyboardu
let isThereKoppleForYOu = ((manualNumber) => {
  let list = kopplesOn.value.filter((r) => {
    return r.secondManual === manualNumber
  }).map(r => r.firstManual)
  let listForYou = [];
  if(list.includes(0)){
    listForYou.push({chanel: Number(chanelForpedal.value), tran: 'normal'});
  }
  configuration.value.manuals.map((r) => {
    if(list.includes(r.id)){
      listForYou.push({chanel: Number(r.chanel), tran: r.transpozytor});
    };});
  return listForYou;
// Sprawdza czy ma jakies kople jak tak to jakie i tworzy listę z manualów o id z kopplii prekazuje 
});

let isSomeonePlayingYou = ((manualNumber) => {
    let list = kopplesOn.value.filter((r) => {
    return r.firstManual === manualNumber
    }).map(r => r.secondManual);
    let listOn = playingNotes.value.filter((r) => {
      return list.includes(r.manual);
    });
    return listOn;
});
// pozostalosc
// const changekopple = (koppel) =>  {
//   if (kopple.includes(koppel[1])) {
//     kopple = kopple.filter((n) => n !== koppel[1]);
//   } else {
//     kopple = [...new Set([...kopple, ...koppel])];
//   }
// };
</script>
<template>
  <div style="background-color: red;" class="bcgr">
    <v-row class="text-center">
      <v-col cols="12">
        <v-row class="topPage">
          <v-col cols="3" >
            <v-btn
            color="white"
            elevation="7" 
            variant="outlined" 
            icon="mdi-cog"
            size="x-small"
            title="Ustawienia"
            @click="$router.push('/config')"
            />
          </v-col>
          <v-col cols="6">
            <h1 style="text-align: center; color: white">Organy {{ configuration.organName }}</h1>
          </v-col>
          <v-col cols="3"></v-col>
          </v-row>
          <v-row style="padding: 0px 40px 0px 30px; margin-top: 5px">          
          <v-col style="padding: 0px">
          <v-autocomplete
            v-model="chosenOutput"
            clearable
            chips
            bg-color="white"
            density="compact"
            variant="outlined"
            label="Midi outputs"
            :items="outputs"
            @update:model-value="setChosenOutPut()"
          />
          </v-col>
          </v-row>
          <template v-if="configuration.manuals">
        <v-row class="keyboards" :key="keyboard.id" v-for="keyboard in revManuals" >
         <v-col>
         <keybord 
         :keyboard="keyboard"
         :playMethod="configuration.playMethod"
         :chanel="Number(configuration.chanelForManuals)"
         :chosenOutput="chosenOutput"
         :koppledManuals="isThereKoppleForYOu(keyboard.id) ? isThereKoppleForYOu(keyboard.id) : []"
         :kopplesPlayed="isSomeonePlayingYou(keyboard.id) ? isSomeonePlayingYou(keyboard.id) : []"
         @playingNote="playingNote"
         >
         <!-- Tu zmienić tą 2 na wybrane koble czy cos takiego -->
         </keybord>
        </v-col>
        </v-row>
      </template>
        <v-row class="keyboards" v-if="configuration.pedal">
          <v-col>
            <pedal
            :pedal="configuration.pedal"
            :playMethod="configuration.playMethod"
            :chanel="Number(configuration.chanelForpedal)"
            :chosenOutput="chosenOutput"
            :koppledManuals="isThereKoppleForYOu(0) ? isThereKoppleForYOu(0) : []"
            :kopplesPlayed="isSomeonePlayingYou(0) ? isSomeonePlayingYou(0) : []"
            @playingNote="playingNote"
            >
            </pedal>
          </v-col>
        </v-row>
        <v-row class="keyboards" v-if="configuration.kopples">
          <v-col>
            <kopples 
              :kopple="configuration.kopples"
              :playMethod="configuration.playMethodButtons"
              :chanel="Number(configuration.chanelForkopples)"
              :chosenOutput="chosenOutput"
              v-model:kopplesOnList = "kopplesOnList"
              ></kopples>
          </v-col>
        </v-row>
        <v-row class="keyboards" v-if="configuration.voices">
          <v-col>
            <register 
              :voices="configuration.voices"
              :playMethod="configuration.playMethodButtons"
              :chosenOutput="chosenOutput"></register>
          </v-col>
        </v-row>
        <v-row class="keyboards" v-if="configuration.addons">
          <v-col>
            <addons
              :addons="configuration.addons"
              :playMethod="configuration.playMethodButtons"
              :chanel="Number(configuration.chanelForAddons)"
              :chosenOutput="chosenOutput"></addons>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss" scoped>
.bcgr {
  background-image: url(/images/backgroundWood.png);
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
}
.topPage {
  margin: 10px 10px 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.keyboards{
  display:block;
}
</style>
