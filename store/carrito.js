import { sendOrder, paypal } from "../plugins/sweetApi"
import { success, error } from '~/plugins/sweetAlert'

export const state = () => ({
    items: [],
    selectedPayment: '',
    dialogo: false,
    order: [],
    date: '',
    total: '',
    pago: '',
    orderId: '',

    verForm: false,
    verCarro: true,
    verConfirm: false
})

export const mutations = {
  addCar(state, data) {
    state.items = [data, ...state.items]
  },
  setCart(state, dat) {
    state.items.splice(dat.id, 1, { ...dat })
  },
  setTotal(state, total) {
    state.total = total
  },
  setPago(state, data) {
    state.pago = data
  },
  setOrderId(state, id) {
    state.orderId = id
  },
  deleteFromCart(state, i) {
    state.items.splice(i, 1)
  },
  resetCar(state) {
    state.items = []
  },
  setPayment(state, data) {
    state.selectedPayment =  data
  },
  setDialog(state, data) {
    state.dialogo = data
  },
  setOrder(state, order) {
    state.order = order
  },
  setDate(state, date) {
    state.date = date
  },
  verCarro(state) {
    state.verCarro = true
    state.verConfirm = false
    state.verForm = false
  },
  verForm(state) {
    state.verForm = true
    state.verCarro = false
    state.verConfirm = false
  },
  verConfirm(state) {
    state.verConfirm = true
    state.verCarro = false
    state.verForm = false
  }
}

export const actions = {
  addToCar({ commit }, data) {
    commit('addCar', data)
  },
  setCart({ commit, state }, i) {
    const data = state.items[i]
    const cant = data.cantidad + 1
    const totalPro = data.price * cant
    const dataR = {
        ...data,
        cantidad: cant,
        totalProducto: totalPro,
        id: i
    }
    commit('setCart', dataR)
  },
  delCart({ commit, state, dispatch }, i) {
    const data = state.items[i]
    if (data.cantidad <= 1) {
      commit('deleteFromCart', i)
    } else {
      const cant = data.cantidad - 1
      const dataR = {
        ...data,
        cantidad: cant,
        totalProducto: data.totalProducto - data.price,
        id: i
      }
      commit('setCart', dataR)
    }
  },
  setPayment({ commit }, i) {
    commit('setPayment', i)
  },
  async sendOrder({ commit, state, rootState }, form) {
    try {
      const pedido = {
        products: state.items,
        paymentMethod: state.selectedPayment.type,
        deliveryDate: state.date,
        total: state.total,
        merchantId: rootState.merchant._id,
        merchantPhone: rootState.merchant.phone,
        merchantEmail: rootState.merchant.email,
        ...form
      }
      const order = await sendOrder(pedido)
      if (order) {
        if (pedido.paymentMethod !== 'Cash') {
          await commit('verConfirm')
        } else {
          this.$router.push(`/paid/${order.data._id}`)
          setTimeout(() => {
            commit('setDialog', false)
          }, 3000)
        }
        commit('resetCar')
        commit('setOrderId', order.data._id)
        success.fire({title: 'Order Send', timer: 3000, position: 'center'})
      } else {
        throw new Error('order not send')
      }
    } catch (err) {
      error.fire(err.message)
    }
  },
  async paypal({ commit, state }) {
    const data = {
      total: state.total,
      orderId: state.orderId
    }
    const pago = await paypal(data)
    commit('setPago', pago)
    window.location.href = pago.links[1].href
    // window.open(pago.links[1].href)
  }
}