<template>
    <div style="margin: 20px;">
<v-file-input active clearable label="File input" variant="underlined" small-chips
        model-value=[]
        @onchange="this.readFile('lol')"
        @update:modelValue="test2()"
      ></v-file-input>
      {{ test }}
    </div>
</template>
<script>
// Analiza i poprawa wczytania wybranego pliku
// Walidacjia pliku (format) oraz validacja danych w nim zawartych
export default {
  name: 'fileReader',
  data: () => ({
    test: null
  }),
  methods: {
    async test2 (tt) {
      console.log(tt)
    },
    readFile (event) {
      console.log('test')
      console.log(event)
      //   const path = require("path");
      const xlsx = require('xlsx')

      // const filePath = path.resolve(__dirname, file);

      const workbook = xlsx.readFile(event)
      const sheetNames = workbook.SheetNames

      // Get the data of "Sheet1"
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

      /// Do what you need with the received data
      data.map(person => {
        console.log(`${person} is ${person} years old`)
        return 'yes'
      })
    }
  }
}

</script>
