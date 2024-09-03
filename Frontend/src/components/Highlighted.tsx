import { useEffect, useState } from "react";
import "../App.css";
import GameDisplay from "./GameDisplay";
export default function Highlighted() {
  const [sliderPage, setSliderPage] = useState<number>(1);
  useEffect(() => {
    const clock = setTimeout(() => {
      if(sliderPage == 5){
        setSliderPage(1)
      }
      else{
        setSliderPage(sliderPage + 1)
      }
    },10000);
    return() => clearTimeout(clock)
  })
  function slide(number: number){
    setSliderPage(number)
  }
  return (
    <>
      <p className="text-wrench-neutral-white text-3xl pt-10">Highlighted</p>
      {sliderPage == 1 && (
        <GameDisplay
          discount={90}
          price={100}
          size="large"
          game_name="This game is incredibly good for you, you must buy"
          categories={["Strategies", "RPG", "Puzzle"]}
          description="Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology."
        />
      )}
      {sliderPage == 2 && (
        <GameDisplay
          discount={90}
          price={100}
          size="large"
          game_name="This game is incredifor you to buy"
          categories={["Strategies", "RPG", "Puzzle"]}
          description="Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology."
        />
      )}
      {sliderPage == 3 && (
        <GameDisplay
          discount={90}
          price={100}
          size="large"
          game_name="This game good for you to buy"
          categories={["Strategies", "RPG", "Puzzle"]}
          description="Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology."
        />
      )}
      {sliderPage == 4 && (
        <GameDisplay
          discount={90}
          price={100}
          size="large"
          game_name="This game is buy"
          categories={["Strategies", "RPG", "Puzzle"]}
          description="Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology."
        />
      )}
      {sliderPage == 5 && (
        <GameDisplay
          discount={90}
          price={100}
          size="large"
          game_name="This game is incredibly good buy"
          categories={["Strategies", "RPG", "Puzzle"]}
          description="Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology."
        />
      )}
      <div className="grid grid-cols-5 gap-3">
        <button onClick={() => slide(1)} className="bg-wrench-neutral-dark border-0 pb-2 pt-6">
            <div className={`border rounded-full h-1 ${sliderPage === 1 ? `bg-wrench-purple border-none` : 'border-wrench-neutral-3 bg-wrench-neutral-3'}`}></div>
        </button>
        <button onClick={() => slide(2)} className="bg-wrench-neutral-dark border-0 pb-2 pt-6">
            <div className={`border rounded-full h-1 ${sliderPage === 2 ? `bg-wrench-purple border-none` : 'border-wrench-neutral-3 bg-wrench-neutral-3'}`}></div>
        </button>
        <button onClick={() => slide(3)} className="bg-wrench-neutral-dark border-0 pb-2 pt-6">
            <div className={`border rounded-full h-1 ${sliderPage === 3 ? `bg-wrench-purple border-none` : 'border-wrench-neutral-3 bg-wrench-neutral-3'}`}></div>
        </button>
        <button onClick={() => slide(4)} className="bg-wrench-neutral-dark border-0 pb-2 pt-6">
            <div className={`border rounded-full h-1 ${sliderPage === 4 ? `bg-wrench-purple border-none` : 'border-wrench-neutral-3 bg-wrench-neutral-3'}`}></div>
        </button>
        <button onClick={() => slide(5)} className="bg-wrench-neutral-dark border-0 pb-2 pt-6">
            <div className={`border rounded-full h-1 ${sliderPage === 5 ? `bg-wrench-purple border-none` : 'border-wrench-neutral-3 bg-wrench-neutral-3'}`}></div>
        </button>
      </div>
    </>
  );
}
