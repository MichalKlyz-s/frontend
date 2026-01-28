<script setup>
import keybord from "../components/keyboard.vue";
import koples from "../components/koples.vue";
import register from "../components/register.vue";
import addons from '../components/addons.vue';
import pedals from '../components/pedals.vue';
import * as api from "../modules/apiH.ts";
import { ref, computed, onMounted } from "vue";
import { reactive } from "vue";
const configuration = ref({});
const outputs = ref([]);
const chosenOutput = ref('');
const koplesList = ref([]);
const requestCancelToken = ref(null);

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
      throw Error(res.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const setChosenOutPut = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    const stats = await api.setChosenOutPut(chosenOutput, requestCancelToken.value);
    if (stats.success === false) {
      throw Error(stats.message);
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
      throw Error(conf.message);
    }
  } catch (error) {
    console.log(error);
  }
};
// pozostalosc
// const changeKople = (kopel) =>  {
//   if (kople.includes(kopel[1])) {
//     kople = kople.filter((n) => n !== kopel[1]);
//   } else {
//     kople = [...new Set([...kople, ...kopel])];
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
            fab 
            x-small
            raised
            title="Ustawienia"
            @click="$router.push('/config')"
            ><v-icon>
              mdi-cog
              </v-icon>
              </v-btn>
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
            background-color="white"
            dense
            outlined
            label="Midi outputs"
            :items="outputs"
            @change="setChosenOutPut()"
          />
          </v-col>
          </v-row>
          <template v-if="configuration.manuals">
<!-- Dodac do keybordu że jest disbaled czy coś takiego jeżeli się tam z koplami pokrywa logika na później -->
        <v-row class="keyboards" :key="keyboard.id" v-for="keyboard in configuration.manuals" >
         <v-col>
         <keybord 
         :keyboard="keyboard"
         :playMethod="configuration.playMethod"
         :chanel="Number(configuration.chanelForManuals)"
         :disabled="keyboard.id == 2 ? true : false "
         >
         <!-- Tu zmienić tą 2 na wybrane koble czy cos takiego -->
         </keybord>
        </v-col>
        </v-row>
      </template>
        <v-row class="keyboards" v-if="configuration.pedals">
          <v-col>
            <pedals
            :pedals="configuration.pedals"
            :playMethod="configuration.playMethod"
            :chanel="Number(configuration.chanelForPedals)"
            :disabled="1 == 2 ? true : false "
            >
            </pedals>
          </v-col>
        </v-row>
        <v-row class="keyboards" v-if="configuration.koples">
          <v-col>
            <koples 
              :kople="configuration.koples"
              :playMethod="configuration.playMethodButtons"
              :chanel="Number(configuration.chanelForKoples)"
              ></koples>
          </v-col>
        </v-row>
        <v-row class="keyboards" v-if="configuration.voices">
          <v-col>
            <register 
              :voices="configuration.voices"
              :playMethod="configuration.playMethodButtons"
              :chanel="Number(configuration.chanelForVoices)"></register>
          </v-col>
        </v-row>
        <v-row class="keyboards" v-if="configuration.addons">
          <v-col>
            <addons
              :addons="configuration.addons"
              :playMethod="configuration.playMethodButtons"
              :chanel="Number(configuration.chanelForAddons)"></addons>
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
