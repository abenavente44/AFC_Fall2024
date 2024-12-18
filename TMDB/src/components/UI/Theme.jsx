import * as React from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    salmon: {
      light: "#FF7F50", 
      main: "#FF5733", 
      dark: "#C43E28", 
      contrastText: "#fff",
    },
  },
});

// UsingAugmentColor component to display colors
export const UsingAugmentColor = () => {
  const theme = useTheme(); 

  return (
    <Stack sx={{ gap: 2, alignItems: "center" }}>
      <Button variant="contained" color="salmon">
        Salmon Button
      </Button>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="body2">Light</Typography>
          <Box
            sx={{ bgcolor: theme.palette.salmon.light, width: 40, height: 20 }}
          />
        </Stack>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="body2">Main</Typography>
          <Box
            sx={{ bgcolor: theme.palette.salmon.main, width: 40, height: 20 }}
          />
        </Stack>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="body2">Dark</Typography>
          <Box
            sx={{ bgcolor: theme.palette.salmon.dark, width: 40, height: 20 }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default theme;
