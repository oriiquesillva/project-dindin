import {
  SignInLoginSectionContainer,
  SignInLoginSectionContentContainer,
  CustomInputArea,
  CustomInputLabel,
  CustomOutlinedInput,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getItem, setItem } from "../../utils/storage"
import { Typography } from "@mui/material";
import MainButton from "../MainButton";


export default function SignInLoginSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = getItem("token")
    if (token) {
      navigate("/home")
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!email || !password) {
        alert("Todos os campos são obrigatórios")
        return;
      }

      const response = await api.post("/login", {
        email,
        senha: password,
      });
      const {usuario, token} = response.data

      setItem("token", token)
      setItem("UserId", usuario.id)
      setItem("UserName", usuario.nome)

      navigate("/home");
    } catch (error) {
      alert(error.response.data.mensagem);
    }
  }

  return (
    <SignInLoginSectionContainer>
      <SignInLoginSectionContentContainer
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          sx={{ marginBottom: "48px", color: "#7978D9" }}
          variant="title2"
        >
          Login
        </Typography>
        <CustomInputArea sx={{ marginBottom: "31px" }}>
          <CustomInputLabel>E-mail</CustomInputLabel>
          <CustomOutlinedInput
            placeholder="Digite seu email"
            type="email"
            value={email}
            onChange={(e) => [setEmail(e.target.value)]}
          />
        </CustomInputArea>

        <CustomInputArea sx={{ marginBottom: "50px" }}>
          <CustomInputLabel>Senha</CustomInputLabel>
          <CustomOutlinedInput
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => [setPassword(e.target.value)]}
          />
        </CustomInputArea>
        <MainButton width="449px" height="52px" type="submit">
          Entrar
        </MainButton>
      </SignInLoginSectionContentContainer>
    </SignInLoginSectionContainer>
  );
}
