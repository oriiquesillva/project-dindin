import {
  SignUpContainer,
  SignUpContentContainer,
  CustomInputArea,
  CustomInputLabel,
  CustomOutlinedInput,
} from "./styles";
import { Typography } from "@mui/material";
import MainButton from "../MainButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [form, setForm] = useState({ ...defaultForm });
  const navigate = useNavigate();

  function handleForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("As senhas digitadas não coincidem");
      return;
    }

    try {
      await api.post("/usuario", {
        nome: form.name,
        email: form.email,
        senha: form.password,
      });
      navigate("/");
    } catch (error) {
      alert(error.response.data.mensagem);
    }
  }

  return (
    <SignUpContainer>
      <SignUpContentContainer component="form" onSubmit={handleSubmit}>
        <Typography
          variant="title2"
          sx={{ marginBottom: "32px", marginTop: "40px", color: "#7978D9" }}
        >
          Cadastre-se
        </Typography>

        <CustomInputArea sx={{ marginBottom: "31px" }}>
          <CustomInputLabel>Nome</CustomInputLabel>
          <CustomOutlinedInput
            name="name"
            type="text"
            value={form.name || ""}
            onChange={handleForm}
            placeholder="Digite seu nome"
          />
        </CustomInputArea>

        <CustomInputArea sx={{ marginBottom: "31px" }}>
          <CustomInputLabel>E-mail</CustomInputLabel>
          <CustomOutlinedInput
            name="email"
            type="text"
            value={form.email || ""}
            onChange={handleForm}
            placeholder="Digite seu email"
          />
        </CustomInputArea>

        <CustomInputArea sx={{ marginBottom: "31px" }}>
          <CustomInputLabel>Senha</CustomInputLabel>
          <CustomOutlinedInput
            name="password"
            type="password"
            value={form.password || ""}
            onChange={handleForm}
            placeholder="Digite sua senha"
          />
        </CustomInputArea>

        <CustomInputArea sx={{ marginBottom: "38px" }}>
          <CustomInputLabel>Confirmação de senha</CustomInputLabel>
          <CustomOutlinedInput
            name="confirmPassword"
            type="password"
            value={form.confirmPassword || ""}
            onChange={handleForm}
            placeholder="Repita sua senha"
          />
        </CustomInputArea>

        <MainButton width="449px" height="52px" type="submit">
          Cadastrar
        </MainButton>
        <Typography variant="body1" sx={{ marginTop: "8px", marginBottom: "40px", }}>
          <Link style={{color: "#7B61FF"}} to="/">Já tem cadastro? Clique aqui!</Link>
        </Typography>
      </SignUpContentContainer>
    </SignUpContainer>
  );
}
