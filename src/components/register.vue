<template>
<div>
    <div v-if="dataVoice" style="margin: 10px;">
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
</div>
<div id="kbd">
<!-- {{ selectedVoices }}ccc -->
<div id="keys">

    <div id="c" class="note white" :class="doInclude(0)" @click="test(0)">Flute
    </div>
    <div id="d" class="note white" :class="doInclude(2)" @click="test(2 )">Salicional
    </div>
    <div id="e" class="note white" :class="doInclude(4)" @click="test(4)">Nazard
    </div>
    <div id="f" class="note white" :class="doInclude(6)" @click="test(6)">Doublette
    </div>
    <div id="g" class="note white" :class="doInclude(8)" @click="test(8)">Larigot
    </div>
    <div id="a" class="note white" :class="doInclude(10)" @click="test(10)">Prinzipal
    </div>
    <div id="b" class="note white" :class="doInclude(12)" @click="test(12)">Oktave
    </div>
</div>
  </div>

</div>
</template>
<script>
import * as api from '../modules/apiH.ts'
export default {
  name: 'register',
  data: () => ({
    dataVoice: null,
    selectedChanel: 3,
    selectedVoices: [],
    methodForVoices: 'playNote23'
    // registerArgs: [
    //   ['note']= 'C',
    //   ['chanel'] = 0
    // ]
  }),
  methods: {
    async test (note) {
      if (this.selectedVoices.includes(note)) {
        this.selectedVoices = this.selectedVoices.filter(n => n !== note)
        const cos = { voice: note + 1, chanel: this.selectedChanel, methodForVoices: this.methodForVoices }
        const stats = await api.midiRegister(cos)
        console.log(stats)
      if (stats.data.success) {
        console.log('tak')
      } else {
        console.log('nie')
        throw Error(stats.message)
      }
      } else {
      this.selectedVoices = [...this.selectedVoices, note]
      const cos = { voice: note, chanel: this.selectedChanel, methodForVoices: this.methodForVoices }
      const stats = await api.midiRegister(cos)
      console.log(stats)
      if (stats.data.success) {
        console.log('tak')
      } else {
        console.log('nie')
        throw Error(stats.message)
      }
      }
    },
    async getData () {
      const stats = await api.midiOutputsTest()
      if (stats.data.success === true) {
        console.log('Pobrało nowe outputy')
        console.log(stats.data.chosenData)
        this.dataVoice = stats.data.chosenData
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
    },
    doInclude (number) {
      if (this.selectedVoices.includes(number)) {
        return 'kopleOn'
      } else {
        return 'note white'
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

.kopleOn{
  opacity: 0.5;
  cursor:'not-allowed';
  width: 10px;
  height: 40px;
  flex: 1;
  display: inline-flex;
  align-items: center;
  flex-flow: column;
  justify-content: flex-end;
  outline: 2px solid #474747;
  color: #474747;
  background-color: #ffffff;
  padding-bottom: 1%;
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
