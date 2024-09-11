import { Route, Switch } from "wouter";
import './App.css'
import Header from './components/Header.tsx'
import Search from './components/Search.tsx'
import Highlighted from './components/Highlighted.tsx'
import Popular from './components/Popular.tsx'
import New from './components/New.tsx'
import AuthenticationModalWrapper, { AuthenticationModalContext } from './wrappers/AuthenticationModalWrapper.tsx'
import { useContext } from "react";
import Categories from './components/Categories.tsx'
import Footer from "./components/footer.tsx";
import MobileNavigationBar from "./components/MobileNavigationBar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchFilter from "./components/SearchFilter.tsx";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthenticationModalWrapper>
          <MainContent />
        </AuthenticationModalWrapper>
      </QueryClientProvider>
    </>
  )
}

function MainContent() {
  const { scrollbarCompensation } = useContext(AuthenticationModalContext)
  return(
    <div style={{marginRight: scrollbarCompensation+"px"}}>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/reset-password" component={HomePage} />
        <Route path="/test" component={TestPage} />
        <Route path="/search" component={SearchPage} />
      </Switch>
      <MobileNavigationBar />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <div className="content-layout-margin mb-16 md:mb-0 md:mt-16">
        <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>1 200 500+ games of any kind</p>
        <Search inLanding/>
        <Highlighted />
        <Popular />
        <New />
        <Categories />
        <Footer />
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
function SearchPage(){
  return (
    //const search = useSearch() to get search results as a string example: http://localhost:5173/search?q=fefaadadsasdasd returns q=fefaadadsasdasd
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 pt-16">
    <Search />
    <SearchFilter />
    </div>
  )
}

export default App
