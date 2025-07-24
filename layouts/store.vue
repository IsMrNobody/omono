<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      class="secondary"
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
      <!-- <v-spacer /> -->
      <div class="logoBar ml-5">
        <!-- <v-img src="/logo.png"></v-img> -->
        <nuxt-link to="/" class="style">
          <h1 class="tercero--text">{{ merchant.name }}</h1>
        </nuxt-link>
      </div>
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <Carrito />
    </v-app-bar>
    <v-main class="primary">
      <v-container>
        <v-badge
          :content="itemCount"
          :value="itemCount"
          color="green"
          overlap
          class="posbtn"
        >
          <v-btn x-large color="" @click="seeCar()">
            <v-icon>mdi-fire</v-icon>
          </v-btn>
        </v-badge>
        
      </v-container>
        <Nuxt />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
     <!-- <v-footer
        dark
        padless
      >
        <v-card
          class="flex"
          flat
          tile
        >
          <v-card-title class="tercero">
            <strong class="subheading">Conecta con nosotros!</strong>

            <v-spacer></v-spacer>

            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4"
              dark
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text id="contacta" class="py-2 text-center">
            {{ new Date().getFullYear() }} — <strong>{{ merchant.name }} - {{ merchant.city }}</strong>
          </v-card-text>
        </v-card>
      </v-footer> -->
  </v-app>
</template>

<script>
import Carrito from '@/components/tienda/carrito/Carrito'
export default {
  components: {
    Carrito
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-cupcake',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-storefront',
          title: 'Store',
          to: '/store'
        }
      ],
      icons: [
        'mdi-facebook',
        'mdi-instagram',
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Magia Legal'
    }
  },
  computed: {
    merchant() {
      return this.$store.state.merchant
    },
    carrito() {
      return this.$store.state.carrito.items
    },
    itemCount() {
      return this.carrito.length
    },
  },
  methods: {
    contacto() {
      window.location.href = "#contacta";
    },
    seeCar() {
      this.$store.commit('carrito/verCarro')
      this.$store.commit('carrito/setDialog', true)
    },
  },
}
</script>

<style scoped>
.posbtn {
  position: fixed;
  z-index: 5;
  right: 5%;
  bottom: 5%;
}
.style {
  text-decoration: none;
}
</style>
