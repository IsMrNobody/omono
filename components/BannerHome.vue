<template>
    <div class="text-center">      
      
      <hr>
      <div class="mb-5 mt-10" justify="center">
        <h3 class="tex orange--text">Servicio Delivery</h3>
        <h2>Puedes realizar tu pedido por Delivery o Pick up</h2>
        <v-btn color="tercero" outlined to="/menu" class="mb-10 mt-8">Ver Menu</v-btn>
      </div>
      <SliderHome :history="history" />
      <v-col sm="7" cols class="mx-auto">
        <p class="primary--text">En {{ merchant.name }} ofrecemos un servicio de calidad Te invitamos a sumergirte en este delicioso mundo de ingredientes saludables.</p>
      </v-col>
      <hr>
      <!-- <v-btn outlined class="mt-5" color="pink lighten-3">See more!</v-btn> -->
    </div>
</template>

<script>
// import SliderHome from '@/componets/SliderHome'

export default ({
  components: {
    // SliderHome
  },
  computed: {
    merchant() {
      return this.$store.state.merchant
    },
    history() {
      return this.$store.state.merchant.history
    }
  }
})
</script>


<style scoped>
.top {
  padding-top: 300px;
}
.tex {
  text-transform: uppercase;
  font-size: 30px;
}
</style>