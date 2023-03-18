import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ContainerFilter,
  ContainerFilterContent,
  FilterContent,
  ButtonContainer,
  FilterButton,
  ClearFilterButton,
  ApplyFilterButton,
} from "./styles";
import Chip from "../../components/Chip";
import { ReactComponent as FilterIcon } from "../../assets/filter.svg";
import { loadCategories, loadTransactions } from "../../utils/requisitions";

export default function Filter({ transactions, setTransactions }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  async function clearFilters() {
    const allCategories = [...categories];

    allCategories.forEach((categ) => (categ.checked = false));

    setCategories([...allCategories]);

    const allTransactions = await loadTransactions();

    setTransactions([...allTransactions]);
  }

  async function applyFilters() {
    const allTransactions = await loadTransactions();
    setTransactions([...allTransactions]);

    const selectedCategoriesId = [];

    categories.forEach((categ) => {
      if (categ.checked) {
        selectedCategoriesId.push(categ.id);
      }
    });


    if (!selectedCategoriesId.length) {
      return;
    }

    const filteredTransactions = allTransactions.filter((transact) =>
      selectedCategoriesId.includes(transact.categoria_id)
    );

    setTransactions([...filteredTransactions]);
    console.log(filteredTransactions);
  }

  useEffect(() => {
    async function getAllCategories() {
      const allCategories = await loadCategories();

      allCategories.forEach((categ) => {
        categ.checked = false;
      });

      setCategories([...allCategories]);
    }

    if (open) {
      getAllCategories();
    }
  }, [open]);

  return (
    <ContainerFilter>
      <FilterButton onClick={() => setOpen(!open)}>
        <FilterIcon />
        Filtrar
      </FilterButton>
      {open && (
        <ContainerFilterContent>
          <Typography>Categoria</Typography>
          <FilterContent>
            {categories.map((categ) => (
              <Chip
                key={categ.id}
                title={categ.descricao}
                checked={categ.checked}
                id={categ.id}
                categories={categories}
                setCategories={setCategories}
              />
            ))}
          </FilterContent>
          <ButtonContainer>
            <ClearFilterButton onClick={clearFilters}>
              Limpar Filtros
            </ClearFilterButton>
            <ApplyFilterButton onClick={applyFilters}>
              Adicionar Filtros
            </ApplyFilterButton>
          </ButtonContainer>
        </ContainerFilterContent>
      )}
    </ContainerFilter>
  );
}
