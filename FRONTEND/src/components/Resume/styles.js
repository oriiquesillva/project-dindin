import { styled, Box, Divider } from "@mui/material";

export const ContainerResume = styled(Box)({
  width: "260px",
  minHeight: "196px",

  backgroundColor: "#FAFAFA",
  borderRadius: "10px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  marginBottom: "16px",
  padding: "24px 24px 32px 24px",

  boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.1)",
});

export const TitleResumeContainer = styled(Box)({
  width: "100%",

  display: "flex",
  alignItems: "left",

  marginBottom: "24px",
});

export const ContentResumeContainer = styled(Box)({
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  marginBottom: "10px",
});

export const ContentDivider = styled(Divider)({
  width: "100%",
  height: "1px",

  margin: "16px 0",

  backgroundColor: "#EAEAEA",
});
