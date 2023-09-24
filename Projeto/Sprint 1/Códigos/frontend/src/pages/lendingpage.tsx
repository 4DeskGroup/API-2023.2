import React from 'react';
import BottomNav from '../components/reusable/BottomNav';
import { ThemeProvider, createTheme } from '@mui/material';
import Footer from '../components/reusable/Footer';
import BodyLendingPage from '../components/lendingpage/BodyLendingPage';


function LendingPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#136935',
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BottomNav />
        <Footer />
        <BodyLendingPage/>
      </div>
    </ThemeProvider >
  );
}

export default LendingPage;
