import { Typography } from "@mui/material";
import { ChipContainer } from "./styles";


export default function Chip({id, categories, setCategories, title, checked }) {

  function handleSelectCategorie() {
    const allCategories = [...categories]

    allCategories.forEach((categ) => {
      if (categ.id === id) {
        categ.checked = !categ.checked
      }
    });

    setCategories([...allCategories])

  }


  return (
    <ChipContainer
      onClick={handleSelectCategorie}
      sx={
        checked
          ? { backgroundColor: "#7978D9", color: "#FFFFFF" }
          : { backgroundColor: "#FAFAFA", color: "#000000" }
      }
    >
      <Typography noWrap variant="body3">{title}</Typography>
      {checked ? (
        <Typography  variant="body3">x</Typography>
      ) : (
        <Typography  variant="body3">+</Typography>
      )}
    </ChipContainer>
  );
}
