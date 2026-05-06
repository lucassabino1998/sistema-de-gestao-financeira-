import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
} from "recharts";
import type { Gastos } from "../types/Gastos";
import type { Entradas } from "../types/Entradas";

type Props = {
  gastos: Gastos[];
  entradas: Entradas[];
};

const COLORS_GASTOS = [
  "#ef4444",
  "#f87171",
  "#dc2626",
  "#fca5a5",
  "#b91c1c",
  "#fb7185",
  "#e11d48",
  "#f43f5e",
  "#fecaca",
  "#991b1b",
];

const COLORS_ENTRADAS = [
  "#2563eb",
  "#60a5fa",
  "#1d4ed8",
  "#93c5fd",
  "#3b82f6",
  "#38bdf8",
  "#0ea5e9",
  "#0284c7",
  "#bfdbfe",
  "#1e40af",
];

export default function DashboardGeral({ gastos, entradas }: Props) {
  const dadosGraficosGastos = [
    {
      categoria: "ALIMENTACAO",
      total: gastos
        .filter((g) => g.categoria === "ALIMENTACAO")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "TRANSPORTE",
      total: gastos
        .filter((g) => g.categoria === "TRANSPORTE")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "MORADIA",
      total: gastos
        .filter((g) => g.categoria === "MORADIA")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "CONTAS",
      total: gastos
        .filter((g) => g.categoria === "CONTAS")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "LAZER",
      total: gastos
        .filter((g) => g.categoria === "LAZER")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "SAUDE",
      total: gastos
        .filter((g) => g.categoria === "SAUDE")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "EDUCACAO",
      total: gastos
        .filter((g) => g.categoria === "EDUCACAO")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "INVESTIMENTO",
      total: gastos
        .filter((g) => g.categoria === "INVESTIMENTO")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "COMPRAS",
      total: gastos
        .filter((g) => g.categoria === "COMPRAS")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
    {
      categoria: "OUTROS",
      total: gastos
        .filter((g) => g.categoria === "OUTROS")
        .reduce((acc, g) => acc + Number(g.valor), 0),
    },
  ].filter((item) => item.total > 0);

  const totalGeralGastos = gastos.reduce((acc, g) => acc + Number(g.valor), 0);

  const dadosComPercentualGastos = dadosGraficosGastos.map((item) => ({
    ...item,
    percentual: totalGeralGastos > 0 ? (item.total / totalGeralGastos) * 100 : 0,
  }));

  const dadosGraficosEntradas = [
    {
      categoria: "SALARIO",
      total: entradas
        .filter((e) => e.categoriaEntrada === "SALARIO")
        .reduce((acc, e) => acc + Number(e.valorEntrada), 0),
    },
    {
      categoria: "PERSONAL",
      total: entradas
        .filter((e) => e.categoriaEntrada === "PERSONAL")
        .reduce((acc, e) => acc + Number(e.valorEntrada), 0),
    },
    {
      categoria: "VENDAS",
      total: entradas
        .filter((e) => e.categoriaEntrada === "VENDAS")
        .reduce((acc, e) => acc + Number(e.valorEntrada), 0),
    },
    {
      categoria: "OUTROS",
      total: entradas
        .filter((e) => e.categoriaEntrada === "OUTROS")
        .reduce((acc, e) => acc + Number(e.valorEntrada), 0),
    },
  ].filter((item) => item.total > 0);

  const totalGeralEntradas = entradas.reduce(
    (acc, e) => acc + Number(e.valorEntrada),
    0
  );

  const dadosComPercentualEntradas = dadosGraficosEntradas.map((item) => ({
    ...item,
    percentual:
      totalGeralEntradas > 0 ? (item.total / totalGeralEntradas) * 100 : 0,
  }));

  const dadosMensais = [
    { mes: "Jan", entradas: 0, gastos: 0 },
    { mes: "Fev", entradas: 0, gastos: 0 },
    { mes: "Mar", entradas: 0, gastos: 0 },
    { mes: "Abr", entradas: 0, gastos: 0 },
    { mes: "Mai", entradas: 0, gastos: 0 },
    { mes: "Jun", entradas: 0, gastos: 0 },
    { mes: "Jul", entradas: 0, gastos: 0 },
    { mes: "Ago", entradas: 0, gastos: 0 },
    { mes: "Set", entradas: 0, gastos: 0 },
    { mes: "Out", entradas: 0, gastos: 0 },
    { mes: "Nov", entradas: 0, gastos: 0 },
    { mes: "Dez", entradas: 0, gastos: 0 },
  ];

  entradas.forEach((e) => {
    const dataEntrada = new Date(e.dataEntrada);
    const mes = dataEntrada.getMonth();

    if (!isNaN(mes) && dadosMensais[mes]) {
      dadosMensais[mes].entradas += Number(e.valorEntrada);
    }
  });

  gastos.forEach((g) => {
    const dataGasto = new Date(g.data);
    const mes = dataGasto.getMonth();

    if (!isNaN(mes) && dadosMensais[mes]) {
      dadosMensais[mes].gastos += Number(g.valor);
    }
  });

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 style={{ marginBottom: "16px" }}>Dashboard Geral</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "16px",
            minHeight: "350px",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "12px" }}>
            Entradas por categoria
          </h3>

          <p style={{ marginBottom: "12px" }}>
            <strong>Total:</strong> R$ {totalGeralEntradas.toFixed(2)}
          </p>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosComPercentualEntradas}
                  dataKey="total"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={60}
                >
                  {dadosComPercentualEntradas.map((_, index) => (
                    <Cell
                      key={`entrada-${index}`}
                      fill={COLORS_ENTRADAS[index % COLORS_ENTRADAS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: any, name: any) => [
                    `R$ ${Number(value).toFixed(2)}`,
                    name,
                  ]}
                />

                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "16px",
            minHeight: "350px",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "12px" }}>
            Gastos por categoria
          </h3>

          <p style={{ marginBottom: "12px" }}>
            <strong>Total:</strong> R$ {totalGeralGastos.toFixed(2)}
          </p>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosComPercentualGastos}
                  dataKey="total"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={60}
                >
                  {dadosComPercentualGastos.map((_, index) => (
                    <Cell
                      key={`gasto-${index}`}
                      fill={COLORS_GASTOS[index % COLORS_GASTOS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: any, name: any) => [
                    `R$ ${Number(value).toFixed(2)}`,
                    name,
                  ]}
                />

                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: 360,
          marginTop: "24px",
          background: "#fff",
          borderRadius: "16px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "16px" }}>
          Entradas e gastos por mês
        </h3>

        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={dadosMensais}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip
              formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`}
            />
            <Legend />

            <Area
              type="monotone"
              dataKey="entradas"
              stroke="none"
              fill="#2563eb22"
            />
            <Area
              type="monotone"
              dataKey="gastos"
              stroke="none"
              fill="#ef444422"
            />

            <Line
              type="monotone"
              dataKey="entradas"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Entradas"
            />

            <Line
              type="monotone"
              dataKey="gastos"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Gastos"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}