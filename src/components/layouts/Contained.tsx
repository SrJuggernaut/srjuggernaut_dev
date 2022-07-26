import React from 'react'

import Container from '@styles/container'
import Footer from '@components/layouts/footer/Footer'
import Header from '@components/layouts/header/Header'

export interface ContainedLayoutProps {
  children: React.ReactNode
}

const Contained: React.FC<ContainedLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        component="main"
        sx={{
          minHeight: 'calc(100vh - 120px)',
          marginTop: '60px',
          padding: 1
        }}
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Contained
