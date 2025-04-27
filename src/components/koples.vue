<template>
<div>
      <!-- {{ selectedChanel }} -->
      <v-btn variant="tonal" @click="getData()">
     Pobież dane
    </v-btn>
    <div v-if="dataVoice" style="margin: 10px;">

</div>
<div id="kbd">

  <!-- {{ kople }} -->
<div id="keys">

    <div id="c"  :class="kople.includes(2) ? 'kopleOn' :  'note white'" @click="test([1, 2] )">1/2
    </div>
    <div id="d" :class="kople.includes(6) ? 'kopleOn' :  'note white'" @click="test([1, 6] )">1/3
    </div>
</div>
  </div>

</div>
</template>
<script>
import * as api from '../modules/apiH.ts'
export default {
  name: 'koples',
  props: ['kople', 'changeKople'],
  data: () => ({
    dataVoice: null,
    selectedChanel: 0
  }),
  methods: {
    async test (note) {
      this.$emit('changeKople', note)
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
