<template>
  <v-container>
    <!-- Categorías y Búsqueda -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <v-chip-group
          v-model="selectedCategory"
          mandatory
          @change="filterByCategory"
          show-arrows
        >
          <v-chip
            v-for="category in categoriesList"
            :key="category"
            :value="category"
            color="secondary"
            outlined
            class="ma-2"
          >
            {{ category }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <!-- <v-col cols="12" md="4">
        <search-products @search="handleSearch" />
      </v-col> -->
    </v-row>

    <!-- Contenido Principal -->
    <v-row>
      <!-- Lista de Productos -->
      <v-col cols="12" md="5" lg="4">
        <v-card
          class="transparent"
          elevation="0"
          height="calc(100vh - 300px)"
          style="overflow-y: auto"
        >
          <div class="d-flex flex-column pa-2">
            <v-card
              v-for="(product, index) in filteredProducts"
              :key="index"
              class="mb-3"
              :class="{ 'on-hover': selectedProduct?.id === product.id }"
              @click="selectProduct(product)"
              elevation="2"
            >
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img
                    :src="product.img?.url || product.image"
                    height="100"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="8" class="pa-3">
                  <div
                    class="text-subtitle-2 font-weight-bold mb-1 text-truncate"
                  >
                    {{ product.name }}
                  </div>
                  <div class="text-caption mb-1 text-truncate-2">
                    {{ product.description }}
                  </div>
                  <!-- <div class="text-subtitle-2 secondary--text">
                    ${{ product.price }}
                  </div> -->
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
      </v-col>

      <!-- Main Product Display -->
      <v-col cols="12" md="7" lg="8">
        <v-card v-if="selectedProduct" class="pa-4 transparent">
          <v-row>
            <v-col cols="12" lg="6" class="d-flex justify-center align-center">
              <v-img
                :src="productImage"
                width="400"
                height="400"
                class="rounded-lg"
              ></v-img>
            </v-col>

            <v-col cols="12" lg="6">
              <div class="text-h4 font-weight-bold mb-2">
                {{ selectedProduct.name }}
              </div>
              <div class="text-subtitle-1 mb-4">
                {{ selectedProduct.description }}
              </div>

              <!-- Porciones -->
              <div v-if="selectedProduct.portion" class="mb-4">
                <div class="text-subtitle-1 mb-2">Porciones:</div>
                <v-chip-group
                  v-model="selectedPortion"
                  active-class="secondary white--text"
                  column
                >
                  <v-chip
                    v-for="(portion, i) in selectedProduct.portion"
                    :key="i"
                    @click="selectPortion(i)"
                  >
                    {{ portion.title }}
                  </v-chip>
                </v-chip-group>
                <div v-if="portionInfo" class="text-caption grey--text mt-1">
                  {{ portionInfo.description }}
                </div>
              </div>

              <!-- Ingredientes -->
              <div v-if="selectedProduct.ingredients" class="mb-4">
                <div class="text-subtitle-1 mb-1">Ingredientes:</div>
                <div class="text-caption grey--text">
                  {{ selectedProduct.ingredients }}
                </div>
              </div>

              <div class="text-h5 secondary--text mb-4">${{ totalPrice }}</div>
              <v-btn color="white" outlined elevation="2" @click="addToCart()">
                Ordenar Ahora
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
// import SearchProducts from '../components/SearchProducts.vue'

export default {
  name: 'CombosPage',
  components: {
    // SearchProducts,
  },
  layout: 'store',
  data() {
    return {
      selectedProduct: null,
      searchTerm: '',
      selectedCategory: null,
      isLoading: true,
      selectedPortion: 0,
      portionInfo: null,
      totalPrice: 0,
    }
  },
  computed: {
    ...mapState({
      storeProducts: (state) => state.products.filterByCat || [],
      rawCategories: (state) => state.products.categories || [],
    }),
    categoriesList() {
      const categories = Array.isArray(this.rawCategories)
        ? this.rawCategories
        : Array.from(this.rawCategories || [])
      return categories.filter(Boolean)
    },
    productImage() {
      if (!this.selectedProduct) return ''
      return this.selectedProduct.img?.url || this.selectedProduct.image || ''
    },
    filteredProducts() {
      if (!this.storeProducts || !this.storeProducts.length) return []

      // Si hay término de búsqueda, buscar en todas las categorías
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase()
        const allProducts = this.storeProducts.flatMap(
          (cat) => cat.filter || []
        )

        const searchResults = allProducts.filter((product) => {
          if (!product.name || !product.description) return false
          return (
            product.name.toLowerCase().includes(searchTermLower) ||
            product.description.toLowerCase().includes(searchTermLower)
          )
        })

        // Si hay una categoría seleccionada, filtrar los resultados por esa categoría
        if (this.selectedCategory) {
          return searchResults.filter(
            (product) => product.category === this.selectedCategory
          )
        }

        return searchResults
      }

      // Si no hay término de búsqueda, mostrar productos de la categoría seleccionada
      if (!this.selectedCategory) return []
      const categoryProducts = this.storeProducts.find(
        (cat) => cat.category === this.selectedCategory
      )
      return categoryProducts?.filter || []
    },
  },
  watch: {
    categoriesList: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.length > 0 && !this.selectedCategory) {
          this.selectedCategory = newVal[0]
        }
      },
    },
    selectedCategory: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.filteredProducts.length > 0) {
          this.selectedProduct = this.filteredProducts[0]
        }
      },
    },
    selectedProduct: {
      immediate: true,
      handler(newProduct) {
        if (newProduct) {
          this.selectedPortion = 0
          this.selectPortion(0)
        }
      },
    },
  },
  async created() {
    try {
      this.isLoading = true
      this.$store.dispatch('setMerchant')
      await this.$store.dispatch('products/setProducts')

      if (this.categoriesList.length > 0) {
        this.selectedCategory = this.categoriesList[0]
        if (this.filteredProducts.length > 0) {
          this.selectedProduct = this.filteredProducts[0]
        }
      }
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    selectProduct(product) {
      this.selectedProduct = product
    },
    handleSearch(query) {
      this.searchTerm = query
      // Si hay resultados de búsqueda, seleccionar el primero
      if (this.filteredProducts.length > 0) {
        this.selectedProduct = this.filteredProducts[0]
      } else if (
        this.selectedProduct &&
        this.selectedProduct.category !== this.selectedCategory
      ) {
        // Si no hay resultados, mantener la selección actual solo si coincide con la categoría actual
        this.selectedProduct = null
      }
    },
    filterByCategory(category) {
      this.searchTerm = ''
      const categoryProducts =
        this.storeProducts.find((cat) => cat.category === category)?.filter ||
        []
      if (categoryProducts.length > 0) {
        this.selectedProduct = categoryProducts[0]
      }
    },
    selectPortion(index) {
      if (!this.selectedProduct?.portion) return

      const portion = this.selectedProduct.portion[index]
      this.portionInfo = portion
      const productPrice = this.selectedProduct.price
      this.totalPrice = productPrice + (portion?.price || 0)
    },
    addToCart() {
      if (!this.selectedProduct) return

      const data = {
        ...this.selectedProduct,
        price: this.totalPrice,
        totalProducto: this.totalPrice,
        selectedPortion: this.portionInfo || {},
        cantidad: 1,
        img: {
          url: this.productImage,
        },
      }
      try {
        this.$store.dispatch('carrito/addToCar', data)
      } catch (error) {
        console.log('aqui error', error)
      }
    },
  },
}
</script>

<style scoped>
.on-hover {
  opacity: 0.8;
  border: 2px solid var(--v-secondary-base) !important;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
