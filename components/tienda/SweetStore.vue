<template>
  <div>
    <Banner class="top" :merchant="merchant" />
    <v-container>
      <SelectCat />
      <v-col v-for="(pro, i) in categoriasConProductosActivos" :key="i">
        <v-row>
          <h1 class="ma-5">{{ pro.category }}</h1>
        </v-row>
        <Product :pro="pro.filter" />
      </v-col>
    </v-container>
  </div>
</template>

<script>
import Banner from '@/components/tienda/Banner'
import Product from '@/components/tienda/Product'
import SelectCat from '@/components/tienda/SelectCat'
export default {
  components: {
    Banner,
    Product,
    SelectCat,
  },
  data() {
    return {}
  },
  computed: {
    merchant() {
      return this.$store.state.merchant
    },
    productos() {
      return this.$store.state.products.filterByCat
    },
    hayProductosActivos() {
      // Se mantiene por si quieres ocultar todo el componente si ninguna categoría tiene productos activos
      return (
        Array.isArray(this.categoriasConProductosActivos) &&
        this.categoriasConProductosActivos.length > 0
      )
    },
    categoriasConProductosActivos() {
      // Filtra categorías donde al menos un producto en filter tenga active en true
      return Array.isArray(this.productos)
        ? this.productos.filter(cat => Array.isArray(cat.filter) && cat.filter.some(prod => prod.active))
        : [];
    }
  },
}
</script>

<style scoped>
.top {
  margin-top: -25px;
}
</style>
