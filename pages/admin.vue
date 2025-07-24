<template>
  <v-container>
    <v-col>
      <Calendar v-if="history" />
    </v-col>
    <Admin v-if="history" />
    <v-col v-else sm="4" cols class="mx-auto">
      <v-text-field        
        v-model="pass"
        label="Contraseña"
        outlined
        @keyup.enter="password"
      ></v-text-field>
    </v-col>
  </v-container>
</template>

<script>
import Admin from '@/components/admin/Admin'
import Calendar from '@/components/admin/Calendar'
export default {
  components: {
    Admin,
    Calendar
  },
  layout: 'admin',
  data() {
    return {
      pass: '',
      history: false
    }
  },
  computed: {
    merchant() {
      return this.$store.state.merchant
    }
  },
  async created() {
    await this.$store.dispatch('setMerchant')
    await this.$store.dispatch('order/getOrders')
  },
  methods: {
    password() {
      if (this.pass === this.merchant.pass) {
        this.history = true
      } else {
        alert('Debes ingresar la contraseña correcta')
      }
    }
  }
}
</script>

<style>

</style>