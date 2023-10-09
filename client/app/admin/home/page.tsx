'use client'
import React from 'react'
import Header from '@/Components/admin/Header'
import { Box, Stack } from '@mui/material'
import Nav from '@/Components/admin/Nav'

import UserPage from '@/Components/admin/UserPage'

function page() {
  return (
    <>
      <Stack>
        <Header />
        <Nav />
        <Box sx={{ ml:35,mt:12 }}>
          
          <UserPage />
        </Box>

       
      </Stack>
    </>
  )
}

export default page
