import './App.css'
import Input from './components/input.tsx'

function App() {
  return (
    <>
      <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>1 200 500+ games of any kind</p>
      <Input type='text' width={62} size='normal-white' icon='search' label='Search' placeholder='Start your search here'/>
    </>
  )
}

export default App
