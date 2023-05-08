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
    <v-btn variant="tonal" @click="test('C' + (selected+1))">
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
        <!-- Orchestral -->
      </v-btn>

</div>
</template>
<script>
import * as api from '../modules/api_h.ts'
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
