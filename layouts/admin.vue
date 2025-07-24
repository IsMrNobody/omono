<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      class=""
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
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-spacer /> -->
      <div class="logoBar ml-5">
        <v-img src="/logo.png"></v-img>
      </div>
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <!-- <Carrito /> -->
    </v-app-bar>
    <v-main>
      <!-- <v-container fluid> -->
        <Nuxt />
      <!-- </v-container> -->
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
  </v-app>
</template>

<script>
// import Carrito from '@/components/tienda/carrito/Carrito'
export default {
  components: {
    // Carrito
  },
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
        'mdi-twitter',
        'mdi-instagram',
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'pizza roma'
    }
  },
  methods: {
    contacto() {
      window.location.href = "#contacta";
    }
  },
}
</script>

<style scoped>
.logoBar {
  /* margin-top: 75px; */
  width: 180px;
}
</style>
