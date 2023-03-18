import {
  HeaderContainer,
  HeaderContentContainer,
  HeaderProfileContainer,
  HeaderProfileContent,
} from "./styles";
import { ReactComponent as LogoDindin } from "../../assets/logo.svg";
import { ReactComponent as ProfileImg } from "../../assets/profile.svg";
import { ReactComponent as LogoutImg } from "../../assets/logout.svg";
import { Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { clear, getItem } from "../../utils/storage";

export default function Header({ handleEditProfile }) {
  const navigate = useNavigate();
  const userName = getItem("UserName")

  function handleLogout() {
    clear();
    navigate("/");
  }
  return (
    <HeaderContainer>
      <HeaderContentContainer>
        <LogoDindin />
        <HeaderProfileContainer>
          <HeaderProfileContent>
            <ProfileImg onClick={handleEditProfile} />
            <Typography variant="subtitle" sx={{ color: "#FFFFFF" }}>
              {userName}
            </Typography>
            <LogoutImg onClick={handleLogout} />
          </HeaderProfileContent>
        </HeaderProfileContainer>
      </HeaderContentContainer>
    </HeaderContainer>
  );
}
