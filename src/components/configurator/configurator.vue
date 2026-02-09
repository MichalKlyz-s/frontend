<script setup>
import { ref, computed, onMounted } from "vue";
import * as api from "../../modules/apiH.ts";
import { reactive } from "vue";

const rules = {
  required: value => !!value || 'Wypełnij',
  min: value => value < 0 || 'Zbyt mała wartość',
  maxChannel: value => value > 16 || 'Poza zakresem'

}
const inputs = ref([]);
const chosenInput = ref('');
const gottenInput = ref();
const confName = ref('');
const pipeOrganName = ref('');
const pipeOrganAddres = ref('');
const chanelForManuals = ref(1);
const manuals = ref([{id: 1, range: [36, 96], transpozytor: 'normal', chanel: 1}]);
const chanelForpedal = ref(1);
const pedal = ref([36, 67]);
const chanelsRange = [1,16];
const minManuals = 0;
const maxManuals = 127;
const maxManualsPgCh = 63;
const methods = ['MiDi','ProgramChange'];
const edit = ref(false);
const playMethod = ref('MiDi');
const playMethodButtons = ref('ProgramChange');
const voices = ref([{id: 1, name: '',  button: 0, channel: 7}]);
const chanelForAddons = ref(1);
const addons = ref([{id: 1, name: '',  button: 0}]);
const chanelForKopples = ref(1);
// potem Kopple
const kopples = ref([{id: 1, name: 'I/II', firstManual: 1, secondManual: 0}]);
const messageType = ref('changeMode');
const filesToChose = ref([]);
const chosenFile = ref('Template.txt');
const requestCancelToken = ref(null);

onMounted(() => {
  getSetting();
});
const reduceManual = () => {
  if(manuals.value.length > 1) {
    manuals.value.pop();
  }
};
const addManual = () => {
  if(manuals.value.length < 8) {
    manuals.value.push({id: manuals.value.length + 1, range: [36, 96], transpozytor: 'normal', chanel: 1});
  }
};

const reduceKoppel = () => {
  if(kopples.value.length > 0) {
    kopples.value.pop();
  }
};

const addKoppel = () => {
  if(kopples.value.length < 33) {
    kopples.value.push({id: kopples.value.length +1, name: '', firstManual: 1, secondManual: 1});
  }
};
const reduceVoice = () => {
  if(voices.value.length > 0) {
    voices.value.pop();
  }
};
const addVoice = () => {
  if(voices.value.length < 50) {
    voices.value.push({id: voices.value.length + 1, name: '',  button: 0, channel: 7});
  }
};

const reduceAddons = () => {
  if(addons.value.length > 1) {
    addons.value.pop();
  }
};
const addAddons = () => {
  if(addons.value.length < 20) {
    addons.value.push({id: addons.value.length + 1, name: '',  button: 0});
  }
};

const saveSetting = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    await api.saveSetting(configuration, requestCancelToken.value);
    edit.value = false;
  } catch (error) {
    console.log(error);
  }
};
const getSetting = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    const data = await api.getSetting(chosenFile.value, requestCancelToken.value);
    if(data.success){
      confName.value = data.conf.confName ? data.conf.confName : '';
      pipeOrganName.value = data.conf.organName ? data.conf.organName : '';
      pipeOrganAddres.value = data.conf.addres ? data.conf.addres : '';
      playMethod.value = data.conf.playMethod ? data.conf.playMethod : 'MiDi';
      playMethodButtons.value = data.conf.playMethodButtons ? data.conf.playMethodButtons : 'ProgramChange';
      chanelForManuals.value = data.conf.chanelForManuals ? data.conf.chanelForManuals : 1;
      manuals.value = data.conf.manuals ? data.conf.manuals : [{id: 1, range: [36, 96], transpozytor: 'normal', chanel: 1}];
      chanelForpedal.value = data.conf.chanelForpedal ? data.conf.chanelForpedal : 1;
      pedal.value = data.conf.pedal ? data.conf.pedal : [36, 67];
      chanelForKopples.value = data.conf.chanelForKopples ? data.conf.chanelForKopples : 1;
      kopples.value = data.conf.kopples ? data.conf.kopples: [{id: 1, name: 'I/II', firstManual: 1, secondManual: 0}];
      voices.value = data.conf.voices ? data.conf.voices : [{id: 1, name: '',  button: 0, channel: 7}];
      chanelForAddons.value = data.conf.chanelForAddons ? data.conf.chanelForAddons : 1;
      addons.value = data.conf.addons ? data.conf.addons : [{id: 1, name: '',  button: 0}];
    }
  } catch (error) {
    console.log(error);
  }
};
const getAllFiles = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    const data = await api.getAllFiles(requestCancelToken.value);
    if(data.success){
      filesToChose.value = data.files;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMidiDevices = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    const res = await api.getInputs(requestCancelToken.value);
    if (res.success === true) {
      inputs.value = res.inputs;
    } else {
      console.log("Błąd pobrania");
      throw Error(res.message);
    }
  } catch (error) {
    console.log(error);
  }
};
//TODO -> nasłuchwanie
const listenChosenInput = async () => {
  // if(requestCancelToken.value){
  //   requestCancelToken.value.cancel();
  // }
  // requestCancelToken.value = api.getNewCancelToken();
  // const stats = await api.listenChosenInPut(chosenInput, requestCancelToken.value);
  // if (stats.success === true) {
  //   gottenInput.value = stats;
  //   console.log("Powiodło się!!");
  // } else {
  //   console.log("Błąd wysłania");
  //   throw Error(stats.message);
  // }
};

const useSetting = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    await api.useSetting(chosenFile.value, requestCancelToken.value);
  } catch (error) {
    console.log(error);
  }
};

const listForKoppels = computed(() => {
  let list = [];
  for(let x = 1; x <= manuals.value.length; x++){
    list.push({id: x, name: x});
  }
  list.push({id: 0, name: 'pedał'});
  return list;
});

let configuration = computed(() => {
  const conf = {
    confName: confName.value,
    organName: pipeOrganName.value,
    addres: pipeOrganAddres.value,
    playMethod: playMethod.value,
    playMethodButtons: playMethodButtons.value,
    chanelForManuals: chanelForManuals.value,
    manuals: manuals.value,
    chanelForpedal: chanelForpedal.value,
    pedal: pedal.value,
    chanelForKopples: chanelForKopples.value,
    kopples: kopples.value,
    voices: voices.value,
    chanelForAddons: chanelForAddons.value,
    addons: addons.value};return conf;
});

const getData = async () => {
  if(requestCancelToken.value){
    requestCancelToken.value.cancel();
  }
  requestCancelToken.value = api.getNewCancelToken();
  try {
    const stats = await api.midiOutputsList(requestCancelToken.value);
    if (stats.data.success === true) {
      dataVoice.value = stats.data.chosenData;
    } else {
      console.log("Błąd pobrania");
      throw Error(stats.message);
    }
  } catch (error) {
    console.log(error);
  }
};

</script>
<template>
  <div class="bcgr">
    <v-row>
      <v-col cols="12" >
        <v-row class="topPage">
          <v-col cols="3" >
            <v-btn
            v-if="!edit"
            color="white"
            elevation="7" 
            variant="outlined" 
            x-small
            icon="mdi-arrow-u-left-top"
            title="Powrót"
            @click="$router.push('/')"
            />
            <v-btn
            v-if="edit"
            color="white"
            elevation="7" 
            variant="outlined" 
            x-small
            icon="mdi-close"
            title="Anuluj"
             @click="edit = false"
            />
          </v-col>
          <v-col cols="6">
            <h1 style="text-align: center">Ustawienia organów</h1>
          </v-col>
          <v-col cols="3">
            <v-btn
            v-if="!edit"
            color="white"
            elevation="7" 
            variant="outlined" 
            x-small
            icon="mdi-pencil"
            title="Edytuj"
            @click="edit = true"
            />
              <v-btn
              v-if="edit"
              color="white"
              elevation="7" 
              variant="outlined" 
              x-small
              icon="mdi-content-save"
              title="Zapisz"
              @click="saveSetting"
              />
          </v-col>
        </v-row>
        <v-row style="padding: 0px 40px 0px 20px; margin-top: 5px; height: 66px">
          <v-col 
          cols="5"
          sm="6"
          md="9">
            <h2 v-text="edit ? 'Edytuj:' : 'Ustawienia:'"></h2>
          </v-col>
          <v-col 
          cols="4"
          sm="3"
          md="1" 
          style="text-align: center; padding: 0px">
            <template v-if="filesToChose.length > 0 && !edit">
              <v-select
              class="noshadow"
              v-model="chosenFile"
              :items="filesToChose"
              label="Plik"
              hide-details
              bg-color="brown"
              density="compact"
              clearable
              style="text-shadow: "
              variant="outlined"
              @change="getSetting()"
              ></v-select>
            </template>
            <!-- <template v-if="edit && inputs.length > 0">
              <v-autocomplete
                v-model="chosenInput"
                :items="inputs"
                label="Midi inputs"
                bg-color="brown"
                hide-details
                clearable
                chips
                density="compact"
                variant="outlined"
                @update:model-value="listenChosenInput()"
              />
            </template> -->
          </v-col>
          <v-col 
            cols="2"
            sm="2"
            md="1"
            style="text-align: center; padding: 0px">
            <v-btn
            v-if="!edit"
            color="white"
            elevation="7" 
            variant="outlined" 
            x-small
            icon="mdi-download"
            title="Pobierz"
            @click="getAllFiles"
            />
            <!-- <v-btn
            v-if="edit"
            color="white"
            elevation="7" 
            variant="outlined" 
            x-small
            icon="mdi-ear-hearing"
            title="Nasłuchuj"
            @click="getMidiDevices"
            /> -->
          </v-col>
          <v-col cols="1" style="text-align: center; padding: 0px">
            <v-btn
            v-if="!edit"
            color="white"
            elevation="7" 
            variant="outlined" 
            x-small
            icon="mdi-check-bold"
            title="Użyj"
            @click="useSetting()"
            />
          </v-col>
        </v-row>
        <v-row class="shadowBox">
          <div style="width: 100%;">
            <v-row style="text-align: center">
              <v-col>
                <h3>Dane ogólne:</h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6"> <span>Nazwa konfiguracji:</span> </v-col>
              <v-col cols="6" v-if="!edit" class="centerSettings"><span>{{ configuration.confName }}</span></v-col>
              <v-col cols="6" v-else>
                <v-text-field
                  class="noshadow"
                  v-model="confName"
                  label="Nazwa konfiguracji"
                  variant="outlined"
                  bg-color="brown"
                  type="text"
                  placeholder="Nazwa konfiguracji"
                  density="compact"
                  rounded
                  required
                  clearable
                  clear-icon="mdi-close"
                  :rules="[rules.required]"
                >
                  <template #append-inner>
                    <v-tooltip text="Nazwa konfiguracji również będzie nazwą pliku konfiguracji">
                      <template #activator="{ props }">
                        <v-icon dark v-bind="props"> mdi-help-circle-outline </v-icon>
                      </template>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6"><span>Nazwa oragnów:</span></v-col>
              <v-col cols="6" v-if="!edit" class="centerSettings"><span>{{ configuration.organName }}</span></v-col>
              <v-col cols="6" v-else>
                <v-text-field
                  class="noshadow"
                  v-model="pipeOrganName"
                  label="Nazwa organów"
                  variant="outlined"
                  bg-color="brown"
                  type="text"
                  placeholder="Nazwa organów"
                  density="compact"
                  rounded
                  required
                  clearable
                  clear-icon="mdi-close"
                  :rules="[rules.required]"
                  ><template #append-inner>
                    <v-tooltip text="Nazwa organów, dla których tworzona jest konfiguracja">
                      <template #activator="{ props }">
                        <v-icon dark v-bind="props"> mdi-help-circle-outline </v-icon>
                      </template>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6"><span>Lokacja:</span></v-col>
              <v-col cols="6" v-if="!edit" class="centerSettings"><span>{{ configuration.addres }}</span></v-col>
              <v-col cols="6" v-else>
                <v-text-field
                  class="noshadow"
                  v-model="pipeOrganAddres"
                  label="Lokacja"
                  variant="outlined"
                  bg-color="brown"
                  type="text"
                  placeholder="Lokacja"
                  density="compact"
                  rounded
                  required
                  clearable
                  clear-icon="mdi-close"
                  :rules="[rules.required]"
                  ><template #append-inner>
                    <v-tooltip text="Adres gdzie organy się znajdują">
                      <template #activator="{ props }">
                        <v-icon dark v-bind="props"> mdi-help-circle-outline </v-icon>
                      </template>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">Metoda grania:</v-col>
              <v-col cols="6" v-if="!edit" class="centerSettings"><span>{{ configuration.playMethod }}</span></v-col>
              <v-col cols="6" v-else>
                <v-select 
                  class="noshadow"
                  v-model="playMethod"
                  :items="methods"
                  label="Metoda"
                  bg-color="brown"
                  variant="outlined"
                  density="compact"
                  rounded
                  required
                  clearable
                  clear-icon="mdi-close"
                  :rules="[rules.required]"
                  >
                  <template #append-inner>
                    <v-tooltip text="Metoda, którą będą wysyłane sygnały midi do organów">
                      <template #activator="{ props }">
                        <v-icon dark v-bind="props"> mdi-help-circle-outline </v-icon>
                      </template>
                    </v-tooltip>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">Metoda dla przycisków:</v-col>
              <v-col cols="6" v-if="!edit" class="centerSettings"><span>{{ configuration.playMethodButtons }}</span></v-col>
              <v-col cols="6" v-else>
                <v-select 
                  class="noshadow"
                  v-model="playMethodButtons"
                  :items="methods"
                  label="Metoda"
                  bg-color="brown"
                  variant="outlined"
                  density="compact"
                  rounded
                  required
                  clearable
                  clear-icon="mdi-close"
                  :rules="[rules.required]"
                  >
                  <template #append-inner>
                    <v-tooltip text="Metoda, którą będą wysyłane sygnały midi do organów">
                      <template #activator="{ props }">
                        <v-icon dark v-bind="props"> mdi-help-circle-outline </v-icon>
                      </template>
                    </v-tooltip>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col style="text-align: center"><h3>Manuały:</h3></v-col>
            </v-row>
            <v-row>
              <v-col 
                cols="6"
                sm="6"><span>Liczba manuałów:</span></v-col>
              <v-col cols="6" v-if="!edit" class="centerItems">{{ configuration.manuals.length }}</v-col>
              <v-col 
                cols="6"
                sm="6"
                md="6"
                lg="2"
                offset-lg="4" 
                v-else>
                <v-row class="centerItems">
                  <v-col cols="3" class="onlyContentForBtn">
                    <v-btn 
                      @click="reduceManual" 
                      elevation="7" 
                      variant="outlined" 
                      x-small
                      icon="mdi-minus"
                      color="white"
                      />
                  </v-col>
                  <v-col cols="5">
                    <v-text-field 
                      readonly
                      variant="outlined"
                      v-model="manuals.length" 
                      type="text"
                      density="compact"
                      hide-details
                      bg-color="brown"
                      rounded
                      required
                      class="textFieldClass"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="onlyContentForBtn">
                    <v-btn 
                      @click="addManual" 
                      elevation="7" 
                      variant="outlined" 
                      x-small 
                      icon="mdi-plus"
                      color="white"
                      />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <template v-if="!edit">
              <v-row v-for="(x, index) in configuration.manuals.length" v-bind:key="index">
                <v-col cols="6"><span>Manuał ({{configuration.manuals[index].id }}):</span></v-col>
                <v-col cols="6" class="centerSettings">
                  <v-row>
                    <v-col cols="3">
                      Kanał: {{ configuration.manuals[index].chanel }}
                    </v-col>
                    <v-col cols="5">
                      Zakres: {{configuration.manuals[index].range[0]}} - {{ configuration.manuals[index].range[1] }}
                    </v-col>
                    <v-col cols="3">
                      transpozytor: {{ configuration.manuals[index].transpozytor }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </template>
            <v-row v-else v-for="(x, indexE) in  manuals.length" v-bind:key="indexE">
              <v-col 
                cols="2"
                sm="4"
                md="6"
                ><span>Zakres manuału({{ x }}):</span></v-col>
              <v-col 
                cols="10"
                sm="8"
                md="6"
                >
                <v-row>
                  <v-col>
                    <v-range-slider
                      v-model="manuals[indexE].range"
                      :max="playMethod === 'MiDi' ? maxManuals : maxManualsPgCh"
                      :min="minManuals"
                      hide-details
                      class="align-center"
                      step="1"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          variant="outlined"
                          v-model="manuals[indexE].range[0]"
                          hide-details
                          single-line
                          bg-color="brown"
                          type="text"
                          density="compact"
                          rounded
                          required
                          style="width: 80px"
                          class="textFieldClass"
                          :max="playMethod === 'MiDi' ? maxManuals : maxManualsPgCh"
                          :min="minManuals"
                          @change="$set(manuals[indexE].range, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append> 
                        <v-text-field
                          variant="outlined"
                          v-model="manuals[indexE].range[1]"
                          hide-details
                          single-line
                          type="text"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          style="width: 80px"
                          class="textFieldClass"
                          :max="playMethod === 'MiDi' ? maxManuals : maxManualsPgCh"
                          :min="minManuals"
                          @change="$set(manuals[indexE].range, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                </v-row>
                <v-row >
                  <v-col cols="4" lg="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="4"
                        lg="8">
                        Kanał:
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="8"
                        md="8"
                        lg="4">
                        <v-text-field
                          variant="outlined"
                          v-model="manuals[indexE].chanel"
                          hide-details
                          single-line
                          type="number"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          class="textFieldClass"
                          :max="chanelsRange[1]"
                          :min="chanelsRange[0]"
                          :rules="[rules.required, rules.min, rules.maxChannel]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="8" lg="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="7">
                        transpozytor:
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="8"
                        md="5">
                         <v-btn-toggle
                          v-model="manuals[indexE].transpozytor"
                          color="brown"
                          rounded="xl"
                          divided
                          mandatory="true"
                          elevation="7" 
                        >
                          <v-btn 
                            value="sub"
                          elevation="7" 
                            size="x-small"
                          >SUB</v-btn>
                          <v-btn 
                            value="normal"
                            size="x-small"
                          elevation="7" 
                          >NOR</v-btn>
                          <v-btn
                            value="sup"
                            size="x-small"
                          elevation="7" 
                          >SUP</v-btn>
                        </v-btn-toggle>
                        <!-- variant="outlined" 
                          size="x-small"
                      color="white" -->
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col 
                cols="2"
                sm="4"
                md="6"><span>pedał:</span></v-col>
              <v-col 
                offset="4"
                offset-sm="2"
                offset-md="0"
                cols="6"
                v-if="!edit"
                class="centerSettings">
                <v-row>
                    <v-col cols="6">
                      Kanał: {{ configuration.chanelForpedal }}
                    </v-col>
                    <v-col cols="6">
                      Zakres: {{ configuration.pedal[0] }} - {{ configuration.pedal[1] }}
                    </v-col>
                </v-row>
              </v-col>
              <v-col 
                cols="10"
                sm="8"
                md="6" 
                v-else>
                <v-row>
                  <!-- $set sprawdzic po prawić -->
                  <v-col>
                    <v-range-slider
                      v-model="pedal"
                      :max="playMethod === 'MiDi' ? maxManuals : maxManualsPgCh"
                      :min="minManuals"
                      hide-details
                      class="align-center"
                      step="1"
                    >
                    <template v-slot:prepend>
                      <v-text-field
                        variant="outlined"
                        v-model="pedal[0]"
                        hide-details
                        single-line
                        type="text"
                        density="compact"
                        rounded
                        required
                        bg-color="brown"
                        style="width: 80px"
                        class="textFieldClass"
                        :max="playMethod === 'MiDi' ? maxManuals : maxManualsPgCh"
                        :min="minManuals"
                        @change="$set(pedal, 0, $event)"
                      ></v-text-field>
                    </template>
                    <template v-slot:append> 
                      <v-text-field
                        variant="outlined"
                        v-model="pedal[1]"
                        hide-details
                        single-line
                        type="text"
                        density="compact"
                        rounded
                        required
                        bg-color="brown"
                        style="width: 80px"
                        class="textFieldClass"
                        :max="playMethod === 'MiDi' ? maxManuals : maxManualsPgCh"
                        :min="minManuals"
                        @change="$set(pedal, 1, $event)"
                      ></v-text-field>
                    </template>
                    </v-range-slider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col 
                  cols="10"
                  sm="8"
                  md="6"
                  offset-md="6">
                    <v-row class="centerItems">
                      <v-col cols="8">
                        Kanał:
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          variant="outlined"
                          v-model="chanelForpedal"
                          hide-details
                          single-line
                          type="number"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          class="textFieldClass"
                          :max="chanelsRange[1]"
                          :min="chanelsRange[0]"
                          :rules="[rules.required, rules.min, rules.maxChannel]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col style="text-align: center"><h3>Kopple:</h3></v-col>
            </v-row>
            <v-row>
              <v-col 
                cols="2"
                sm="4"
                md="6"><span>Kopple:</span></v-col>
              <v-col 
                offset="5"
                offset-sm="3"
                offset-md="0"
                cols="6" 
                v-if="!edit" 
                class="centerSettings">
                <v-row>
                    <v-col cols="6">Kanał: {{ configuration.chanelForKopples }}</v-col>
                    <v-col cols="6">Liczba: {{ configuration.kopples.length }}</v-col>
                </v-row>
              </v-col>
              <v-col 
                cols="10"
                sm="8"
                md="8"
                lg="6"
                v-else >
                <v-row>
                  <v-col 
                    cols="4"
                    lg="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="4"
                        lg="8"
                      >
                        Kanał:
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="8"
                        md="8"
                        lg="4">
                        <v-text-field
                          variant="outlined"
                          v-model="chanelForKopples"
                          hide-details
                          single-line
                          type="number"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          class="textFieldClass"
                          :max="chanelsRange[1]"
                          :min="chanelsRange[0]"
                          :rules="[rules.required, rules.min, rules.maxChannel]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col 
                    cols="8"
                    lg="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="6">
                        Liczba:
                      </v-col>
                      <v-col cols="8"
                        sm="8"
                        md="6"
                        lg="6">
                        <v-row class="centerItems">
                          <v-col cols="1" class="onlyContentForBtn">
                            <v-btn 
                              @click="reduceKoppel" 
                              elevation="7" 
                              variant="outlined" 
                              x-small 
                              icon="mdi-minus"
                              color="white"
                              />
                          </v-col>
                          <v-col 
                            cols="5">
                            <v-text-field 
                              readonly
                              variant="outlined"
                              v-model="kopples.length" 
                              type="text"
                              hide-details
                              density="compact"
                              rounded
                              required
                              bg-color="brown"
                              class="textFieldClass"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1" class="onlyContentForBtn">                      
                            <v-btn 
                              @click="addKoppel" 
                              elevation="7" 
                              variant="outlined" 
                              x-small  
                              icon="mdi-plus"
                              color="white"
                              />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <template v-if="!edit">
              <v-row v-for="(x, index) in configuration.kopples.length" v-bind:key="index">
                <v-col cols="6"><span>Koppl ({{configuration.kopples[index].id }}):</span></v-col>
                <v-col cols="6" class="centerSettings">
                  <v-row>
                    <v-col cols="4">
                      Nazwa: {{configuration.kopples[index].name}}
                    </v-col>
                    <v-col cols="4">
                      Z: {{ configuration.kopples[index].firstManual }}
                    </v-col>
                    <v-col cols="4">
                      Do: {{ configuration.kopples[index].secondManual }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </template>
                      <!-- rulle dodac ze jedno musi byc mniejsze od drugiego a nie takie samo  -->
            <v-row v-else v-for="(x, index) in  kopples.length" v-bind:key="index">
              <v-col 
                cols="1"
                sm="2"
                md="6"><span>Koppel ({{ x }}):</span></v-col>
              <v-col 
                cols="11"
                sm="10"
                md="6">
                <v-row>
                  <v-col 
                  cols="12"
                  sm="8"
                  md="6">
                    <v-row class="centerItems">
                      <v-col cols="5">
                        <v-select 
                          class="noshadow"
                          v-bind:key="index"
                          :items="listForKoppels"
                          item-title="name"
                          item-value="id"
                          v-model="kopples[index].firstManual"
                          label="Z"
                          hide-details
                          variant="outlined"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          clear-icon="mdi-close" />
                      </v-col>
                      <v-col cols="1" class="onlyContentForBtn" style="text-shadow: 0 0 6px black;">
                        <v-icon color="black">
                          mdi-arrow-right-bold
                        </v-icon>
                      </v-col>
                      <v-col cols="5">
                        <v-select 
                          class="noshadow"
                          :items="listForKoppels"
                          item-title="name"
                          item-value="id"
                          v-model="kopples[index].secondManual"
                          label="Do"
                          hide-details
                          variant="outlined"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          clear-icon="mdi-close" />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col 
                    cols="12"
                    sm="4"
                    md="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="3"
                        md="5">
                        Nazwa: 
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="7"
                        md="6">
                        <v-text-field
                          variant="outlined"
                          v-model="kopples[index].name"
                          label="Nazwa"
                          placeholder="Nazwa"
                          hide-details
                          single-line
                          type="text"
                          density="compact"
                          rounded
                          bg-color="brown"
                          required
                          class="textFieldClass"
                          clear-icon="mdi-close"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col style="text-align: center"><h3>Registry:</h3></v-col>
            </v-row>
            <v-row>
              <v-col 
                cols="6"
                sm="6" >Registry:</v-col>
              <v-col 
                offset="5"
                offset-sm="3"
                offset-md="0"
                cols="6" 
                v-if="!edit" 
                class="centerSettings">
                  <span>  Liczba: {{ configuration.voices.length }} </span>
              </v-col>
              <v-col 
                 cols="6"
                sm="6"
                md="6"
                lg="2"
                offset-lg="4" 
                v-else>
                <v-row class="centerItems">
                  <v-col cols="3" class="onlyContentForBtn">
                    <v-btn 
                      @click="reduceVoice" 
                      elevation="7" 
                      variant="outlined" 
                      x-small 
                      icon="mdi-minus"
                      color="white"
                      />
                  </v-col>
                  <v-col 
                    cols="5">
                    <v-text-field 
                      readonly
                      variant="outlined"
                      v-model="voices.length" 
                      type="text"
                      density="compact"
                      hide-details
                      rounded
                      required
                      bg-color="brown"
                      class="textFieldClass"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="onlyContentForBtn">
                    <v-btn 
                      @click="addVoice" 
                      elevation="7" 
                      variant="outlined" 
                      x-small 
                      icon="mdi-plus"
                      color="white"
                      />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <template v-if="!edit">
              <v-row v-for="(x, index) in configuration.voices.length" v-bind:key="index">
                <v-col cols="6"><span>Głos ({{configuration.voices[index].id }}):</span></v-col>
                <v-col cols="6" class="centerSettings">
                  <v-row>
                    <v-col cols="6">Nazwa: {{configuration.voices[index].name}}</v-col>
                    <v-col cols="6">Wartość: {{ configuration.voices[index].button }}</v-col>
                    <v-col cols="6">Kanał: {{ configuration.voices[index].channel }}</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </template>
            <v-row v-else v-for="(x, index) in  voices.length" v-bind:key="index">
              <v-col 
                cols="2"
                sm="4"
                md="6"><span>Register ({{ x }}):</span></v-col>
              <v-col 
                cols="10"
                sm="8"
                md="6">
                <v-row>
                  <v-col cols="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="8">
                        Klawisz:
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="8"
                        md="4">
                        <v-text-field
                          variant="outlined"
                          v-model="voices[index].button"
                          label="Klawisz"
                          placeholder="Klawisz"
                          hide-details
                          single-line
                          type="number"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          class="textFieldClass"
                          :max="playMethodButtons === 'MiDi' ? maxManuals : maxManualsPgCh"
                          :min="minManuals"
                          :rules="[rules.required, rules.min]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="8">
                        Nazwa: 
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="8"
                        md="4">
                        <v-text-field
                          variant="outlined"
                          class="noshadow"
                          v-model="voices[index].name"
                          label="Nazwa"
                          placeholder="Nazwa"
                          hide-details
                          single-line
                          type="text"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          clear-icon="mdi-close"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col 
                  cols="10"
                  sm="8"
                  md="6"
                  offset-md="6">
                    <v-row class="centerItems">
                      <v-col cols="8">
                        Kanał:
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          variant="outlined"
                          v-model="voices[index].channel"
                          hide-details
                          single-line
                          type="number"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          class="textFieldClass"
                          :max="chanelsRange[1]"
                          :min="chanelsRange[0]"
                          :rules="[rules.required, rules.min, rules.maxChannel]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col style="text-align: center"><h3>Akcesoria:</h3></v-col>
            </v-row>
            <v-row>
              <v-col 
                cols="2"
                sm="4"
                md="6">Akcesoria:</v-col>
              <v-col 
                offset="5"
                offset-sm="3"
                offset-md="0"
                cols="6" 
                v-if="!edit" 
                class="centerSettings">
                <v-row>
                  <v-col cols="6">
                    Kanał: {{ configuration.chanelForAddons }}
                  </v-col>
                  <v-col cols="6">
                    Liczba: {{ configuration.addons.length }} 
                  </v-col>
                </v-row>
              </v-col>
              <v-col 
                cols="10"
                sm="8"
                md="8"
                lg="6"
                v-else>
                <v-row>
                  <v-col 
                    cols="4"
                    lg="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="4"
                        lg="8">
                        Kanał:
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="8"
                        md="8"
                        lg="4">
                        <v-text-field
                          variant="outlined"
                          v-model="chanelForAddons"
                          hide-details
                          single-line
                          type="number"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          class="textFieldClass"
                          :max="chanelsRange[1]"
                          :min="chanelsRange[0]"
                          :rules="[rules.required, rules.min, rules.maxChannel]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col 
                    cols="8"
                    lg="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="6">
                        Liczba:
                      </v-col>
                      <v-col cols="8"
                        sm="8"
                        md="6"
                        lg="6">
                        <v-row class="centerItems">
                          <v-col cols="1" class="onlyContentForBtn">
                            <v-btn 
                              @click="reduceAddons" 
                              elevation="7" 
                              variant="outlined" 
                              x-small 
                              icon="mdi-minus"
                              color="white"
                              />
                          </v-col>
                          <v-col 
                            cols="5">
                            <v-text-field 
                              readonly
                              variant="outlined"
                              v-model="addons.length" 
                              type="text"
                              density="compact"
                              hide-details
                              rounded
                              required
                              bg-color="brown"
                              class="textFieldClass"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1" class="onlyContentForBtn">
                            <v-btn 
                              @click="addAddons" 
                              elevation="7" 
                              variant="outlined" 
                              x-small 
                              icon="mdi-plus"
                              color="white"
                              />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <template v-if="!edit">
              <v-row v-for="(x, index) in configuration.addons.length" v-bind:key="index">
                <v-col cols="6"><span>Akcesorium ({{configuration.addons[index].id }}):</span></v-col>
                <v-col cols="6" class="centerSettings">
                  <v-row>
                    <v-col cols="6">Nazwa: {{configuration.addons[index].name}}</v-col>
                    <v-col cols="6">Wartość: {{ configuration.addons[index].button }}</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </template>
            <v-row v-else v-for="(x, index) in  addons.length" v-bind:key="index">
              <v-col 
                cols="2"
                sm="4"
                md="6"><span>Akcesorium ({{ x }}):</span></v-col>
              <v-col 
                cols="10"
                sm="8"
                md="6">
                <v-row>
                  <v-col cols="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="8">
                        Klawisz:
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="8"
                        md="4">
                        <v-text-field
                          variant="outlined"
                          v-model="addons[index].button"
                          label="Klawisz"
                          placeholder="Klawisz"
                          hide-details
                          single-line
                          type="number"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          class="noshadow"
                          :max="playMethodButtons === 'MiDi' ? maxManuals : maxManualsPgCh"
                          :min="minManuals"
                          :rules="[rules.required, rules.min]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row class="centerItems">
                      <v-col 
                        cols="4"
                        sm="4"
                        md="8">
                        Nazwa: 
                      </v-col>
                      <v-col 
                        cols="8"
                        sm="8"
                        md="4">
                        <v-text-field
                          variant="outlined"
                          v-model="addons[index].name"
                          label="Nazwa"
                          placeholder="Nazwa"
                          hide-details
                          single-line
                          type="text"
                          density="compact"
                          rounded
                          required
                          bg-color="brown"
                          class="noshadow"
                          clear-icon="mdi-close"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.bcgr {
  background-image: url(/images/backgroundWood.png);
  background-size: cover;
  background-position: center;
  color: aliceblue;
  // -webkit-text-stroke: 1px black;
   text-shadow:
                0 0 5px #000,
                0 0 10px #000,
                0 0 20px #000,
                0 0 40px #000,
                0 0 80px #000;
  //  text-shadow:
  //               0 0 5px #0ff,
  //               0 0 10px #0ff,
  //               0 0 20px #0ff,
  //               0 0 40px #0ff,
  //               0 0 80px #0ff;
}
.topPage {
  margin: 10px 10px 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.noshadow {
  text-shadow: none;
}

.centerSettings {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.textFieldClass {
  // background-color: white;
}

.textFieldClass::v-deep(.v-input__slot input) {
  text-align: center;
}

.shadowBox {
  background-image: linear-gradient(to bottom, #8d643f 20%, #bd916b);
  padding: 2vw;
  color: black;
  font-size: 1.823vw;
  margin: 0.781vw;
  border-radius: 0.5vw;
  box-shadow: 0vw 0.5vw 3vw 0vw rgba(0, 0, 0, 0.85);
  border: 1px solid black;
}

.centerItems {
  display: flex;
  align-items: center;
  justify-content: center;
}

.onlyContentForBtn {
  display: contents;
  color: aliceblue;

}

</style>
