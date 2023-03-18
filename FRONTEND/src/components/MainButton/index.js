import { MainButton } from "./styles";

function Button({ width, height, children, type, onClick,}) {
  return (
    <MainButton sx={{width, height}} type={type} onClick={onClick}> 
      {children}
    </MainButton>
  );
}

export default Button;