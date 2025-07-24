<template>
  <v-row>
    <v-col
      v-for="(p, i) in pro"
      :key="i"
      v-show="p.active === true"
      sm="5"
      md="4"
      lg="3"
      cols="6"
    >
      <v-hover v-slot="{}">
        <v-card
          class="sombra"
          color="secondary"
          outlined
          max-width="600"
          height="280"
        >
          <v-img height="155" :src="p.img.url">
            <!-- <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out primary v-card--reveal text-h2 secondary--text"
                style="height: 100%;"
              >
                ${{ p.portion[0].price }}
              </div>
            </v-expand-transition> -->
          </v-img>
          <v-card-text class="pt-5" style="position: relative">
            <ProductDialog :producto="p" />
            <h4 class="tercero--text text-h5 mb-2 mt-12 text-truncate">
              {{ p.name }}
            </h4>
            <!-- <h3 class="text-h4 font-weight-light orange--text mb-2">
              QW cooking utensils
            </h3> -->
            <div class="font-weight-light text-h6 mb-2 text-truncate">
              {{ p.description }}
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import ProductDialog from '@/components/tienda/ProductDialog'
export default {
  components: {
    ProductDialog,
  },
  props: {
    pro: {
      type: Array,
      default: () => {},
    },
  },
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
/* .sombra:hover {
  box-shadow: 2px 100px 80px 10px #ff000040;
} */
.sombra {
  transition: 0.8s;
}
</style>
