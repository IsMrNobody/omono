<template>
  <div class="text-center">
    <v-card max-width="600" class="mx-auto">
      <v-card-actions>
        <v-card-subtitle>
          Metodo de pago: <h2 class="primary--text">{{ paymentSelet.type }}</h2>
        </v-card-subtitle>
        <v-spacer></v-spacer>
        <v-card-subtitle>
          Total:
        </v-card-subtitle>
        <h2>
          $ {{ totalOrder }}
        </h2>
      </v-card-actions>
      <!-- <p class="grey--text">Payment address:</p>
      <p class="primary--text text-h5 text-decoration-underline">{{ paymentSelet.email }}</p> -->
      <v-col v-if="paymentSelet.type === 'Pago Movil'" justify="center">
        <p class="grey--text">Cuenta de pago: </p>
        <p>
          Banco: {{ paymentSelet.bankNumber }}
        </p>
        <p>
          CI: {{ paymentSelet.cedula }}
        </p>
        <p>
          Tlf: {{ paymentSelet.phone }}
        </p>
      </v-col>
      <v-col v-if="paymentSelet.type === 'Zelle'" justify="center">
        <p class="grey--text">Cuenta de pago: </p>
        <p>
          {{ paymentSelet.email }}
        </p>
      </v-col>
      <v-card-actions>
        <v-btn v-if="paymentSelet.type === 'Paypal'" color="primary" outlined block @click="paypal()">
          Metodo de Pago: {{ paymentSelet.type }}
        </v-btn>
        <v-row v-else class="green my-auto">
          <h4 class="mx-auto my-auto mt-2 mb-2">!Gracias por su compra, <br /> estaremos en contacto pronto!</h4>
        </v-row>
      </v-card-actions>
      <v-col>
        <v-btn class="mt-5" small text @click="check">ver factura</v-btn>
      </v-col>
    </v-card>
    <!-- <h1>Gracias por tu compra, en breve estaremos en contato contigo!</h1> -->
  </div>
</template>

<script>
export default {
  props: {
    total: {
     type: String,
     default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    paymentSelet() {
      return this.$store.state.carrito.selectedPayment
    },
    totalOrder() {
      return this.$store.state.carrito.total
    },
    orderId() {
      return this.$store.state.carrito.orderId
    }
  },
  methods: {
    check() {
      this.$router.push(`/paid/${this.orderId}`)
      this.$store.commit('carrito/setDialog', false)
      this.$store.commit('carrito/resetCar')
    },
    paypal() {
      this.$store.dispatch('carrito/paypal')
    }
  }
}
</script>

<style>

</style>