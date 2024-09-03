import './App.css'
import Header from './components/Header.tsx'
import Input from './components/Input.tsx'
import Highlighted from './components/Highlighted.tsx'
import Popular from './components/Popular.tsx'

function App() {
  return (
    <>
      <Header />
      <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>1 200 500+ games of any kind</p>
      <Input type='text' width={62} size_color='normal-white' icon='search' label='Search' placeholder='Start your search here' />
      <Highlighted />
      <Popular />
    </>
  )
}

export default App
