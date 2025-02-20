<template>
    <div>
        <v-router>        <v-btn>Powrot</v-btn>
        </v-router>
            Strona konfiguracji
            Ilość modulów
            ilosc kepli
            ilosc glosow
            pedaly


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
          <v-btn variant="tonal" @click="getData()">
         Pobież dane
        </v-btn>


    </div>
    </template>
    <script>
    // Dodanie formularza do organów
    // Dodanie formatowania danych do pliku jaki chcemy
    // Dodanie zapisu do folderu w aplikacji

    import * as api from '../modules/apiH.ts'
    export default {
      name: 'register',
      data: () => ({
        dataVoice: null,
        selectedChanel: 0
        // registerArgs: [
        //   ['note']= 'C',
        //   ['chanel'] = 0
        // ]
      }),
      methods: {
        async test (note) {
          // this.registerArgs.note = note
          // this.registerArgs.chanel = this.selectedChanel
          const cos = [note, this.selectedChanel]
          const stats = await api.midiRegister(cos)
          if (stats.data.succes) {
            console.log('tak')
          } else {
            console.log('nie')
            throw Error(stats.message)
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
