import React, { useEffect } from "react";
import { useState } from "react";
import {
  TableContainer,
  TableHead,
  TableBody,
  TableColumnSmall,
  TableColumnMiddle,
  TableColumnBig,
  TableRow,
  TableIcons,
} from "./styles";
import { Typography } from "@mui/material";
import { ReactComponent as OrderUpIcon } from "../../assets/orderUp.svg";
import { ReactComponent as OrderDownIcon } from "../../assets/orderDown.svg";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import DeleteConfirm from "../../components/DeleteConfirm";
import { formatDate, formartDay, formatMoney } from "../../utils/formaters";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import { loadTransactions } from "../../utils/requisitions";

export default function BasicTable({
  transactions,
  setTransactions,
  setOpenEditModal,
  setcurrentTransactEdit,
}) {
  const [order, setOrder] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [currentTransact, setCurrentTransact] = useState(null);
  const [orderedTransactios, setOrderedTransactions] = useState([]);
  const token = getItem("token");

  function handleOpenEditModal(transact) {
    setOpenEditModal(true);
    setcurrentTransactEdit(transact);
  }

  function handleOpenDeleteModal(transact) {
    setCurrentTransact(transact);
    setOpenConfirm(!openConfirm);
  }

  async function handleDeleteItem() {
    try {
      await api.delete(`/transacoes/${currentTransact.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allTransactions = await loadTransactions();

      setTransactions([...allTransactions]);
    } catch (error) {
      console.log(error.response);
    } finally {
      setOpenConfirm(false);
    }
  }

  useEffect(() => {
    const allTransactions = [...transactions];

    if (order) {
      allTransactions.sort((a, b) => new Date(a.data) - new Date(b.data));
      setOrderedTransactions([...allTransactions]);
      return;
    }

    allTransactions.sort((a, b) => new Date(b.data) - new Date(a.data));
    setOrderedTransactions([...allTransactions]);
  }, [order, transactions]);

  return (
    <TableContainer>
      <TableHead>
        <TableColumnSmall onClick={() => setOrder(!order)}>
          <Typography variant="body1">
            Data
            {order ? (
              <OrderUpIcon style={{ marginLeft: "5px" }} />
            ) : (
              <OrderDownIcon style={{ marginLeft: "5px" }} />
            )}
          </Typography>
        </TableColumnSmall>
        <TableColumnMiddle>
          <Typography variant="body1">Dia da semana</Typography>
        </TableColumnMiddle>
        <TableColumnBig>
          <Typography variant="body1">Descrição</Typography>
        </TableColumnBig>
        <TableColumnSmall>
          <Typography variant="body1">Categoria</Typography>
        </TableColumnSmall>
        <TableColumnSmall>
          <Typography variant="body1">Valor</Typography>
        </TableColumnSmall>
        <TableColumnSmall></TableColumnSmall>
      </TableHead>

      <TableBody>
        {orderedTransactios.map((transact) => (
          <TableRow key={transact.id}>
            <TableColumnSmall>
              <Typography>{formatDate(transact.data)}</Typography>
            </TableColumnSmall>
            <TableColumnMiddle>
              <Typography variant="body2">
                {formartDay(transact.data)}
              </Typography>
            </TableColumnMiddle>
            <TableColumnBig>
              <Typography variant="body2">{transact.descricao}</Typography>
            </TableColumnBig>
            <TableColumnSmall>
              <Typography variant="body2">{transact.categoria_nome}</Typography>
            </TableColumnSmall>
            <TableColumnSmall>
              <Typography
                variant="body1"
                sx={
                  transact.tipo === "entrada"
                    ? { color: "#7B61FF" }
                    : { color: "#FA8C10" }
                }
              >
                {formatMoney(transact.valor)}
              </Typography>
            </TableColumnSmall>
            <TableColumnSmall>
              <TableIcons>
                <EditIcon onClick={() => handleOpenEditModal(transact)} />
                <DeleteIcon onClick={() => handleOpenDeleteModal(transact)} />
              </TableIcons>
            </TableColumnSmall>
            <DeleteConfirm
              open={openConfirm && transact.id === currentTransact.id}
              hanleClose={() => setOpenConfirm(false)}
              handleConfirm={handleDeleteItem}
            />
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
