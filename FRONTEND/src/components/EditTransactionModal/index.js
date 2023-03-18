import { Typography } from "@mui/material";
import {
  PageBackdrop,
  ModalContainer,
  ModalClose,
  ModalTitle,
  CustomInputArea,
  CustomInputLabel,
  CustomOutlinedInput,
  CustomSelectInput,
  CustomMenuItem,
  ModalButtons,
  ButtonIn,
  ButtonOut,
} from "./styles";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import MainButton from "../MainButton";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import { loadCategories, loadTransactions } from "../../utils/requisitions";
import { formatDate } from "../../utils/formaters"

const defaultForm = {
  value: "",
  category: {
    id: "",
    name: "",
  },
  date: "",
  description: "",
};

export default function EditTransactionModal({
  open,
  handleClose,
  setTransactions,
  currentTransactEdit,
}) {
  const token = getItem("token");
  const [option, setOption] = useState("out");
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ ...defaultForm });

  function handleChangeForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleChangeSelect(e) {
    const currentCategory = categories.find(
      (categ) => categ.descricao === e.target.value
    );

    if (!currentCategory) {
      return;
    }

    setForm({
      ...form,
      category: {
        id: currentCategory.id,
        name: currentCategory.descricao,
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const [day, month, year] = form.date.split("/");

    try {
      await api.put(
        `/transacoes/${currentTransactEdit.id}`,
        {
          tipo: option === "in" ? "entrada" : "saida",
          descricao: form.description,
          valor: form.value,
          data: new Date(`${year}-${month}-${day}`),
          categoria_id: form.category.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
      setForm({ ...defaultForm });

      const allTransactions = await loadTransactions();
      setTransactions([...allTransactions]);
    } catch (error) {
      alert(error.response.data.mensagem);
    }
  }

  useEffect(() => {
    async function getCategories() {
      const allcategories = await loadCategories();

      setCategories([...allcategories]);
    }

    getCategories();
  }, []);

  useEffect(() => {
    if (currentTransactEdit) {
      const {
        categoria_id,
        categoria_nome,
        data,
        descricao,
        tipo,
        valor,
      } = currentTransactEdit;

      setForm({
        value: valor,
        category:{
          id: categoria_id,
          name: categoria_nome
        },
        date: formatDate(data),
        description:descricao
      });

      setOption(tipo === "entrada" ? "in" : "out")
    }
  }, [currentTransactEdit]);

  return (
    <>
      {open && (
        <PageBackdrop>
          <ModalContainer component="form" onSubmit={handleSubmit}>
            <ModalClose onClick={handleClose}>
              <CloseIcon />
            </ModalClose>
            <ModalTitle>
              <Typography variant="title2">Editar Registro</Typography>
            </ModalTitle>
            <ModalButtons>
              <ButtonIn
                sx={
                  option === "out"
                    ? { backgroundColor: "#B9B9B9" }
                    : { backgroundColor: "#3A9FF1" }
                }
                onClick={() => setOption("in")}
              >
                Entrada
              </ButtonIn>
              <ButtonOut
                sx={
                  option === "out"
                    ? { backgroundColor: "#FF576B" }
                    : { backgroundColor: "#B9B9B9" }
                }
                onClick={() => setOption("out")}
              >
                Saída
              </ButtonOut>
            </ModalButtons>

            <CustomInputArea>
              <CustomInputLabel>Valor</CustomInputLabel>
              <CustomOutlinedInput
                name="value"
                type="number"
                value={form.value}
                onChange={handleChangeForm}
                required
              />
            </CustomInputArea>

            <CustomInputArea>
              <CustomInputLabel id="select-categoria">
                Categoria
              </CustomInputLabel>
              <CustomSelectInput
                id="select-categoria"
                name="category"
                value={form.category.name}
                onChange={handleChangeSelect}
                required
              >
                {categories.map((categ) => (
                  <CustomMenuItem key={categ.id} value={categ.descricao}>
                    {categ.descricao}
                  </CustomMenuItem>
                ))}
              </CustomSelectInput>
            </CustomInputArea>

            <CustomInputArea>
              <CustomInputLabel>Data</CustomInputLabel>
              <CustomOutlinedInput
                name="date"
                type="text"
                value={form.date}
                onChange={handleChangeForm}
                required
              />
            </CustomInputArea>

            <CustomInputArea sx={{ marginBottom: "20px" }}>
              <CustomInputLabel>Descrição</CustomInputLabel>
              <CustomOutlinedInput
                name="description"
                type="text"
                value={form.description}
                onChange={handleChangeForm}
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
