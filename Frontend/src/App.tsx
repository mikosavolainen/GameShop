import './App.css'
import Input from './components/input.tsx'

function App() {
  return (
    <>
      <h1 className='text-green-400'>
        hi
      </h1>
      <Input type="small-white" />
      <Input type="normal-white"/>
      <Input type="small-dark"/>
      <Input type="normal-dark"/>
    </>
  )
}

export default App
