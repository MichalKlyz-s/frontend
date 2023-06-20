<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="hello">
          <h3>Testowy Frontend</h3>
          {{ configuration }}
          <v-btn variant="tonal" @click="outPuts()">
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
<v-btn variant="tonal" @click="chosenOutPut()">
     Use output
    </v-btn>
          <template v-for="keyboard in numberOfKeyboards">
       <keybord
       :key="keyboard"
       v-bind:keyboard="keyboard"
       v-bind:octawList="octawList"
       ></keybord>
      </template>
      <keybord
      v-bind:keyboard= 5
       v-bind:octawList="pedalList"
       ></keybord>
       <register/>
    </div>
      </v-col>
      </v-row>
  </v-container>
</template>

<script>
import keybord from '../components/keyboard.vue'
import register from '../components/register.vue'
import * as api from '../modules/apiH.ts'

export default {
  name: 'homePage',
  components: {
    keybord,
    register
  },
  defaultNumberOfKeyboard: 3,
  data: () => ({
    // defaultNumberOfKeyboard: 3,
    // NumberOfKeyboards: this.defaultNumberOfKeyboard != null ? this.defaultNumberOfKeyboard : 3,
    numberOfKeyboards: 3,
    outputs: null,
    chosenOutput: null,
    octawList: [1, 2, 3, 4, 5, 6],
    pedalList: [1, 2, 3, 4],
    configuration: null
  }),
  methods: {
    async outPuts () {
      const stats = await api.midiOutputsTest()
      if (stats.data.success === true) {
        console.log('Pobrało nowe outputy')
        this.outputs = stats.data.outputs
      } else {
        console.log('Błąd pobrania')
        throw Error(stats.message)
      }
    },
    async chosenOutPut () {
      const stats = await api.midiChosenOutputTest(this.chosenOutput)
      if (stats.data.success === true) {
        console.log('Powiodło się')
      } else {
        console.log('Błąd wysłania')
        throw Error(stats.message)
      }
    },
    async getConfig () {
      const conf = await api.configuration()
      if (conf.data.success === true) {
        console.log('Powiodło się')
        this.configuration = conf.data
      } else {
        console.log('Błąd wysłania')
        throw Error(conf.message)
      }
    }
  },
  mounted () {
    this.getConfig()
  }
}
</script>
