import { Typography } from "@mui/material";
import {
  ContainerResume,
  TitleResumeContainer,
  ContentResumeContainer,
  ContentDivider,
} from "./styles";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formaters"

export default function Resume({ transactions }) {
  const token = getItem("token");

  const [extract, setExtract] = useState({
    in: 0,
    out: 0,
    balance: 0,
  });

  async function loadExtract() {
    try {
      const response = await api.get("/transacoes/extrato", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { entrada, saida } = response.data;

      setExtract({
        in: formatMoney(entrada),
        out: formatMoney(saida),
        balance: formatMoney(entrada - saida),
      });
    } catch (error) {
      alert(error.response.data.mensagem);
    }
  }

  useEffect(() => {
    loadExtract();
  },[transactions]);

  return (
    <ContainerResume>
      <TitleResumeContainer>
        <Typography variant="title4">Resumo</Typography>
      </TitleResumeContainer>
      <ContentResumeContainer>
        <Typography sx={{ color: "#2F2F2F" }} variant="title6">
          Entradas
        </Typography>
        <Typography sx={{ color: "#645FFB" }} variant="title6">
          {extract.in}
        </Typography>
      </ContentResumeContainer>
      <ContentResumeContainer>
        <Typography sx={{ color: "#2F2F2F" }} variant="title6">
          Saídas
        </Typography>
        <Typography sx={{ color: "#FA8C10" }} variant="title6">
          {extract.out}
        </Typography>
      </ContentResumeContainer>
      <ContentDivider />
      <ContentResumeContainer>
        <Typography sx={{ color: "#2F2F2F" }} variant="title5">
          Saldo
        </Typography>
        <Typography sx={{ color: "#3A9FF1" }} variant="title6">
          {extract.balance}
        </Typography>
      </ContentResumeContainer>
    </ContainerResume>
  );
}
