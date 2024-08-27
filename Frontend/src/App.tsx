import './App.css'
import Input from './components/input.tsx'

function App() {
  return (
    <>
      <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>1 200 500+ games of any kind</p>
      <Input type='password' width={62} size_color='normal-white' icon='key' label='Search' placeholder='Start your search here' />
      <Input type='text' width={62} size_color='small-dark' icon='person' label='Search' placeholder='Start your search here' />
      <Input type='text' width={62} size_color='normal-dark' icon='mail' label='Search' placeholder='Start your search here' />
      <Input type='text' width={62} size_color='small-white' icon='search' label='Search' placeholder='Start your search here' />
    </>
  )
}

export default App
