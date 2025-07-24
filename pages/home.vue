<template>
  <div>
    <v-img class="banner" :src="merchant.banner">
      <v-card class="fix mx-auto" flat>
        <!-- <h1>The Taste of Your Celebrations</h1> -->
        <img width="60%" class="mt-7" :src="merchant.logo" alt="">
        <v-col sm="12" cols="9" class="mx-auto">
          <p class="orange--text">Lunes a Domingo <br> de 10:00am a 10:00pm</p>
        <v-btn outlined color="" to="/menu" class="mb-5">Ver Menu</v-btn>
          <h2 class="beige--text spaci">Llegamos a la puerta de tu casa</h2>
        </v-col>
      </v-card>
    </v-img>
    <v-container>
      <div class="text-center pad">
        <v-card max-width="700" flat class="transparent mx-auto mb-5">
          <h3 class="siz">Nuestra Exquisita Variedad de Sabores</h3>
          <p>
            Cada bocado es una explosión de sabores frescos y auténticos, con los ingredientes más selectos.
          </p>
        </v-card>
        <v-row justify="center">
          <v-col v-for="(promo, i) in promos" :key="i" sm="4" cols>
            <CardsHome :promo="promo" />
          </v-col>
        </v-row>
      </div>
    </v-container>
    <ParallaxHome />
    <v-container fluid>
      <div>
        <BannerHome />
      </div>
      <v-row justify="center" class="contacto">
        <v-col class="my-auto" sm="4" cols>
          <v-img
            width="150"
            class="mx-auto"
            :src="merchant.logo">
          </v-img>
        </v-col>
        <Contact />
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    merchant() {
      return this.$store.state.merchant
    },
    promos() {
      return this.$store.state.merchant.promos
    }
  },
  created() {
    this.$store.dispatch('setMerchant')
    // this.$store.dispatch('setProducts')
  }
}
</script>

<style scoped>
.fix {
  height: 100%;
  text-align: center;
  max-width: 500px;
  text-transform: uppercase;
}
.fix {
  backdrop-filter: blur(20px);
  background-color:  var(--v);
}
.pad {
  padding-top: 80px;
  padding-bottom: 120px;
}
.contacto {
  padding-bottom: 80px;
  margin-top: 180px;
  /* background: rgb(255,0,0); */
/* background: linear-gradient(180deg, rgb(255, 170, 0) 0%, rgb(210, 123, 0) 20%, rgba(0,0,0,1) 70%); */
}
h1 {
  font-size: 4rem;
}
p {
  size: 18px;
}
.banner {
  /* height: 68vh; */
  width: 100vw;
}
.siz {
  /* font-size: 25px; */
  text-transform: uppercase;
}
</style>