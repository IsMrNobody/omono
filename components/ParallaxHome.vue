<template>
  <v-parallax
      :src="merchant.banner"
      height="250"
  >
    <v-col class="text-center">
      <v-img 
        width="180"
        class="mx-auto"
        src="https://static.vecteezy.com/system/resources/previews/009/584/736/original/3d-illustration-coffee-cup-png.png">
      </v-img>
      <h2>{{ merchant.slogan }}</h2>
      <!-- <h3>Ahora puedes pedir tu delivery cuando quieras!</h3> -->
    </v-col>
  </v-parallax>
</template>

<script>
export default {
  computed: {
    merchant() {
      return this.$store.state.merchant
    }
  },
}
</script>

<style scoped></style>