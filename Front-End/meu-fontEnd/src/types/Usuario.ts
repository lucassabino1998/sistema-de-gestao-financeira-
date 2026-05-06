export interface UsuarioRequest {
  nome: string;
  email: string;
  password: string;
  ativo: boolean;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  perfil: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  nome: string;
  email: string;
  token: string;
}