<template>
  <v-card
    class="mx-auto mt-12"
    max-width="400"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ order.nameUser }}
        </v-list-item-title>
        <v-list-item-subtitle>Fecha: {{ order.createdAt }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col
          class="text-h4 primary--text"
          sm="6"
        >
          {{ order.total }} $
        </v-col>
        <!-- <v-col cols="6">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sun.png"
            alt="Sunny image"
            width="92"
          ></v-img>
        </v-col> -->
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon v-if="order.status === 'Entregado'">
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-icon v-else>
        <v-icon>mdi-clock</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ order.status }}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon v-if="!order.paid">
        <v-icon>mdi-cash</v-icon>
      </v-list-item-icon>
      <v-list-item-icon v-else>
        <v-icon color="green">mdi-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ order.paymentMethod }}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item v-if="order.paymentMethod === 'Pago Movil'">
      <v-list-item-icon>
        <v-icon>mdi-bank</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ payment.bankNumber }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ payment.phone }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ payment.cedula }}</v-list-item-subtitle>
    </v-list-item>

     <v-list-item v-if="order.paymentMethod === 'Zelle'">
      <v-list-item-icon>
        <v-icon>mdi-bank</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ payment.email }}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item v-if="order.paymentMethod !== 'Cash'">
      <v-list-item-icon v-if="order.numberRef">Ref:</v-list-item-icon>
      <v-list-item-subtitle v-if="order.numberRef">{{ order.numberRef }}</v-list-item-subtitle>

      <v-col v-else>       
        <v-row>
          <v-text-field
            v-model="ref"
            :disabled="order.paid"
            label="Number Ref."
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            class="my-auto"
            :disabled="order.paid"
            @click="checkOrder"
          >
            check
          </v-btn>        
        </v-row>
      </v-col>
    </v-list-item>
    <!-- <v-slider
      v-model="time"
      :max="2"
      :tick-labels="labels"
      class="mx-4"
      ticks
    ></v-slider> -->

    <v-list class="marron">
      <v-card-text class="grey--text">
        Productos:
      </v-card-text>
      <v-list-item
        v-for="(item, i) in order.products"
        :key="i"
      >
        <v-list-item-title>{{ item.name }} x {{ item.cantidad }}</v-list-item-title>

        <!-- <v-list-item-subtitle>
          {{ item.products}}
        </v-list-item-subtitle> -->

        <v-list-item-subtitle class="text-right">
          $ {{ item.price }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions class="accent darken-2">
      <v-btn text color="green" class="mx-auto" @click="contactar">
        Contact
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        labels: ['WAIT', 'GO', 'FINISH'],
        ref: ''
      }
    },
    computed: {
      order() {
        return this.$store.state.order.factura
      },
      phone() {
        return this.$store.state.merchant.phone
      },
      payment() {
        return this.$store.state.carrito.selectedPayment
      }
    },
    async created() {
      this.$store.dispatch('order/getOrderById', this.$route.params.id)
      this.$store.dispatch('setMerchant')
      this.ref = await this.order.numberRef
    },
    methods: {
      checkOrder() {
        const ref = this.ref
        this.$store.dispatch('order/checkOrder', ref)
      },
      contactar() {
        const phone = this.phone
        const data = {
          text: `Hola soy ${(this.order.nameUser)}, y mi pedido es: ${(this.order._id).substr(18)}`
        }
        window.open(`https://wa.me/${phone}?text=${data.text}`)
      }
    }
  }
</script>

<style>

</style>