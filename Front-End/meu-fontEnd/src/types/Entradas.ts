export type CategoriaEntradas =
  | "SALARIO"
  | "PERSONAL"
  | "VENDAS"
  | "OUTROS";

export interface criarEntradas {
  descricaoEntrada: string;
  valorEntrada: number;
  dataEntrada: string;
  categoriaEntrada: CategoriaEntradas;
}

export interface Entradas {
  id: number;
  descricaoEntrada: string;
  valorEntrada: number;
  dataEntrada: string;
  categoriaEntrada: CategoriaEntradas;
}