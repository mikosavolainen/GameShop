import { Route, Switch, useLocation } from "wouter";
import './App.css'
import Header from "./components/Parts/Header.tsx";
import Search from './components/Search.tsx'
import Highlighted from './components/Highlighted.tsx'
import Popular from './components/Popular.tsx'
import New from './components/New.tsx'
import ModalWrapper, { ModalContext } from './wrappers/ModalWrapper.tsx'
import { useContext, useEffect, useState } from "react";
import Categories from './components/Categories.tsx'
import Footer from "./components/Parts/Footer.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchFilter from "./components/SearchFilter.tsx";
import MobileMenu from "./components/Parts/MobileMenu.tsx";
import AuthWrapper from "./wrappers/AuthWrapper.tsx";
import GamePage from "./components/Game/GamePage.tsx";
import UserPageContent from "./components/UserPageContent.tsx";
import Button from "./components/Button.tsx";
import PopularCategories from "./components/PopularCategories.tsx";
import MobileNotifications from "./components/Parts/MobileNotifications.tsx";
import MobileNavigationBar from "./components/Parts/MobileNavigationBar.tsx";
import Settings from "./components/Settings.tsx";
import Checkout from "./components/Checkout.tsx";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <ModalWrapper>
            <MainContent />
          </ModalWrapper>
        </AuthWrapper>
      </QueryClientProvider>
    </>
  )
}

function MainContent() {
  const { scrollbarCompensation } = useContext(ModalContext)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [mobileNotifications, setMobileNotifications] = useState(false)

  const  pathname = useLocation();

  useEffect(() => { // fix to scroll to top on page change
    window.scrollTo(0, 0);
  }, [pathname]);

  return(
    <div style={{marginRight: scrollbarCompensation+"px"}}>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/game/:id" component={GamePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/download" component={DownloadPage} />
        <Route path="/user/:user" component={UserPage} />
        <Route path="/settings" component={Settings} />
        <Route path="/checkout" component={Checkout} />
        <Route path="*" component={NotFound} />
      </Switch>
      <MobileMenu opened={mobileMenu} setOpened={setMobileMenu} />
      <MobileNotifications opened={mobileNotifications} setOpened={setMobileNotifications} />
      <MobileNavigationBar setMobileMenu={setMobileMenu} setMobileNotifications={setMobileNotifications} />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <div className="content-layout-margin mb-16 md:mb-0 md:mt-16">
        <h1 className='text-5xl text-wrench-neutral-white pt-40 font-bold mb-3'>1 200 500+ games of any kind</h1>
        <Search inLanding/>
        <PopularCategories />
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

const NotFound = () => {
  return (
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 pt-16">
      <h1 className='text-5xl text-wrench-neutral-white pt-40 font-bold'>404 Not Found</h1>
      <h2 className="mt-4 text-xl mb-64">Fast and easy downloads & instant access</h2>
      <Footer />
    </div>
  )
}

export default App
