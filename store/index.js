import { restaurante } from "../plugins/sweetApi"

export const state = () => ({
    merchant: {}
})

export const mutations = {
  setMerchant( state, data ) {
    state.merchant = data
    // localStorage.setItem('merchantId', data._id)
  }
}

export const actions = {
    async setMerchant({ commit }) {
    const merchant = await restaurante()
    // console.log(merchant)
    commit('setMerchant', merchant)
  }
}
