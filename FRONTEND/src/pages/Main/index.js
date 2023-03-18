import {
  MainPageContainer,
  MainPageContentContainer,
  MainPageContent,
  MainPageData,
  MainPageLeft,
  ContainerResume,
} from "./styles";
import Header from "../../components/Header";
import Table from "../../components/Table";
import Resume from "../../components/Resume";
import MainButton from "../../components/MainButton";
import ProfileModal from "../../components/ProfileModal";
import { useEffect, useState } from "react";
import AddTransactionModal from "../../components/AddTransactionModal";
import EditTransactionModal from "../../components/EditTransactionModal";
import Filter from "../../components/Filter";
import { loadTransactions } from "../../utils/requisitions";

export default function Main() {
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalAddTransaction, setOpenModalAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTransactEdit, setcurrentTransactEdit] = useState(null);

  useEffect(() => {
    async function getAllTransactions() {
      const allTransactions = await loadTransactions();

      setTransactions([...allTransactions]);
    }

    getAllTransactions();
  }, []);

  return (
    <MainPageContainer>
      <Header handleEditProfile={() => setOpenModalProfile(true)} />
      <MainPageContentContainer>
        <MainPageContent>
          <MainPageData>
            <MainPageLeft>
              <Filter
                transactions={transactions}
                setTransactions={setTransactions}
              />
              <Table
                transactions={transactions}
                setTransactions={setTransactions}
                setOpenEditModal={setOpenEditModal}
                setcurrentTransactEdit={setcurrentTransactEdit}
              />
            </MainPageLeft>
            <ContainerResume>
              <Resume transactions={transactions} />
              <MainButton
                width="260px"
                height="46px"
                onClick={() => setOpenModalAddTransaction(true)}
              >
                Adicionar Registro
              </MainButton>
            </ContainerResume>
          </MainPageData>
        </MainPageContent>
      </MainPageContentContainer>
      <AddTransactionModal
        open={openModalAddTransaction}
        handleClose={() => setOpenModalAddTransaction(false)}
        setTransactions={setTransactions}
      />
      <EditTransactionModal
        open={openEditModal}
        setTransactions={setTransactions}
        currentTransactEdit={currentTransactEdit}
        handleClose={() => setOpenEditModal(false)}
      />
      <ProfileModal
        open={openModalProfile}
        handleClose={() => setOpenModalProfile(false)}
      />
    </MainPageContainer>
  );
}
