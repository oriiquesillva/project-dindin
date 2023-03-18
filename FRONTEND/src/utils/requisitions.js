import api from "../services/api";
import { getItem } from "../utils/storage";


export async function loadCategories() {
  let token = ""
  token = getItem("token")
  
  try {
    const response = await api.get("/categorias", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const orderCategories = response.data.sort((a, b) => a - b);

    return orderCategories;
  } catch (error) {
    console.log(error.response);
  }
}

export async function loadTransactions() {
  let token = ""
  token = getItem("token")

  try {
    const response = await api.get("/transacoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}
