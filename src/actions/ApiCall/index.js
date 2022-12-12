import axios from 'axios'
import { API_ROOT } from 'utilities/contants'

export const fetchBoardDetails = async boardId => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  console.log(request)
  return request.data
}
