import { Route, Switch } from "wouter";
import './App.css'
import Header from './components/Header.tsx'
import Search from './components/Search.tsx'
import Highlighted from './components/Highlighted.tsx'
import Popular from './components/Popular.tsx'
import New from './components/New.tsx'
import AuthenticationModalWrapper, { AuthenticationModalContext } from './wrappers/AuthenticationModalWrapper.tsx'
import { useContext, useState } from "react";
import Categories from './components/Categories.tsx'
import Footer from "./components/footer.tsx";
import MobileNavigationBar from "./components/MobileNavigationBar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchFilter from "./components/SearchFilter.tsx";
import MobileMenu from "./components/MobileMenu.tsx";
import AuthWrapper from "./wrappers/AuthWrapper.tsx";
import GamePage from "./components/Game/GamePage.tsx";
import UserPageContent from "./components/UserPageContent.tsx";
import Button from "./components/Button.tsx";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <AuthenticationModalWrapper>
            <MainContent />
          </AuthenticationModalWrapper>
        </AuthWrapper>
      </QueryClientProvider>
    </>
  )
}

function MainContent() {
  const { scrollbarCompensation } = useContext(AuthenticationModalContext)
  const [mobileMenu, setMobileMenu] = useState(false)
  return(
    <div style={{marginRight: scrollbarCompensation+"px"}}>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/game/:id" component={GamePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/download" component={DownloadPage} />
        <Route path="/user/:user" component={UserPage} />
      </Switch>
      <MobileMenu opened={mobileMenu} />
      <MobileNavigationBar setMobileMenu={setMobileMenu} />
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

function DownloadPage() {
  return (
    <>
      <div className="content-layout-margin">
        <h1 className='text-5xl text-wrench-neutral-white pt-40 font-bold'>Download Wrench Client for Windows</h1>
        <h2 className="mt-4 text-xl">Fast and easy downloads & instant access</h2>
        <Button text="Download" type="link" style="purple" size="big" icon="download" className="mt-4" />
        <h3 className="font-semibold text-xl mt-8">Troubleshooting</h3>
        <h4 className="font-semibold text-lg mt-4">Trouble</h4>
        <p>This is some kind of a skibidi explanation of a skibidi problem.  Longer text example lorem ipsum dolor sit amet. This is some kind of a skibidi explanation of a skibidi problem. Longer text example lorem ipsum dolor sit amet. Longer text example lorem ipsum dolor sit amet.</p>
        <h4 className="font-semibold text-lg mt-4">Trouble</h4>
        <p>This is some kind of a skibidi explanation of a skibidi problem.  Longer text example lorem ipsum dolor sit amet. This is some kind of a skibidi explanation of a skibidi problem. Longer text example lorem ipsum dolor sit amet. Longer text example lorem ipsum dolor sit amet.</p>
        <h4 className="font-semibold text-lg mt-4">Trouble</h4>
        <p>This is some kind of a skibidi explanation of a skibidi problem.  Longer text example lorem ipsum dolor sit amet. This is some kind of a skibidi explanation of a skibidi problem. Longer text example lorem ipsum dolor sit amet. Longer text example lorem ipsum dolor sit amet.</p>
        <h4 className="font-semibold text-lg mt-4">Trouble</h4>
        <p>This is some kind of a skibidi explanation of a skibidi problem.  Longer text example lorem ipsum dolor sit amet. This is some kind of a skibidi explanation of a skibidi problem. Longer text example lorem ipsum dolor sit amet. Longer text example lorem ipsum dolor sit amet.</p>
        <Footer />
      </div>
    </>
  )
}
function SearchPage(){
  return (
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 pt-16">
      <SearchFilter />
      <Footer />
    </div>
  )
}
function UserPage(){
  return(
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 pt-16">
      <UserPageContent />
      <Footer />
    </div>
  )
}
export default App
