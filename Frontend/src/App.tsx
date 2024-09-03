import './App.css'
import Header from './components/Header.tsx'
import Input from './components/Input.tsx'
import Highlighted from './components/Highlighted.tsx'
import Modal from './components/Modal.tsx'
import { useContext, useState } from 'react'
import AuthenticationModalWrapper, { AuthenticationModalContext } from './wrappers/AuthenticationModalWrapper.tsx'

function App() {
  return (
    <>
      <AuthenticationModalWrapper>
        <MainContent />
      </AuthenticationModalWrapper>
    </>
  )
}

function MainContent() {
  return(
    <>
        <Header />
        <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>1 200 500+ games of any kind</p>
        <Input type='text' variation='normal-white' icon='search' label='Search' className='w-1/2' placeholder='Start your search here' />
        <Highlighted />
    </>
  )
}

export default App
