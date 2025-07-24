import axios from 'axios'

const SWEET_API_URL = process.env.SWEET_API_URL
const USER_ID = process.env.USER_ID

export const restaurante = async () => {
  try {
    const respuesta = await axios.get(`${SWEET_API_URL}/merchant/${USER_ID}`)
    return respuesta.data
  } catch (error) {
    return error
  }
}

export const productos = async () => {
  try {
    const respuesta = await axios.get(`${SWEET_API_URL}/product/user/${USER_ID}`)
    // console.log(respuesta.data)
    return respuesta.data
  } catch (error) {
    return error
  }
}

export const sendOrder = async (data) => {
  try {
    const respuesta = await axios.post(`${SWEET_API_URL}/order/create`, data)
    return respuesta.data
  } catch (error) {
    return error
  }
}

export const getOrders = async (id) => {
  try {
    const respuesta = await axios.get(`${SWEET_API_URL}/order/${id}`)
    return respuesta.data
  } catch (error) {
    return error
  }
}

export const getOrderById = async (id) => {
  try {
    const respuesta = await axios.get(`${SWEET_API_URL}/order/user/${id}`)
    return respuesta.data
  } catch (error) {
    return error
  }
}

export const paypal = async (data) => {
  try {
    const respuesta = await axios.post(`${SWEET_API_URL}/payment/create-order`, data)
    return respuesta.data
  } catch (error) {
    return error
  }
}

export const sendComment = async (payload) => {
  try {
    const respuesta = await axios.post(`${SWEET_API_URL}/order/contact`, payload)
    return respuesta
  } catch (error) {
    return error
  }
}

export const checkOrder = async (id, check) => {
  try {
    const respuesta = await axios.post(`${SWEET_API_URL}/payment/check/${id}`, check)
    return respuesta.data
  } catch (error) {
    return error
  }
}

export const editOrder = async (data) => {
  try {
    const respuesta = await axios.put(`${SWEET_API_URL}/order/${data.id}`, data)
    return respuesta.data
  } catch (error) {
    return error
  }
}