import './App.css'
import GameDisplay from './components/GameDisplay.tsx'
import Input from './components/Input.tsx'

function App() {
  return (
    <>
      <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>1 200 500+ games of any kind</p>
      <Input type='text' width={62} size_color='normal-white' icon='search' label='Search' placeholder='Start your search here' />
      <p className="text-wrench-neutral-white text-3xl pt-10">Highlighted</p>
      <GameDisplay discount={90} price={100} size="small" game_name="This game is incredibly good for you to buy" categories={["Strategies", "RPG", "Puzzle"]} description='Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology.'/>
    </>
  )
}

export default App
