<template>
  <!-- <v-row justify="center">
    <v-date-picker v-model="picker"></v-date-picker>
  </v-row> -->
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
    disabled
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Fecha"
        disabled
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
      disabled
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(date), setDate()"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    data () {
      return {
        menu: false,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      }
    },
    created() {
      this.setDate()
    },
    methods: {
      setDate() {
        this.$store.commit('carrito/setDate', this.date)
      }
    }
  }
</script>
