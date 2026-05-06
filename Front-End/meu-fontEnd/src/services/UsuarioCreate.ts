import { authApi } from "./api"
import type {
  UsuarioRequest,
  UsuarioResponse,
  LoginRequest,
  LoginResponse,
} from "../types/Usuario"

const BASE_URL = "/usuario"

// CRIAR USUÁRIO
export const criarUsuario = async (
  dados: UsuarioRequest
): Promise<LoginResponse> => {
  const { data } = await authApi.post(BASE_URL, dados)

  // 🔥 já salva token automaticamente (melhoria importante)
  if (data.token) {
    localStorage.setItem("token", data.token)
  }

  return data
}

// LOGIN
export const loginUsuario = async (
  dados: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await authApi.post(`${BASE_URL}/login`, dados)

  // 🔐 salva token
  if (data.token) {
    localStorage.setItem("token", data.token)
  }

  return data
}

// LISTAR USUÁRIOS
export const listarUsuarios = async (): Promise<UsuarioResponse[]> => {
  const { data } = await authApi.get(BASE_URL)
  return data
}

// BUSCAR MINHA CONTA
export const buscarMinhaConta = async (): Promise<UsuarioResponse> => {
  const { data } = await authApi.get(`${BASE_URL}/me`)
  return data
}

// ATUALIZAR MINHA CONTA
export const atualizarMinhaConta = async (
  dados: UsuarioRequest
): Promise<UsuarioResponse> => {
  const { data } = await authApi.put(`${BASE_URL}/me`, dados)
  return data
}

// ATUALIZAR USUÁRIO (admin ou futuro uso)
export const atualizarUsuario = async (
  id: number,
  dados: UsuarioRequest
): Promise<UsuarioResponse> => {
  const { data } = await authApi.put(`${BASE_URL}/${id}`, dados)
  return data
}

// DELETAR USUÁRIO
export const deletarUsuario = async (id: number): Promise<void> => {
  await authApi.delete(`${BASE_URL}/${id}`)
}