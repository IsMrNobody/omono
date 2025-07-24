<template>
  <div class="pa-4">
    <v-chip-group active-class="tercero--text" column>
      <v-chip v-for="(pay, i) in payment" :key="i" color="secondary" @click="setPayment(pay)">
        {{ pay.type }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 'Cash',
    }
  },
  computed: {
    paymentSelet() {
      return this.$store.state.carrito.selectedPayment
    },
    payment() {
      return this.$store.state.merchant.payment
    },
  },
  created() {
    this.setPayment(this.payment[0])
  },
  methods: {
    setPayment(tag) {
      this.$store.dispatch('carrito/setPayment', tag)
    },
  },
}
</script>
