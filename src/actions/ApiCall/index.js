import axios from 'axios'
import { API_ROOT } from 'utilities/contants'

export const fetchBoardDetails = async boardId => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return request.data
}

export const createNewColumn = async data => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, data)
  return request.data
}

//update or remove column
export const updateColumn = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data)
  return request.data
}

export const createNewCard = async data => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, data)
  return request.data
}
