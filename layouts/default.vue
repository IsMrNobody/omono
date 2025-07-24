<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      class="marronColor"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      color="primary"
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <!-- <v-spacer /> -->
      <div class="logoBar">
        <!-- <v-img src="https://res.cloudinary.com/dku13l2ep/image/upload/v1674699887/DaniPotter/Magia_Legal_bea1g7.png"></v-img> -->
        <nuxt-link to="/combos" class="style">
          <h1 class="tercero--text">{{ merchant.name }}</h1>
        </nuxt-link>
        <!-- <h1 class="tercero--text">{{ merchant.name }}</h1> -->
      </div>
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <!-- <v-btn text>About Us</v-btn> -->
      <v-btn class="d-none d-sm-flex" text @click="contacto">Contacto</v-btn>
      <v-btn to="/menu" text >Menu</v-btn>
    </v-app-bar>
    <v-main class="primary">
      <!-- <v-container fluid> -->
        <Nuxt />
      <!-- </v-container> -->
    </v-main>
    
     <v-footer
        dark
        padless
      >
        <v-card
          class="flex"
          flat
          tile
        >
          <v-card-title class="primary">
            <strong class="">Siguenos para dudas y comentarios!</strong>

            <v-spacer></v-spacer>

            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4 redes"
              dark
              icon
            >
              <v-icon color="primaery" size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text id="contacta" class="py-2 text-center">
            {{ new Date().getFullYear() }} — <strong>{{ merchant.name }} - {{ merchant.city }}</strong>
          </v-card-text>
        </v-card>
      </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-pizza',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-storefront',
          title: 'Menu',
          to: '/menu'
        }
      ],
      icons: [
        'mdi-facebook',
        // 'mdi-twitter',
        'mdi-instagram',
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Pizza Roma'
    }
  },
  computed: {
    merchant() {
      return this.$store.state.merchant
    }
  },
  methods: {
    contacto() {
      // window.location.href = "#contacta";
        document.getElementById('contacta').scrollIntoView({
        behavior: 'smooth'
      });
    }
  },
}
</script>

<style scoped></style>
