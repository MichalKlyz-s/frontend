<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="hello">
          <h3>Testowy Frontend</h3>
       <keybord/>
       <register/>
    </div>
      </v-col>
      </v-row>
  </v-container>
</template>

<script>
import keybord from '../components/keyboard.vue'
import register from '../components/register.vue'
export default {
  name: 'homePage',
  components: {
    keybord,
    register
  },
  data: () => ({
    // octawList: [1, 2, 3, 4, 5, 6],
    // selected: 1
    // ecosystem: [
    //   {
    //     text: 'vuetify-loader',
    //     href: 'https://github.com/vuetifyjs/vuetify-loader'
    //   },
    //   {
    //     text: 'github',
    //     href: 'https://github.com/vuetifyjs/vuetify'
    //   },
    //   {
    //     text: 'awesome-vuetify',
    //     href: 'https://github.com/vuetifyjs/awesome-vuetify'
    //   }
    // ],
    // importantLinks: [
    //   {
    //     text: 'Documentation',
    //     href: 'https://vuetifyjs.com'
    //   },
    //   {
    //     text: 'Chat',
    //     href: 'https://community.vuetifyjs.com'
    //   },
    //   {
    //     text: 'Made with Vuetify',
    //     href: 'https://madewithvuejs.com/vuetify'
    //   },
    //   {
    //     text: 'Twitter',
    //     href: 'https://twitter.com/vuetifyjs'
    //   },
    //   {
    //     text: 'Articles',
    //     href: 'https://medium.com/vuetify'
    //   }
    // ],
    // whatsNext: [
    //   {
    //     text: 'Explore components',
    //     href: 'https://vuetifyjs.com/components/api-explorer'
    //   },
    //   {
    //     text: 'Select a layout',
    //     href: 'https://vuetifyjs.com/getting-started/pre-made-layouts'
    //   },
    //   {
    //     text: 'Frequently Asked Questions',
    //     href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
    //   }
    // ]
  })
}
</script>
