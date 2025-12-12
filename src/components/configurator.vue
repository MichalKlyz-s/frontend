<script setup>
// Dodanie formularza do organów
// Dodanie formatowania danych do pliku jaki chcemy
// Dodanie zapisu do folderu w aplikacji
import { ref, computed } from "vue";
import * as api from "../modules/apiH.ts";
import { reactive } from "vue";
// PROPS
// ref({})
// reactive({})
// ZMIENNE
const dataVoice = ref({});
const confName = ref('');
const pipeOrganName = ref('');
const pipeOrganAddres = ref('');
const chanelForManuals = ref(1);
const manuals = ref([{id: 1, range: [0, 100], stopaz: 1}]);
const chanelForPedals = ref(1);
const pedals = ref([0, 100]);
const chanelsRange = [1,16];
const minManuals = 0;
const maxManuals = 100;
const methods = ['MiDi','changemode','etc'];
const edit = ref(true);
//  przełączniki to musze sprawdzić jak dokładzie, więc dodać moze wprowadzanie nazwy + wartość 
const playMethod = ref('MiDi');
const chanelForVoices = ref(1);
const voices = ref([{id: 1, name: '',  value: 0}]);
const chanelForKoples = ref(1);
const koples = ref([{id: 1, name: 'I/II', firstManual: 1, secondManual: 0}]);
const messageType = ref('changeMode');
// switches = ref([{},{},{}]);

// To do testu pewnie tego jak pobrac z klawiatuyry to trzeba sprawdzic
const selectedChanel = 0;
// registerArgs: [
//   ['note']= 'C',
//   ['chanel'] = 0
// ]
// METODY
// const nazwa = async () => {}

// Zapytć o makysmalną ilośc manualów  i ogólnbie o max liczby czy dawać
const reduceManual = () => {
  if(manuals.value.length > 1) {
    manuals.value.pop();
  }
};
const addManual = () => {
  console.log(manuals.value.length);
  if(manuals.value.length < 11) {
    manuals.value.push({id: manuals.value.length + 1, range: [0, 15], stopaz: 1});
  }
};

const reduceKopel = () => {
  if(koples.value.length > 1) {
    koples.value.pop();
  }
};

const addKopel = () => {
  if(koples.value.length < 11) {
    koples.value.push({id: koples.value.length +1, name: '', firstManual: 1, secondManual: 1});
  }
};
const reduceVoice = () => {
  if(voices.value.length > 1) {
    voices.value.pop();
  }
};
const addVoice = () => {
  if(voices.value.length < 11) {
    voices.value.push({id: voices.value.length + 1, name: '',  value: 0});
  }
};
const test = async (note) => {
  // registerArgs.note = note
  // registerArgs.chanel = selectedChanel
  const cos = [note, selectedChanel];
  const stats = await api.midiRegister(cos);
  if (stats.data.succes) {
    console.log("tak");
  } else {
    console.log("nie");
    throw Error(stats.message);
  }
};
const getData = async () => {
  const stats = await api.midiOutputsTest();
  if (stats.data.success === true) {
    console.log("Pobrało nowe outputy");
    console.log(stats.data.chosenData);
    dataVoice.value = stats.data.chosenData;
  } else {
    console.log("Błąd pobrania");
    throw Error(stats.message);
  }
};
const testChosenOutPut = async () => {
  const stats = await api.midiChosenOutputTest(chosenOutput);
  if (stats.data.success === true) {
    console.log("Powiodło się");
  } else {
    console.log("Błąd wysłania");
    throw Error(stats.message);
  }
};
// COMPUTED
// const nazwa = computed(() => {})
const listForKopels = computed(() => {
  let list = [];
  for(let x = 1; x <= manuals.value.length; x++){
    list.push({id: x, name: x});
  }
  list.push({id: 0, name: 'Pedały'});
  return list;
});

const configuration = computed(() => {
  const conf = {
    confName: confName,
    organName: pipeOrganName,
    addres: pipeOrganAddres,
    playMethod: playMethod,
    chanelForManuals: chanelForManuals,
    manuals: manuals,
    chanelForPedals: chanelForPedals,
    pedals: pedals,
    chanelForKoples: chanelForKoples,
    koples: koples,
    chanelForVoices: chanelForVoices,
    voices: voices};return conf;
});

</script>
<template>
  <div>
    <v-toolbar style="background-color: red">
      <!-- <v-router>
        <v-btn @click="goBack"> Powrot </v-btn>
      </v-router> -->
      <h1>Konfiguracja organów</h1>
      <v-btn
      v-if="!edit"
      @click="edit = true"
      >Edytuj
      </v-btn>
      <v-btn
      v-if="!edit"
      @click="edit = true"
      >Użyj
      </v-btn>
      <v-btn
      v-if="edit"
      @click="edit = false"
      >Zapisz
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>
        <span><h2 v-text="edit ? 'Edytuj ustawienia:' : 'Ustawienia:'"></h2></span>
      <template v-if="edit">    
        <div class="shadowBox">
          <span>Dane ogólne</span>
          <v-row>
            <v-col cols="6"> <span>Nazwa konfiguracji:</span> </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="confName"
                label="Nazwa konfiguracji"
                outlined
                background-color="white"
                type="text"
                placeholder="Nazwa konfiguracji"
                dense
                required
                clearable
                clear-icon="mdi-close"
              >
                <template #append>
                  <v-tooltip top>
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Nazwa konfiguracji również będzie nazwą pliku konfiguracji</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
           <v-row>
            <v-col cols="6"><span>Nazwa oragnów:</span></v-col>
            <v-col cols="6">
              <v-text-field
                outlined
                v-model="pipeOrganName"
                label="Nazwa organów"
                background-color="white"
                type="text"
                placeholder="Nazwa organów"
                dense
                required
                clearable
                clear-icon="mdi-close"
                ><template #append>
                  <v-tooltip top>
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Nazwa organów, dla których tworzona jest konfiguracja</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><span>Lokacja:</span></v-col>
            <v-col cols="6">
              <v-text-field
                outlined
                v-model="pipeOrganAddres"
                label="Lokacja"
                background-color="white"
                type="text"
                placeholder="Lokacja"
                dense
                required
                clearable
                clear-icon="mdi-close"
                ><template #append>
                  <v-tooltip top>
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Adres gdzie organy się znajdują</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Funkcja do grania: </v-col>
            <v-col cols="6">
              <v-select 
              :items="methods"
              v-model="playMethod"
              label="Nazwa"
              outlined />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><span>Liczba manuałów:</span></v-col>
            <v-btn 
            @click="reduceManual" 
            elevation="3" 
            icon 
            outlined 
            raised
            ><v-icon dark>
          mdi-minus
        </v-icon></v-btn>
            <v-text-field 
            readonly
            outlined 
            v-model="manuals.length" 
            type="text"
            dense
            style="width: 12px;"
            ></v-text-field>
            <v-btn 
            @click="addManual" 
            elevation="3" 
            icon 
            outlined 
            raised
            ><v-icon dark>
          mdi-plus
        </v-icon></v-btn>
           </v-row>
           <v-row>
            <v-col cols="6"><span>Kanał dla manuałów:</span></v-col>
            <v-col cols="6">
              <v-text-field
                  v-model="chanelForManuals"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 40px"
                  :max="chanelsRange[1]"
                  :min="chanelsRange[0]"
                ></v-text-field>
            </v-col>
           </v-row>
           <!-- Poprawić by były w jednej lini ustawienia  dodac min i max do texfieldow-->
           <v-row v-for="(x, index) in  manuals.length" v-bind:key="index">
            <v-col cols="6"><span>Zakres modułu({{ x }}):</span></v-col>
            <v-col cols="6">
              <div>
            <v-range-slider
              v-model="manuals[index].range"
              :max="maxManuals"
              :min="minManuals"
              hide-details
              class="align-center"
              style="width: 70%;"
            >
              <template v-slot:prepend>
                <v-text-field
                  v-model="manuals[index].range[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 40px"
                  :max="maxManuals"
                  :min="minManuals"
                  @change="$set(manuals[index].range, 0, $event)"
                ></v-text-field>
              </template>
              <template v-slot:append> 
                <v-text-field
                  v-model="manuals[index].range[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 40px"
                  :max="maxManuals"
                  :min="minManuals"
                  @change="$set(manuals[index].range, 1, $event)"
                ></v-text-field>
              </template>
            </v-range-slider>
            <span>Stopaz</span>
            <v-text-field
                  v-model="manuals[index].stopaz"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                ></v-text-field>
              </div>
          </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><span>Kanał dla pedałów:</span></v-col>
            <v-col cols="6">
              <v-text-field
                  v-model="chanelForPedals"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 40px"
                  :max="chanelsRange[1]"
                  :min="chanelsRange[0]"
                ></v-text-field>
            </v-col>
           </v-row>
          <v-row>
            <v-col cols="6"><span>Pedały:</span></v-col>
            <v-col cols="6">
              <v-range-slider
              v-model="pedals"
              :max="maxManuals"
              :min="minManuals"
              hide-details
              class="align-center"
            >
              <template v-slot:prepend>
                <v-text-field
                  v-model="pedals[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  :max="maxManuals"
                  :min="minManuals"
                  @change="$set(pedals, 0, $event)"
                ></v-text-field>
              </template>
              <template v-slot:append> 
                <v-text-field
                v-model="pedals[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  :max="maxManuals"
                  :min="minManuals"
                  @change="$set(pedals, 1, $event)"
                ></v-text-field>
              </template>
            </v-range-slider>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="6">Kanał dla Kopli:</v-col>
            <v-col cols="6">
              <v-col cols="6">
              <v-text-field
                  v-model="chanelForKoples"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 40px"
                  :max="chanelsRange[1]"
                  :min="chanelsRange[0]"
                ></v-text-field>
            </v-col>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><span>Liczba Kopli:</span></v-col>
            <v-btn 
            @click="reduceKopel" 
            elevation="3" 
            icon 
            outlined 
            raised
            ><v-icon dark>
          mdi-minus
        </v-icon></v-btn>
            <v-text-field 
            readonly
            outlined 
            v-model="koples.length" 
            type="text"
            dense
            style="width: 12px;"
            ></v-text-field>
            <v-btn 
            @click="addKopel" 
            elevation="3" 
            icon 
            outlined 
            raised
            ><v-icon dark>
          mdi-plus
        </v-icon></v-btn>
           </v-row>
           <v-row v-for="(x, index) in  koples.length" v-bind:key="index">
            <v-col cols="6"><span>Kopel ({{ x }}):</span></v-col>
          <!-- rulle dodac ze jedno musi byc mniejsze od drugiego a nie takie samo  -->
            <v-col cols="6">
              <v-select 
              v-bind:key="index"
              :items="listForKopels"
              item-text="name"
              item-value="id"
              v-model="koples[index].firstManual"
              label="Pierwszy"
              outlined />
             <span> -> </span>
            <v-select 
            :items="listForKopels"
              item-text="name"
              item-value="id"
              v-model="koples[index].secondManual"
              label="Drugi"
              outlined />
              Nazwa: 
              <v-text-field
              v-model="koples[index].name"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  style="width: 60px"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Kanał dla registrów:</v-col>
            <v-col cols="6">
              <v-col cols="6">
              <v-text-field
                  v-model="chanelForVoices"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 40px"
                  :max="chanelsRange[1]"
                  :min="chanelsRange[0]"
                ></v-text-field>
            </v-col>
            </v-col>
          </v-row>
       <v-row>
            <v-col cols="6"><span>Liczba registrów:</span></v-col>
            <v-btn 
            @click="reduceVoice" 
            elevation="3" 
            icon 
            outlined 
            raised
            ><v-icon dark>
          mdi-minus
        </v-icon></v-btn>
            <v-text-field 
            readonly
            outlined 
            v-model="voices.length" 
            type="text"
            dense
            style="width: 12px;"
            ></v-text-field>
            <v-btn 
            @click="addVoice" 
            elevation="3" 
            icon 
            outlined 
            raised
            ><v-icon dark>
          mdi-plus
        </v-icon></v-btn>
           </v-row>
           <v-row v-for="(x, index) in  voices.length" v-bind:key="index">
            <v-col cols="6"><span>Registr ({{ x }}):</span></v-col>
            <v-col cols="6">
              Nazwa: 
              <v-text-field
              v-model="voices[index].name"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  style="width: 60px"
              ></v-text-field>
              Klawisz:
              <v-text-field
                  v-model="voices[index].value"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 40px"
                ></v-text-field>
            </v-col>
          </v-row>
         <!-- 
          <v-row>
            <v-col cols="6"> Numbers To Show: </v-col>
            <v-col cols="6">
              <v-text-field label="Nazwa" outlined />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Numbers For Switch: </v-col>
            <v-col cols="6">
              <v-text-field label="Nazwa" outlined />
            </v-col>
          </v-row> -->
        </div></template>
      <template v-else>
        <div class="shadowBox">
          <span>General data:</span>
          <v-row>
            <v-col cols="6"><span>Nazwa konfiguracji:</span></v-col>
            <v-col cols="6"><span>{{ confName }}</span></v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><span>Nazwa organów:</span></v-col>
            <v-col cols="6"><span>{{ pipeOrganName }}</span></v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><span>Lokalizacja:</span></v-col>
            <v-col cols="6"><span>{{ pipeOrganAddres }}</span></v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><span>Metoda grania:</span></v-col>
            <v-col cols="6"><span>{{ playMethod }}</span></v-col>
          </v-row>
          <v-row>
            <v-col cols="6"><span>Liczba manuałów:</span> </v-col>
            <v-col cols="6">{{ manuals.length }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Kople: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
          Keyboard:
          <v-row>
            <v-col cols="6"> Manuals: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Pedals: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Number Of Voices: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Change Of Voice: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
          Organ dispositon:
          <v-row>
            <v-col cols="6"> Name: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Voices For Manuals: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Numbers To Show: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
          <v-row>
            <v-col cols="6"> Numbers For Switch: </v-col>
            <v-col cols="6">Nazwa</v-col>
          </v-row>
        </div>
      </template>
    </v-col>
    </v-row>
    <!-- <template v-if="dataVoice">
        <template v-for="(c, index) in  dataVoice.length" >
          <div v-bind:key="index">
      <v-row v-if="dataVoice[index].generaldata">
        General data: <br/>
        Name: {{ dataVoice[index].generaldata.Name }}
        Location: {{ dataVoice[index].generaldata.Location }}
        Number Of Voices: {{ dataVoice[index].generaldata.NumberOfVoices }}
        Change Of Voice: {{ dataVoice[index].generaldata.ChangeOfVoice }}
        Number Of Manuals: {{ dataVoice[index].generaldata.NumberOfManuals }}
        Kople: {{ dataVoice[index].generaldata.Kople }}
      </v-row>
      <v-row v-if="dataVoice[index].Keyboard">
        Keyboard: <br/>
        Manuals: {{ dataVoice[index].Keyboard.Manuals.Start }} - {{ dataVoice[index].Keyboard.Manuals.End }}
        Pedals: {{ dataVoice[index].Keyboard.Pedals.Start }} - {{ dataVoice[index].Keyboard.Pedals.End }}
      </v-row>
      <v-row v-if="dataVoice[index].OrgansDisposition">
        Organ dispositon: <br/>
        Name: {{ dataVoice[index].OrgansDisposition.Name }}
        Voices For Manuals: {{ dataVoice[index].OrgansDisposition.VoicesForManuals }}
        Numbers To Show: {{ dataVoice[index].OrgansDisposition.NumbersToShow }}
        Numbers For Switch: {{ dataVoice[index].OrgansDisposition.NumbersForSwitch }}
      </v-row>
    </div>
    </template>
    </template>-->

    <v-slide-group v-model="selectedChanel" show-arrows>
      <v-slide-item v-for="n in 16" :key="n" v-slot="{ active, toggle }">
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
          rounded
          @click="toggle"
        >
          {{ n }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
    {{ selectedChanel }}
    <v-btn variant="tonal" @click="getData()"> Pobież dane </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.shadowBox {
  background-color: white;
  padding: 0.677vw;
  color: #333333;
  font-size: 1.823vw;
  margin: 0.781vw;
  border-radius: 0.156vw;
  box-shadow: 0vw 0.26vw 0.781vw 0vw rgba(0, 0, 0, 0.35);
}
// .shadowBox {
//   background-color: white;
//   padding: v-bind(calculatePxWDensity("0.677"));
//   color: #333333;
//   font-size: v-bind(calculatePxWDensity("1.823"));
//   margin: v-bind(calculatePxWDensity("0.781"));
//   border-radius: v-bind(calculatePxWDensity("0.156"));
//   box-shadow: 0px v-bind(calculatePxWDensity("0.26")) v-bind(calculatePxWDensity("0.781")) 0px
//     rgba(0, 0, 0, 0.35);
// }
.lewyPrzycisk {
  height: 85px;
  width: 46px;
  background: white;
  border-right: 2px solid black;
  border-top: 2px solid black;
  border-left: 2px solid black;
}

.lewyPrzycisk::after {
  content: "";
  background-color: white;
  position: absolute;
  height: 150px;
  width: 90px;
  margin-left: -23px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  margin-top: 85px;
}

.prawyPrzycisk {
  // margin-left: 20px;
  height: 85px;
  width: 46px;
  background: white;
  border-right: 2px solid black;
  border-top: 2px solid black;
  border-left: 2px solid black;
}
// .prawyPrzycisk::before {
//   content: '';
//   position: absolute;
//   height: 65px;
//   border-top: 10px solid transparent;
//   border-bottom: 10px solid transparent;
//   border-right: 10px solid #e8e8e8;
//   margin-left: -10px;
// }
.prawyPrzycisk::before {
  content: "";
  background-color: white;
  position: absolute;
  height: 150px;
  width: 90px;
  margin-left: -69px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  margin-top: 85px;
}

#kbd {
  height: 100px;
  padding: 1%;
  flex-flow: column;
  display: flex;
  flex: 4;
}

#keys {
  height: 100%;
  display: flex;
  flex: 8;
  justify-content: center;
}

.note {
  width: 10px;
  height: 40px;
  flex: 1;
  display: inline-flex;
  align-items: center;
}

.white {
  width: 10px;
  flex-flow: column;
  justify-content: flex-end;
  outline: 2px solid #474747;
  color: #474747;
  background-color: #ffffff;
  padding-bottom: 1%;
}
</style>
