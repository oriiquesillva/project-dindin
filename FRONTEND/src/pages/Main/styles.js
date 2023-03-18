import { styled, Box } from "@mui/material";

export const MainPageContainer = styled(Box)({
  minHeight: "100vh",
  width: "100vw",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  position: "relative",
});

export const MainPageContentContainer = styled(Box)({
  minHeight: "calc(100vh - 120px)",
  width: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  padding: "50px 50px 20px 50px",

  position: "absolute",
  top: "120px",

  backgroundColor: "#FFFFFF",
  borderRadius: "60px 60px 0 0",
});

export const MainPageContent = styled(Box)({
  width: "100%",
  maxWidth: "1500px",
});

export const MainPageData = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",

  marginTop: "26px",
  gap: "32px",
});

export const MainPageLeft = styled(Box)({
  width: "100%",

  display: "flex",
  flexDirection: "column",
});

export const ContainerResume = styled(Box)({
  width: "260px",

  display: "flex",
  flexDirection: "column",

  alignItems: "center",

  marginTop: "54px"
});
