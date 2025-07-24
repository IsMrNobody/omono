<template>
  <v-container class="promo-dia-container fill-height d-flex flex-column align-center justify-center" fluid>
    <v-row class="pt-8 pb-0" justify="center">
      <v-col cols="12" class="text-center">
        <div class="welcome-text">Welcome<br /><span class="username">{{ username }}</span></div>
        <div class="tabs">
          <v-btn text :class="tabActive === 0 ? 'tab-active' : ''" @click="tabActive = 0">Singles</v-btn>
          <v-btn text :class="tabActive === 1 ? 'tab-active' : ''" @click="tabActive = 1">Today's Special</v-btn>
          <v-btn text :class="tabActive === 2 ? 'tab-active' : ''" @click="tabActive = 2">Combo</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="py-0">
      <v-col cols="12" md="8" lg="6" class="d-flex flex-column align-center">
        <div class="promo-card elevation-10">
          <v-img
            :src="promoDelDia.image || 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400'"
            class="promo-img"
            contain
            height="180"
            width="180"
            style="border-radius: 50%; margin: 0 auto; border: 6px solid var(--v-tercero); background: #fff;"
          ></v-img>
          <v-btn icon class="favorite-btn">
            <v-icon color="red">mdi-heart</v-icon>
          </v-btn>
          <div class="promo-info mt-6">
            <h2 class="promo-title">{{ promoDelDia.name }}</h2>
            <div class="promo-details">{{ promoDelDia.description }}</div>
            <div class="promo-price">${{ promoDelDia.price }}</div>
            <div class="quantity-controls mt-3">
              <v-btn icon @click="decrement" :disabled="quantity===1">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="quantity">{{ quantity }}</span>
              <v-btn icon @click="increment">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-btn
              class="buy-btn mt-6"
              color="tercero"
              large
              rounded
              @click="buyNow"
            >
              Buy Now
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="nav-bottom" justify="center">
      <v-col cols="12" class="d-flex justify-space-around align-center nav-icons">
        <div class="nav-item">
          <v-icon size="36">mdi-hamburger</v-icon>
          <div class="nav-label">Burgers</div>
        </div>
        <div class="nav-item active">
          <v-icon size="36">mdi-pizza</v-icon>
          <div class="nav-label">Pizza</div>
        </div>
        <div class="nav-item">
          <v-icon size="36">mdi-glass-cocktail</v-icon>
          <div class="nav-label">Drinks</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PromoDia',
  data() {
    return {
      tabActive: 1,
      quantity: 2,
      username: 'Aleta Oscar',
    };
  },
  computed: {
    promoDelDia() {
      // Busca la promo del día en el store. Si no existe, usa un ejemplo.
      const promos = this.$store.state.merchant.promos || [];
      return (
        promos.find(p => p.todaySpecial) ||
        promos[0] ||
        {
          name: 'Farm House',
          description:
            'Wholesome goodness on a thin, crunchy crust. Say hello to Diggin’s lip-smacking mushrooms and farm pizza, with thinly sliced mushroom and spinach leaves bringing in the freshness quotient.',
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
    increment() {
      this.quantity++;
    },
    decrement() {
      if (this.quantity > 1) this.quantity--;
    },
    buyNow() {
      // Mensaje para WhatsApp
      const msg = `Hola! Quiero pedir ${this.quantity}x ${this.promoDelDia.name} ($${this.promoDelDia.price} c/u): ${this.promoDelDia.description}`;
      const phone = this.merchantPhone.replace(/[^\d]/g, '');
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped>
.promo-dia-container {
  background: linear-gradient(145deg, var(--v-primary), var(--v-secondary));
  min-height: 100vh;
  color: var(--v-cuarto);
  padding-bottom: 80px;
}
@media (max-width: 600px) {
  .promo-dia-container {
    padding: 0 0.5rem 90px 0.5rem;
  }
}
.welcome-text {
  font-size: 1.1rem;
  color: var(--v-cuarto);
  font-weight: 400;
  letter-spacing: 1px;
  opacity: 0.7;
}
.username {
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--v-tercero);
}
.tabs {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 1.5rem 0 0.5rem 0;
}
.tab-active {
  color: var(--v-tercero) !important;
  font-weight: bold;
  border-bottom: 2px solid var(--v-tercero);
}
.promo-card {
  background: rgba(30, 30, 30, 0.93);
  border-radius: 2rem;
  padding: 2.3rem 1.2rem 1.2rem 1.2rem;
  position: relative;
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
@media (max-width: 600px) {
  .promo-card {
    max-width: 97vw;
    padding: 1.2rem 0.3rem 1.2rem 0.3rem;
  }
}
.promo-img {
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.18);
}
.favorite-btn {
  position: absolute;
  top: 22px;
  right: 22px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 10px 0 rgba(255,0,0,0.07);
  z-index: 2;
}
.promo-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--v-tercero);
  margin-bottom: 0.5rem;
  word-break: break-word;
}
@media (max-width: 600px) {
  .promo-title {
    font-size: 1.1rem;
  }
}
.promo-details {
  font-size: 1rem;
  color: var(--v-cuarto);
  opacity: 0.9;
  margin-bottom: 0.5rem;
  word-break: break-word;
}
@media (max-width: 600px) {
  .promo-details {
    font-size: 0.92rem;
  }
}
.promo-price {
  font-size: 1.1rem;
  color: var(--v-tercero);
  font-weight: 600;
  margin-bottom: 0.5rem;
}
@media (max-width: 600px) {
  .promo-price {
    font-size: 1rem;
  }
}
.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
@media (max-width: 600px) {
  .quantity-controls {
    gap: 7px;
  }
}
.quantity {
  font-size: 1.2rem;
  min-width: 2.5rem;
  text-align: center;
  color: var(--v-cuarto);
}
.buy-btn {
  background: var(--v-tercero) !important;
  color: #222 !important;
  font-weight: 700;
  font-size: 1.1rem;
  min-width: 140px;
  box-shadow: 0 2px 12px 0 rgba(255,214,113,0.18);
}
@media (max-width: 600px) {
  .buy-btn {
    font-size: 1rem;
    min-width: 90px;
    padding: 0.7rem 0.8rem;
  }
}
.nav-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(20, 20, 20, 0.98);
  z-index: 10;
  padding: 0.5rem 0 0.3rem 0;
  box-shadow: 0 -4px 24px 0 rgba(0,0,0,0.14);
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
  max-width: 500px;
  margin: 0 auto;
}
@media (max-width: 600px) {
  .nav-bottom {
    max-width: 100vw;
    border-radius: 1.2rem 1.2rem 0 0;
    padding-bottom: 0.2rem;
  }
}
.nav-icons {
  gap: 22px;
}
@media (max-width: 600px) {
  .nav-icons {
    gap: 10px;
  }
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--v-cuarto);
  opacity: 0.7;
  font-size: 0.9rem;
}
@media (max-width: 600px) {
  .nav-item {
    font-size: 0.8rem;
  }
}
.nav-item.active {
  color: var(--v-tercero);
  opacity: 1;
}
.nav-label {
  font-size: 0.9rem;
  margin-top: 0.2rem;
}
</style>
