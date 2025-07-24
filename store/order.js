import {
  getOrders,
  getOrderById,
  sendComment,
  checkOrder,
  editOrder,
} from "../plugins/sweetApi"

export const state = () => ({
  orders: [],
  factura: {},
  filtered: [],
  loading: true
})

export const mutations = {
  setOrders( state, data ) {
    state.orders = data
    state.loading = false
  },
  setOrder( state, data ) {
    state.factura = data
  },
  setFiltered( state, data ) {
    state.filtered = data
  }
}

export const actions = {
  async getOrders({ commit, rootState }) {
    const id = rootState.merchant._id
    const data = await getOrders(id)
    commit('setOrders', data.reverse())
  },
  async getOrderById({ commit }, id) {
    try {
      const data = await getOrderById(id)
      if (!data._id) throw new Error(data)
      commit('setOrder', data)
    } catch (error) {
      this.$router.push('/')
    }
  },

  async checkOrder({ dispatch, state }, ref) {
    try {
      const id = state.factura._id
      const check = {
        check: true,
        numberRef: ref
      }
      const data = await checkOrder(id, check)
      if (!data._id) throw new Error(data)
      dispatch('getOrderById', id)
    } catch (error) {
      console.log(error.message)
    }
  },
  async sendMsg(_ctx, data) {
    await sendComment(data)
  },

  async editOrder({ dispatch, state }, set) {
    try {
      const payload = {
        status: set.status,
        paid: set.paid,
        id: set.id
      }
      const data = await editOrder(payload)
      if (data.length) throw new Error(data)
      dispatch('getOrders')
    } catch (error) {
      console.log(error.message)
    }
  },
  setDate({ commit, state }, date) {
    const filtere = state.orders.filter((or) => or.deliveryDate === date)
    commit('setFiltered', filtere)
  }
}
