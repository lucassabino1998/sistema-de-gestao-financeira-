export type categoria =
  | "ALIMENTACAO"
  | "TRANSPORTE"
  | "MORADIA"
  | "CONTAS"
  | "LAZER"
  | "SAUDE"
  | "EDUCACAO"
  | "INVESTIMENTO"
  | "COMPRAS"
  | "OUTROS";

export interface criarGastos {
  descricao: string;
  valor: number;
  data: string;
  categoria: categoria; // 🔥 maiúsculo
}

export interface Gastos {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: categoria; // 🔥 maiúsculo
}