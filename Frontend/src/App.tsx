import { Route, Switch } from "wouter";
import './App.css'
import Header from './components/Header.tsx'
import Input from './components/Input.tsx'
import Highlighted from './components/Highlighted.tsx'
import Popular from './components/Popular.tsx'
import New from './components/New.tsx'
import Categories from './components/Categories.tsx'
import AuthenticationModalWrapper from './wrappers/AuthenticationModalWrapper.tsx'

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
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/test" component={TestPage} />
        </Switch>
    </>
  )
}

function HomePage() {
  return (
    <>
      <div className="content-layout-margin">
        <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>1 200 500+ games of any kind</p>
        <Input type='text' style='light' size='big' icon='search' label='Search' className='w-1/2' placeholder='Start your search here' />
        <Highlighted />
        <Popular />
        <New />
        <Categories />
      </div>
    </>
  )
}

function TestPage() {
  return (
    <>
      <div className="content-layout-margin">
        <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>Test test test</p>
      </div>
    </>
  )
}

export default App
