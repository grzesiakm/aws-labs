import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "react-query";

import { AppShell } from "./AppShell";
import { Homepage } from "./Homepage";

const queryClient = new QueryClient();

function YouTube() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "light",
            background: {
              default: "#F9F9F9",
            },
          },
          components: {
            MuiAppBar: {
              styleOverrides: {
                colorPrimary: {
                  backgroundColor: "#FFFFFF",
                },
              },
            },
          },
        })}
      >
        <CssBaseline />
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default YouTube;
