<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="hello">
          <h3>Testowy Frontend</h3>
      <v-btn>
  btn
</v-btn>
    <v-btn variant="tonal" @click="test()">
      Główne
    </v-btn>
      <v-btn>
        Pozytywy
      </v-btn>
      <v-btn>
        Echo
      </v-btn>
      <v-btn>
        Brustwerk
      </v-btn>
      <v-btn>
        Solo
      </v-btn>
      <v-btn>
        Orchestral
      </v-btn>
      <v-btn>
        Bombarde
      </v-btn>
      <v-btn>
        Pedał
      </v-btn>
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
    async test () {
      const test = 'test'
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
