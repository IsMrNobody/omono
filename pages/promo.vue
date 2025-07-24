<template>
  <div class="d-flex justify-center align-center fill-height">
    <div class="position-relative pa-1" style="max-width: 500px; width: 100%;">
      <div class="animated-border"></div>
      <v-card elevation="8" color="secondary" class="position-relative">
        <v-card-text class="pa-0">
          <v-row no-gutters>
            <v-col cols="12" class="text-center pt-8 pb-4">
              <v-avatar size="200" class="elevation-6">
                <v-img
                  :src="promoDelDia.image || 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400'"
                  cover
                  class="elevation-2"
                ></v-img>
              </v-avatar>
            </v-col>
            
            <v-col cols="12" class="px-6 pb-6">
              <v-card-title class="justify-center text-h4 font-weight-bold text-tercero mb-2">
                {{ promoDelDia.name }}
              </v-card-title>
              
              <v-card-text class="mx-auto text-body-1 text-cuarto mb-4">
                {{ promoDelDia.description }}
              </v-card-text>
              
              <div class="d-flex align-center justify-space-between mt-6">
                <div class="text-h4 font-weight-bold text-tercero">
                  ${{ promoDelDia.price }}
                </div>
                
                <v-btn
                  color="tercero"
                  size="x-large"
                  dark
                  @click="buyNow"
                  elevation="4"
                  class="text-none"
                >
                  <v-icon left>mdi-cart</v-icon>
                  Ordenar Ahora
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
    };
  },
  computed: {
    promoDelDia() {
      const promos = this.$store.state.merchant.promos || [];
      return (
        promos.find(p => p.todaySpecial) ||
        promos[0] ||
        {
          name: 'Promo del Día',
          description: 'Deliciosa oferta especial de hoy',
          price: 9.99,
          image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400',
        }
      );
    },
    merchantPhone() {
      return this.$store.state.merchant.phone || '';
    },
  },
  methods: {
    buyNow() {
      const msg = `Hola! Me gustaría ordenar: ${this.promoDelDia.name} - $${this.promoDelDia.price}`;
      const phone = this.merchantPhone.replace(/[^\d]/g, '');
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped>
.animated-border {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 28px;
  background: linear-gradient(45deg, 
    var(--v-tercero) 0%, 
    var(--v-primary) 50%, 
    var(--v-tercero) 100%);
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
  z-index: 1;
  filter: blur(10px);
  opacity: 1;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.position-relative {
  position: relative;
}
</style>
