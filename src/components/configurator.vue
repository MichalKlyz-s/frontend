<script setup>
// Dodanie formularza do organów
// Dodanie formatowania danych do pliku jaki chcemy
// Dodanie zapisu do folderu w aplikacji
import { ref } from "vue";
import * as api from "../modules/apiH.ts";
import { reactive } from "vue";
defineOptions({
  name: "configurator",
});
// PROPS
ref({});
reactive({});
// ZMIENNE
let dataVoice = null;
let selectedChanel = 0;
// registerArgs: [
//   ['note']= 'C',
//   ['chanel'] = 0
// ]
// METODY
// const nazwa = async () => {}
const test = async (note) => {
  // this.registerArgs.note = note
  // this.registerArgs.chanel = this.selectedChanel
  const cos = [note, this.selectedChanel];
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
    this.dataVoice = stats.data.chosenData;
  } else {
    console.log("Błąd pobrania");
    throw Error(stats.message);
  }
};
const testChosenOutPut = async () => {
  const stats = await api.midiChosenOutputTest(this.chosenOutput);
  if (stats.data.success === true) {
    console.log("Powiodło się");
  } else {
    console.log("Błąd wysłania");
    throw Error(stats.message);
  }
};
// COMPUTED
// const nazwa = computed(() => {})
</script>
<template>
  <div>
    <v-toolbar style="background-color: red">
      <v-router> <v-btn>Powrot</v-btn> </v-router>
      Strona konfiguracji Ilość modulów ilosc kepli ilosc glosow pedaly
      <h1>Konfiguracja organów</h1>
    </v-toolbar>
    <v-row>
      <v-col cols="6">
        <div>
          <span><h2>Konfigurator</h2></span>
          General data:
          <v-row>
            <v-col cols="6"> Name:</v-col>
            <v-col cols="6"><v-text-field label="tests"></v-text-field></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Location:</v-col>
            <v-col cols="6"><v-text-field></v-text-field></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Number Of Voices:</v-col>
            <v-col cols="6"><v-text-field></v-text-field></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Change Of Voice:</v-col>
            <v-col cols="6"><v-text-field></v-text-field></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Number Of Manuals:</v-col>
            <v-col cols="6"><v-text-field></v-text-field></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Kople:</v-col>
            <v-col cols="6"><v-text-field></v-text-field></v-col>
          </v-row>
          Keyboard:
          <v-row>
            <v-col cols="6">Manuals:</v-col>
            <v-col cols="6"></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Pedals:</v-col>
            <v-col cols="6"></v-col>
          </v-row>
          Organ dispositon:
          <v-row>
            <v-col cols="6">Name:</v-col>
            <v-col cols="6"></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Voices For Manuals:</v-col>
            <v-col cols="6"></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Numbers To Show:</v-col>
            <v-col cols="6"></v-col>
          </v-row>
          <v-row>
            <v-col cols="6">Numbers For Switch:</v-col>
            <v-col cols="6"></v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6">
        General data:
        <v-row>
          <v-col cols="6"> Name:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Location:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Number Of Voices:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Change Of Voice:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Number Of Manuals:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Kople:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        Keyboard:
        <v-row>
          <v-col cols="6">Manuals:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Pedals:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        Organ dispositon:
        <v-row>
          <v-col cols="6">Name:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Voices For Manuals:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Numbers To Show:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Numbers For Switch:</v-col>
          <v-col cols="6"></v-col>
        </v-row>
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

    <v-slide-group show-arrows v-model="selectedChanel">
      <v-slide-item
        v-for="n in 16"
        :key="n"
        v-slot:default="{ active, toggle }"
      >
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
