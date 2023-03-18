import { Typography } from "@mui/material";
import {
  PageBackdrop,
  ModalContainer,
  ModalClose,
  ModalTitle,
  CustomInputArea,
  CustomInputLabel,
  CustomOutlinedInput,
} from "./styles";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import MainButton from "../../components/MainButton";
import api from "../../services/api";
import { getItem, setItem } from "../../utils/storage";
import { useEffect, useState } from "react";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function ProfileModal({ open, handleClose }) {
  const token = getItem("token");
  const [form, setForm] = useState({ ...defaultForm });

  function handleForm({target}) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return;
    }

    if (form.password !== form.confirmPassword) {
      return;
    }
    try {
      await api.put("/usuario",
        {
          nome: form.name,
          email: form.email,
          senha: form.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItem("UserName", form.name)
      handleClose();
      setForm({...defaultForm});
    } catch (error) {
      alert(error.response.data.mensagem);
    }
  }

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get("/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { nome, email } = response.data;

        setForm({
          name: nome,
          email: email,
          password: "",
          confirmaPassword: "",
        });
      } catch (error) {
        console.log(error.response);
      }
    }

    if (open) {
      loadProfile();
    }
  }, [open]);

  return (
    <>
      {open && (
        <PageBackdrop>
          <ModalContainer component="form" onSubmit={handleSubmit}>
            <ModalClose onClick={handleClose}>
              <CloseIcon />
            </ModalClose>
            <ModalTitle>
              <Typography variant="title2">Editar Perfil</Typography>
            </ModalTitle>
            <CustomInputArea>
              <CustomInputLabel>Nome</CustomInputLabel>
              <CustomOutlinedInput
                name="name"
                type="text"
                value={form.name || ""}
                onChange={handleForm}
                placeholder="Digite seu nome"
                required
              />
            </CustomInputArea>
            <CustomInputArea>
              <CustomInputLabel>Email</CustomInputLabel>
              <CustomOutlinedInput
                name="email"
                type="text"
                value={form.email || ""}
                onChange={handleForm}
                placeholder="Digite seu email"
                required
              />
            </CustomInputArea>
            <CustomInputArea>
              <CustomInputLabel>Senha</CustomInputLabel>
              <CustomOutlinedInput
                name="password"
                type="password"
                value={form.password || ""}
                onChange={handleForm}
                placeholder="Digite sua senha"
                required
              />
            </CustomInputArea>
            <CustomInputArea sx={{ marginBottom: "20px" }}>
              <CustomInputLabel>Confirmação de Senha</CustomInputLabel>
              <CustomOutlinedInput
                name="confirmPassword"
                type="password"
                value={form.confirmPassword || ""}
                onChange={handleForm}
                placeholder="Repita sua senha"
                required
              />
            </CustomInputArea>
            <MainButton width="236px" height="46px" type="submit">
              Confirmar
            </MainButton>
          </ModalContainer>
        </PageBackdrop>
      )}
    </>
  );
}
