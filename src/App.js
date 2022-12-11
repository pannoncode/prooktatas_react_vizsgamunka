import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/UI/Header/Header";
import theme from "./Components/Theme/Theme";

import { ThemeProvider } from "@mui/material/styles";

import HomePage from "./pages/HomePage";
import CenterlineList from "./pages/CenterlineList";
import CreateCenterlineLists from "./pages/CreateCenterlineLists";
import CreateCenterlineType from "./pages/CreateCenterlineType";
import CreateMachineNumber from "./pages/CreateMachineNumber";
import CenterlineDifferent from "./pages/CenterlineDifferent";
import Footer from "./Components/UI/Footer/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="createMachineNumber"
            element={<CreateMachineNumber />}
          />
          <Route
            exact
            path="createCenterlineType"
            element={<CreateCenterlineType />}
          />
          <Route
            exact
            path="createCenterlineList"
            element={<CreateCenterlineLists />}
          />
          <Route exact path="/cllists" element={<CenterlineList />} />
          <Route exact path="/cldifferent" element={<CenterlineDifferent />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
