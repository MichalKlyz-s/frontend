<template>
<div>
  <v-btn variant="tonal" @click="testOutPuts()">
     outputs
    </v-btn>
    <v-autocomplete
      clearable
      chips
      v-model="chosenOutput"
      label="Midi outputs"
      :items="outputs"
    ></v-autocomplete>
{{ chosenOutput }}
<v-btn variant="tonal" @click="testChosenOutPut()">
     Use output
    </v-btn>
    <v-slide-group show-arrows v-model="selected">
    <v-slide-item
          v-for="n in octawList.length"
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

<v-row>
<br/>
</v-row>
    <!-- <v-btn variant="tonal" @click="test('C' + (selected+1))">
      C{{selected+1}}
    </v-btn>
        <v-btn variant="tonal" @click="test('C#' + (selected+1))">
      C#{{selected+1}}
    </v-btn>
    <v-btn variant="tonal" @click="test('D' + (selected+1))">
      D{{selected+1}}
    </v-btn>
        <v-btn variant="tonal" @click="test('D#' + (selected+1))">
      D#{{selected+1}}
    </v-btn>
      <v-btn variant="tonal" @click="test('E' + (selected+1))">
        E{{selected+1}}
      </v-btn>
      <v-btn variant="tonal" @click="test('F' + (selected+1))">
        F{{selected+1}}
      </v-btn>
            <v-btn variant="tonal" @click="test('F#' + (selected+1))">
        F#{{selected+1}}
      </v-btn>
      <v-btn variant="tonal" @click="test('G' + (selected+1))">
        G{{selected+1}}
      </v-btn>
            <v-btn variant="tonal" @click="test('G#' + (selected+1))">
        G#{{selected+1}}
      </v-btn>
      <v-btn variant="tonal" @click="test('A' + (selected+1))">
        A{{selected+1}}
      </v-btn>
            <v-btn variant="tonal" @click="test('A#' + (selected+1))">
        A#{{selected+1}}
      </v-btn>
      <v-btn variant="tonal" @click="test('B' + (selected+1))">
        B{{selected+1}}
      </v-btn> -->
      <!-- <div id="kbd">
        <div id="keys">
         <v-col cols="1" id="keys">
          <div class="node white"></div>
         </v-col>
        <v-col cols="1" id="keys">
          <div class="node black"></div>
         </v-col>
        <v-col cols="1" id="keys">
          <div class="node white"></div>
         </v-col>
         <v-col cols="2">
           <div class="prawyPrzycisk"></div>
        </v-col>
        <v-col cols="2">
           <div class="lewyPrzycisk"></div>
        </v-col>
        <v-col cols="2">
           <div class="prawyPrzycisk"></div>
        </v-col>
        </div>
      </div>
       <div class="Czarnyprzycisk"></div>
       <div class="prawyPrzycisk"></div>
       <div class="srodkowyPrzycisk"></div>
</div> -->
<div id="kbd">

<div id="keys">

    <div id="c" class="note white" @click="test('C' + (selected+1))">C
    </div>
    <div id="c#" class="note black" @click="test('C#' + (selected+1))">C#
    </div>
    <div id="d" class="note white" @click="test('D' + (selected+1))">D
    </div>
    <div id="d#" class="note black" @click="test('D#' + (selected+1))">D#
    </div>
    <div id="e" class="note white" @click="test('E' + (selected+1))">E
    </div>
    <div id="f" class="note white" @click="test('F' + (selected+1))">F
    </div>
    <div id="f#" class="note black" @click="test('F#' + (selected+1))">F#
    </div>
    <div id="g" class="note white" @click="test('G' + (selected+1))">G
    </div>
    <div id="g#" class="note black" @click="test('G#' + (selected+1))">G#
    </div>
    <div id="a" class="note white" @click="test('A' + (selected+1))">A
    </div>
    <div id="a#" class="note black" @click="test('A#' + (selected+1))">A#
    </div>
    <div id="b" class="note white" @click="test('B' + (selected+1))">B
    </div>
</div>
</div>
</div>
</template>
<script>
import * as api from '../modules/apiH.ts'
export default {
  name: 'keybord',
  data: () => ({
    octawList: [1, 2, 3, 4, 5, 6],
    selected: 0,
    outputs: null,
    chosenOutput: null
  }),
  methods: {
    async test (note) {
      const test = note
      const stats = await api.midiTest(test)
      if (stats.data.succes) {
        console.log('tak')
      } else {
        console.log('nie')
        throw Error(stats.message)
      }
    },
    async testOutPuts () {
      const stats = await api.midiOutputsTest()
      if (stats.data.success === true) {
        console.log('Pobrało nowe outputy')
        this.outputs = stats.data.outputs
      } else {
        console.log('Błąd pobrania')
        throw Error(stats.message)
      }
    },
    async testChosenOutPut () {
      const stats = await api.midiChosenOutputTest(this.chosenOutput)
      if (stats.data.success === true) {
        console.log('Powiodło się')
      } else {
        console.log('Błąd wysłania')
        throw Error(stats.message)
      }
    }
  }
}
</script>
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
  content: '';
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
  content: '';
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
  flex: 1;
  display: inline-flex;
  align-items: center;
}

.black {

  justify-content: center;
  position: relative;
  height: 70%;
  background-color: #474747;
  color: white;
  width: 8%;
  margin: 0 -4%
}

.white {
  flex-flow: column;
  justify-content: flex-end;
  outline: 2px solid #474747;
  color: #474747;
  background-color: #ffffff;
  padding-bottom: 1%;
}
</style>
