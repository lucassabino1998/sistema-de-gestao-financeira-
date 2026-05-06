import { financeApi } from "./api"
import type { criarGastos, Gastos } from "../types/Gastos"

// LISTAR GASTOS
export const listarGastos = async (): Promise<Gastos[]> => {
  const { data } = await financeApi.get("/gastos")
  return data
}

// CRIAR GASTO
export const novoGasto = async (dados: criarGastos): Promise<Gastos> => {
  const payload = {
    descricao: dados.descricao,
    valor: Number(dados.valor),
    data: dados.data,
    categoria: dados.categoria,
  }

  const { data } = await financeApi.post("/gastos", payload)
  return data
}

// DELETAR GASTO
export const deletarGasto = async (id: number): Promise<void> => {
  await financeApi.delete(`/gastos/${id}`)
}

// ATUALIZAR GASTO
export const atualizarGasto = async (
  id: number,
  dados: criarGastos
): Promise<Gastos> => {
  const payload = {
    descricao: dados.descricao,
    valor: Number(dados.valor),
    data: dados.data,
    categoria: dados.categoria,
  }

  const { data } = await financeApi.put(`/gastos/${id}`, payload)
  return data
}