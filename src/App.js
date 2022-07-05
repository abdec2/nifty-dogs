import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { light } from "./styles/Themes";

import Navigation from "./components/Navigation";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Roadmap from "./components/sections/Roadmap";
import Showcase from "./components/sections/Showcase";
import Team from "./components/sections/Team";
import Faq from "./components/sections/Faq";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Mint from "./components/sections/Mint";
import AlertBox from './components/AlertBox'

import { useState } from "react";


function App() {
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Navigation setError={setError} setErrMsg={setErrMsg} />
        <Home />
        <About />
        <Roadmap />
        <Mint />
        {/* <Showcase /> */}
        <Team />
        {/* <Faq /> */}
        <Footer />
        <ScrollToTop />
        {error && (<AlertBox msg={errMsg} setError={setError} setErrMsg={setErrMsg} />)}
      </ThemeProvider>
    </>
  );
}

export default App;
