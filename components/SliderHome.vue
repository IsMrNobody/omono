<template>
  <v-sheet
    class="mx-auto transparent"
    max-width="1200"
  >
    <v-slide-group
      v-model="model"
      class="ma-2"
    >
      <v-slide-item
        v-for="(n, i) in history"
        :key="i"
      >
        <v-card
          class="mx-auto pa-2 ml-5 mr-5 transparent"
          flat
          height="420"
          max-width="320"
        >
          <v-img height="auto" :src="n.img"></v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
  export default {
    props: {
      history: {
       type: Array,
       default: () => {}
      }
    },
    data: () => ({
      model: null,
      photos: [
        {
          img: "https://res.cloudinary.com/dku13l2ep/image/upload/v1692388700/JARTATE/Ciudad/Anaco/islaglutenfree/home/Screenshot_3_atoevb.jpg"
        },
        {
          img: "https://res.cloudinary.com/dku13l2ep/image/upload/v1692388699/JARTATE/Ciudad/Anaco/islaglutenfree/home/Screenshot_1_dq5wco.jpg"
        },
        {
          img: "https://res.cloudinary.com/dku13l2ep/image/upload/v1692388699/JARTATE/Ciudad/Anaco/islaglutenfree/home/Screenshot_2_p9w6vn.jpg"
        },
        {
          img: "https://res.cloudinary.com/dku13l2ep/image/upload/v1692388699/JARTATE/Ciudad/Anaco/islaglutenfree/home/Screenshot_4_tztuhy.jpg"
        },
      ]
    })
  }
</script>

