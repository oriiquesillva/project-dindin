import { Typography } from "@mui/material";
import {
  DeleteConfirmContainer,
  DeleteConfirmButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./styles";

export default function DeleteConfirm({ open, handleConfirm, hanleClose }) {
  return (
    <>
      {open === true && (
        <DeleteConfirmContainer>
          <Typography>Apagar esse item?</Typography>
          <DeleteConfirmButtonContainer>
            <ConfirmButton onClick={handleConfirm}>SIM</ConfirmButton>
            <CancelButton onClick={hanleClose}>NÃO</CancelButton>
          </DeleteConfirmButtonContainer>
        </DeleteConfirmContainer>
      )}
    </>
  );
}
