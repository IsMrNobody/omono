<template>
  <div>
    <v-col class="text-center mt-5 text-h5">
      Tu orden esta en proceso!
    </v-col>
    <OrderForm /> 
  </div>
</template>

<script>
import OrderForm from '@/components/paid/OrderForm'
export default {
  components: {
    OrderForm
  },
  layout: 'paid',
  computed: {
    param() {
      return this.$route.params.id
    }
  }
}
</script>

<style>

</style>