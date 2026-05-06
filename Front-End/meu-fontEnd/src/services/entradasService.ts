import { financeApi } from "./api"
import type { criarEntradas, Entradas } from "../types/Entradas"

// BUSCA TODAS AS ENTRADAS DO USUÁRIO LOGADO
export const listarEntradas = async (): Promise<Entradas[]> => {
    const response = await financeApi.get("/entradas")
    return response.data
}

// CRIA NOVA ENTRADA
export const criarEntrada = async (dados: criarEntradas): Promise<Entradas> => {
    const response = await financeApi.post("/entradas", dados)
    return response.data
}

// DELETA ENTRADA
export const deletarEntrada = async (id: number): Promise<void> => {
    await financeApi.delete(`/entradas/${id}`)
}

// ATUALIZA ENTRADA
export const atualizarEntrada = async (
    id: number,
    dados: criarEntradas
): Promise<Entradas> => {
    const response = await financeApi.put(`/entradas/${id}`, dados)
    return response.data
}