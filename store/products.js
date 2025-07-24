import { productos } from "../plugins/sweetApi"

export const state = () => ({
    products: [],
    filterProducts: [],
    categories: [],
    filterByCat: []
})

export const mutations = {
  setProducts( state, data ) {
    state.products = data
  },
  setByCat( state, data ) {
    state.filterProducts = data
    state.filterByCat = data
  },
  filterCat( state, id ) {
    state.filterByCat = state.filterProducts.filter(pro => pro.category === id)
  },
  setCateg( state, data ) {
    state.categories = Array.from(data)
  }
}

export const actions = {
  async setProducts({ commit, dispatch }) {
    try {
      const data = await productos()
      if (Array.isArray(data)) {
        commit('setProducts', data)
        dispatch('setCategories')
      } else {
        console.error('Error: productos() did not return an array', data)
        commit('setProducts', [])
        commit('setCateg', [])
        commit('setByCat', [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      commit('setProducts', [])
      commit('setCateg', [])
      commit('setByCat', [])
    }
  },
  setCategories({ state, commit }) {
    try {
      const products = state.products
      if (!Array.isArray(products)) {
        console.error('Products is not an array')
        commit('setCateg', [])
        return
      }

      const categories = new Set()
      
      products.forEach(product => {
        if (product && product.category) {
          categories.add(product.category)
        }
      })

      commit('setCateg', categories)

      const mapFilter = Array.from(categories).map(category => {
        const filter = products.filter(product => product.category === category)
        return { filter, category }
      })

      commit('setByCat', mapFilter)
    } catch (error) {
      console.error('Error setting categories:', error)
      commit('setCateg', [])
      commit('setByCat', [])
    }
  }
}
