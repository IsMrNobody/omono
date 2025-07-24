<template>
  <div>
    <v-img width="100vw" height="310" :src="merchant.banner"> 
      <v-card class="transparent text-center mt-10" flat>
        <v-img width="250" class="mx-auto" src="https://res.cloudinary.com/dku13l2ep/image/upload/v1711547822/JARTATE/Ciudad/maracay/milacafe/logo/horizontal_white_bdgmf9.png"></v-img>
        <!-- <h2>{{ merchant.name }}</h2> -->
        <h3>{{ merchant.slogan }}</h3>
        <p>{{ merchant.address }}</p>
        <!-- <p>Lunes a Domingo de 10am a 10pm</p> -->
        <!-- <p class="">Servicio de entrega a domicilio y pick up</p> -->
        <!-- <v-btn color="pink">Buy</v-btn> -->
      </v-card>
    </v-img>
  </div>
</template>

<script>
export default {
  props: {
    merchant: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style></style>