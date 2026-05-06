import { useEffect, useState, type FormEvent } from "react";
import {
  criarEntrada,
  listarEntradas,
  deletarEntrada,
  atualizarEntrada,
} from "../services/entradasService";
import {
  novoGasto,
  listarGastos,
  deletarGasto,
  atualizarGasto,
} from "../services/gastosService";
import type {
  CategoriaEntradas,
  criarEntradas,
  Entradas,
} from "../types/Entradas";
import type { categoria, criarGastos, Gastos } from "../types/Gastos";
import DashboardGeral from "../pages/DashbordGeral";

export default function PainelFinanceiro() {
  const [descricaoEntrada, setDescricaoEntrada] = useState("");
  const [valorEntrada, setValorEntrada] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [categoriaEntrada, setCategoriaEntrada] =
    useState<CategoriaEntradas>("SALARIO");

  const [entradas, setEntradas] = useState<Entradas[]>([]);
  const [entradaEditando, setEntradaEditando] = useState<Entradas | null>(null);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setcategoria] = useState<categoria>("ALIMENTACAO");

  const [gastos, setGastos] = useState<Gastos[]>([]);
  const [gastoEditando, setGastoEditando] = useState<Gastos | null>(null);

  const carregarEntradas = async () => {
    try {
      const data = await listarEntradas();
      setEntradas(data);
    } catch (error) {
      console.error("ERRO AO CARREGAR ENTRADAS:", error);
    }
  };

  const carregarGastos = async () => {
    try {
      const data = await listarGastos();
      setGastos(data);
    } catch (error) {
      console.error("ERRO AO CARREGAR GASTOS:", error);
    }
  };

  const carregarDados = async () => {
    await Promise.all([carregarEntradas(), carregarGastos()]);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const limparFormularioEntrada = () => {
    setDescricaoEntrada("");
    setValorEntrada("");
    setDataEntrada("");
    setCategoriaEntrada("SALARIO");
    setEntradaEditando(null);
  };

  const limparFormularioGasto = () => {
    setDescricao("");
    setValor("");
    setData("");
    setcategoria("ALIMENTACAO");
    setGastoEditando(null);
  };

  const criarPayloadEntrada = (): criarEntradas => ({
    descricaoEntrada,
    valorEntrada: Number(valorEntrada),
    dataEntrada,
    categoriaEntrada,
  });

  const criarPayloadGasto = (): criarGastos => ({
    descricao,
    valor: Number(valor),
    data,
    categoria,
  });

  const handleDeleteEntrada = async (id: number) => {
    const confirmar = window.confirm("DESEJA EXCLUIR ESSA ENTRADA?");
    if (!confirmar) return;

    try {
      await deletarEntrada(id);
      await carregarEntradas();
    } catch (error) {
      console.error("ERRO AO DELETAR:", error);
    }
  };

  const handleDeleteGasto = async (id: number) => {
    const confirmar = window.confirm("DESEJA EXCLUIR ESSE GASTO?");
    if (!confirmar) return;

    try {
      await deletarGasto(id);
      await carregarGastos();
    } catch (error) {
      console.error("ERRO AO DELETAR GASTO:", error);
    }
  };

  const handleEditarEntrada = (entrada: Entradas) => {
    setEntradaEditando(entrada);
    setDescricaoEntrada(entrada.descricaoEntrada);
    setValorEntrada(String(entrada.valorEntrada));
    setDataEntrada(entrada.dataEntrada);
    setCategoriaEntrada(entrada.categoriaEntrada);
  };

  const handleEditarGasto = (gasto: Gastos) => {
    setGastoEditando(gasto);
    setDescricao(gasto.descricao);
    setValor(String(gasto.valor));
    setData(gasto.data);
    setcategoria(gasto.categoria);
  };

  const handleSubmitEntrada = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await criarEntrada(criarPayloadEntrada());
      await carregarEntradas();
      limparFormularioEntrada();
    } catch (error) {
      console.error("ERRO AO CRIAR ENTRADA:", error);
    }
  };

  const handleSubmitGasto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await novoGasto(criarPayloadGasto());
      await carregarGastos();
      limparFormularioGasto();
    } catch (error) {
      console.error("ERRO AO CRIAR GASTO:", error);
    }
  };

  const handleAtualizarEntrada = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!entradaEditando?.id) return;

    try {
      await atualizarEntrada(entradaEditando.id, criarPayloadEntrada());
      await carregarEntradas();
      limparFormularioEntrada();
    } catch (error) {
      console.error("ERRO AO ATUALIZAR:", error);
    }
  };

  const handleAtualizarGasto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!gastoEditando?.id) return;

    try {
      await atualizarGasto(gastoEditando.id, criarPayloadGasto());
      await carregarGastos();
      limparFormularioGasto();
    } catch (error) {
      console.error("ERRO AO ATUALIZAR GASTO:", error);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "30px" }}>
        <DashboardGeral gastos={gastos} entradas={entradas} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "20px",
          alignItems: "start",
        }}
      >
        <main className="dashboard-container">
          <h1 className="dashboard-title">Painel de controle de entradas</h1>

          <section className="top-grid">
            <div className="card form-card">
              <h2>{entradaEditando ? "Editar Entrada" : "Nova Entrada"}</h2>

              <form
                className="entrada-form"
                onSubmit={
                  entradaEditando
                    ? handleAtualizarEntrada
                    : handleSubmitEntrada
                }
              >
                <input
                  type="text"
                  value={descricaoEntrada}
                  onChange={(e) => setDescricaoEntrada(e.target.value)}
                  placeholder="Descrição"
                  required
                />

                <input
                  type="number"
                  value={valorEntrada}
                  onChange={(e) => setValorEntrada(e.target.value)}
                  placeholder="Valor"
                  required
                />

                <input
                  type="date"
                  value={dataEntrada}
                  onChange={(e) => setDataEntrada(e.target.value)}
                  required
                />

                <select
                  value={categoriaEntrada}
                  onChange={(e) =>
                    setCategoriaEntrada(e.target.value as CategoriaEntradas)
                  }
                >
                  <option value="SALARIO">SALÁRIO</option>
                  <option value="PERSONAL">PERSONAL</option>
                  <option value="VENDAS">VENDAS</option>
                  <option value="OUTROS">OUTROS</option>
                </select>

                <div className="form-buttons">
                  <button type="submit">
                    {entradaEditando ? "Atualizar" : "Cadastrar"}
                  </button>

                  {entradaEditando && (
                    <button type="button" onClick={limparFormularioEntrada}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          <section className="card lista-card">
            <h2>Lista de entradas</h2>

            {entradas.length === 0 ? (
              <p className="empty-text">Nenhuma entrada encontrada.</p>
            ) : (
              <div className="lista-entradas">
                {entradas.map((entrada) => (
                  <div key={entrada.id} className="entrada-item">
                    <div>
                      <strong>{entrada.descricaoEntrada}</strong>
                      <p>Valor: R$ {Number(entrada.valorEntrada).toFixed(2)}</p>
                      <p>Data: {entrada.dataEntrada}</p>
                      <p>Categoria: {entrada.categoriaEntrada}</p>
                    </div>

                    <div className="entrada-acoes">
                      <button
                        type="button"
                        onClick={() => handleEditarEntrada(entrada)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEntrada(entrada.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        <main className="dashboard-container">
          <h1 className="dashboard-title">Painel de controle de gastos</h1>

          <section className="top-grid">
            <div className="card form-card">
              <h2>{gastoEditando ? "Editar Gasto" : "Novo Gasto"}</h2>

              <form
                className="gasto-form"
                onSubmit={
                  gastoEditando ? handleAtualizarGasto : handleSubmitGasto
                }
              >
                <input
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição"
                  required
                />

                <input
                  type="number"
                  step="0.01"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Valor"
                  required
                />

                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />

                <select
                  value={categoria}
                  onChange={(e) => setcategoria(e.target.value as categoria)}
                >
                  <option value="ALIMENTACAO">ALIMENTAÇÃO</option>
                  <option value="TRANSPORTE">TRANSPORTE</option>
                  <option value="MORADIA">MORADIA</option>
                  <option value="CONTAS">CONTAS</option>
                  <option value="LAZER">LAZER</option>
                  <option value="SAUDE">SAÚDE</option>
                  <option value="EDUCACAO">EDUCAÇÃO</option>
                  <option value="INVESTIMENTO">INVESTIMENTO</option>
                  <option value="COMPRAS">COMPRAS</option>
                  <option value="OUTROS">OUTROS</option>
                </select>

                <div className="form-buttons">
                  <button type="submit">
                    {gastoEditando ? "Atualizar" : "Cadastrar"}
                  </button>

                  {gastoEditando && (
                    <button type="button" onClick={limparFormularioGasto}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          <section className="card lista-card">
            <h2>Lista de gastos</h2>

            {gastos.length === 0 ? (
              <p className="empty-text">Nenhum gasto encontrado.</p>
            ) : (
              <div className="lista-gastos">
                {gastos.map((gasto) => (
                  <div key={gasto.id} className="gasto-item">
                    <div>
                      <strong>{gasto.descricao}</strong>
                      <p>Valor: R$ {Number(gasto.valor).toFixed(2)}</p>
                      <p>Data: {gasto.data}</p>
                      <p>Categoria: {gasto.categoria}</p>
                    </div>

                    <div className="gasto-acoes">
                      <button
                        type="button"
                        onClick={() => handleEditarGasto(gasto)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGasto(gasto.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}