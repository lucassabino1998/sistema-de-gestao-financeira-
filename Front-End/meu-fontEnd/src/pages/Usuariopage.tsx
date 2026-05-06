import { useState, type ChangeEvent, type FormEvent, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { criarUsuario, loginUsuario } from "../services/UsuarioCreate";

type CadastroForm = {
  nome: string;
  email: string;
  password: string;
  ativo: boolean;
};

type LoginForm = {
  email: string;
  senha: string;
};

export default function UsuarioPage() {
  const navigate = useNavigate();

  const [modo, setModo] = useState<"login" | "cadastro">("login");

  const [cadastroForm, setCadastroForm] = useState<CadastroForm>({
    nome: "",
    email: "",
    password: "",
    ativo: true,
  });

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function handleChangeCadastro(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked, type } = e.target;

    setCadastroForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleChangeLogin(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function trocarModo(novoModo: "login" | "cadastro") {
    setModo(novoModo);
    setErro("");
  }

  function salvarDadosUsuario(response: any) {
    const dados = response?.data || response;

    if (dados?.token) {
      localStorage.setItem("token", dados.token);
    }

    if (dados?.nome) {
      localStorage.setItem("usuarioNome", dados.nome);
    }

    if (dados?.email) {
      localStorage.setItem("usuarioEmail", dados.email);
    }
  }

  async function handleSubmitCadastro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (!cadastroForm.nome.trim()) return setErro("Nome é obrigatório");
    if (!cadastroForm.email.trim()) return setErro("Email é obrigatório");
    if (!cadastroForm.password.trim()) return setErro("Senha é obrigatória");
    if (cadastroForm.password.length < 6) {
      return setErro("Senha deve ter no mínimo 6 caracteres");
    }

    try {
      setLoading(true);

      const response = await criarUsuario(cadastroForm);

      salvarDadosUsuario(response);

      navigate("/geral");
    } catch (error: any) {
      const mensagem =
        error?.response?.data?.erro ||
        error?.response?.data?.message ||
        "Erro ao criar usuário";

      setErro(typeof mensagem === "string" ? mensagem : "Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (!loginForm.email.trim()) return setErro("Email é obrigatório");
    if (!loginForm.senha.trim()) return setErro("Senha é obrigatória");

    try {
      setLoading(true);

      const response = await loginUsuario(loginForm);

      salvarDadosUsuario(response);

      navigate("/geral");
    } catch (error: any) {
      const mensagem =
        error?.response?.data?.erro ||
        error?.response?.data?.message ||
        "Erro ao fazer login";

      setErro(typeof mensagem === "string" ? mensagem : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{modo === "login" ? "Entrar" : "Criar conta"}</h2>

        <div style={styles.tabs}>
          <button
            type="button"
            onClick={() => trocarModo("login")}
            style={{
              ...styles.tabButton,
              ...(modo === "login" ? styles.tabButtonActive : {}),
            }}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => trocarModo("cadastro")}
            style={{
              ...styles.tabButton,
              ...(modo === "cadastro" ? styles.tabButtonActive : {}),
            }}
          >
            Cadastro
          </button>
        </div>

        {modo === "login" ? (
          <form onSubmit={handleSubmitLogin} style={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={loginForm.email}
              onChange={handleChangeLogin}
              style={styles.input}
            />

            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={loginForm.senha}
              onChange={handleChangeLogin}
              style={styles.input}
            />

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitCadastro} style={styles.form}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={cadastroForm.nome}
              onChange={handleChangeCadastro}
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={cadastroForm.email}
              onChange={handleChangeCadastro}
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={cadastroForm.password}
              onChange={handleChangeCadastro}
              style={styles.input}
            />

            <label style={styles.checkbox}>
              <input
                type="checkbox"
                name="ativo"
                checked={cadastroForm.ativo}
                onChange={handleChangeCadastro}
              />
              Usuário ativo
            </label>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Salvando..." : "Criar usuário"}
            </button>
          </form>
        )}

        {erro && <p style={styles.error}>{erro}</p>}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tabButton: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
  },
  tabButtonActive: {
    border: "1px solid #2563eb",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};