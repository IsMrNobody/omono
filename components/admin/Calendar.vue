<template>
  <v-row justify="center">    
    <v-date-picker
      v-model="picker"
      color="green darken-1"
      full-width
      no-title
      :events="arrayEvents"
      @change="date"
    >
    </v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        arrayEvents: null,
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      }
    },
    computed: {
      orders() {
        return this.$store.state.order.orders
      }
    },
    created () {
      this.$store.dispatch('order/setDate', this.picker)
      this.getDateDelivery()
    },
    methods: {
      date() {
        this.$store.dispatch('order/setDate', this.picker)
      },
      getDateDelivery() {
          this.arrayEvents = [...this.orders].map((or) => {
          return or.deliveryDate
        })
      }      
    }
  }
</script>

