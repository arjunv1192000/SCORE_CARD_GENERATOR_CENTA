'use client'
import React from 'react'
import LoginForm from '@/Components/user/Login';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
import useResponsive from '@/hooks/useResponsive'
import { Provider } from "react-redux";
import store from "../.../../../../redux/store";



const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  
  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));
  
  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));


function page() {

    const mdUp = useResponsive('up', 'md');
  return (
    <Provider store={store}>
      <>
    <StyledRoot>
      {mdUp && (
        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <Typography variant="h5" sx={{ px: 5, mb: 5 }}>
          Your Report Card Is Ready!
          </Typography>
          <img src="https://minimal-kit-react.vercel.app/assets/illustrations/illustration_login.png" alt="login" />
        </StyledSection>
      )}

      <Container maxWidth="sm">
        <StyledContent>
          <Typography variant="h4" gutterBottom sx={{mb:10}}>
          Access and download reports with ease...
          </Typography>

          
          <LoginForm />
        </StyledContent>
      </Container>
    </StyledRoot>
  </>

    </Provider>
    
   
    
  )
}

export default page