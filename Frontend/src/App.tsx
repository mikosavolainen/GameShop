import './App.css'
import GameDisplay from './components/GameDisplay.tsx'
import Input from './components/Input.tsx'

function App() {
  return (
    <>
      <p className='text-5xl text-wrench-neutral-white pt-40 font-bold'>1 200 500+ games of any kind</p>
      <Input type='text' width={62} size_color='normal-white' icon='search' label='Search' placeholder='Start your search here' />
      <p className="text-wrench-neutral-white text-3xl pt-10">Highlighted</p>
      <div className='grid grid-cols-2'>
      <GameDisplay size="large" game_name="This game is incredibly good for you to buy" categories={["Strategies", "RPG", "Arcade", "game", "HEHEHEHAA", "Puzzle"]} description='Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology.'/>
      <div className='grid grid-cols-2 gap-4'>
      <GameDisplay size="small" game_name="This game" categories={["Strategies", "RPG", "Arcade", "game", "Puzzle"]} description='Test description of the game'/>
      <GameDisplay size="small" game_name="This game" categories={["Strategies", "RPG", "Arcade", "game", "Puzzle"]} description='Test description of the game'/>
      <GameDisplay size="small" game_name="This game" categories={["Strategies", "RPG", "Arcade", "game", "Puzzle"]} description='Test description of the game'/>
      <GameDisplay size="small" game_name="This game" categories={["Strategies", "RPG", "Arcade", "game", "Puzzle"]} description='Test description of the game'/>
      </div>
      </div>
    </>
  )
}

export default App
