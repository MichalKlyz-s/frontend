<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="hello">
          <h3>Testowy Frontend</h3>
          <v-select
          v-model= octawList >
          </v-select>
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
            Options {{ n }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      {{ selected }}
      <v-btn>
  btn
</v-btn>
    <v-btn variant="tonal" @click="test('C1')">
      C
      <!-- Główne -->
    </v-btn>
    <v-btn variant="tonal" @click="test('C1')">
      D
      <!-- Główne -->
    </v-btn>
      <v-btn variant="tonal" @click="test('C4')">
        E
        <!-- Pozytywy -->
      </v-btn>
      <v-btn variant="tonal" @click="test('B6')">
        F
        <!-- Echo -->
      </v-btn>
      <v-btn variant="tonal" @click="test('D2')">
        G
        <!-- Brustwerk -->
      </v-btn>
      <v-btn variant="tonal" @click="test('A3')">
        A3
        <!-- Solo -->
      </v-btn>
      <v-btn variant="tonal" @click="test('G6')">
        B
        <!-- Orchestral -->
      </v-btn>
      <!-- <v-btn variant="tonal" @click="test('A5')">
        A5
         Bombarde 
      </v-btn>
      <v-btn variant="tonal" @click="test('D2')">
        D2
         Pedał
      </v-btn>  -->
    </div>
      </v-col>
      </v-row>
  </v-container>
</template>

<script>
import * as api from '../modules/api_h.ts'
export default {
  name: 'homePage',

  data: () => ({
    octawList: [1, 2, 3, 4, 5, 6],
    selected: 1,
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify'
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify'
      }
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com'
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }
    ]
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
    }
  }
}
</script>
