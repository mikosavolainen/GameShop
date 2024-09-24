import { useEffect, useState } from "react";
import "../App.css";
import GameDisplay from "./GameDisplay";

const testData: {
  name: string,
  shortDescription: string,
  categories: (string | undefined)[],
  price: number,
  discount: number | null
}[] = [
  {
    name: "This game is incredibly good for you, you must buy",
    shortDescription: "Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology.",
    categories: ["Strategies", "RPG", "Puzzle"],
    price: 100,
    discount: 90
  },
  {
    name: "This game is incredifor you to buy",
    shortDescription: "Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology.",
    categories: ["Strategies", "RPG", "Puzzle"],
    price: 100,
    discount: 90
  },
  {
    name: "This game good for you to buy",
    shortDescription: "Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology.",
    categories: ["Strategies", "RPG", "Puzzle"],
    price: 100,
    discount: 90
  },
  {
    name: "This game is buy",
    shortDescription: "Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology.",
    categories: ["Strategies", "RPG", "Puzzle"],
    price: 100,
    discount: 90
  },
  {
    name: "This game is incredibly good buy",
    shortDescription: "Test description of the game, so we can see how it will appear in the future application! On the main block on the left side, there is usually a longer text, so that it fills more space and that the whole recommended block won’t look weird. In fact, I’m going to yap even more so that I will fill even more space. Sigma skibidi. I have a degree in yaponology.",
    categories: ["Strategies", "RPG", "Puzzle"],
    price: 100,
    discount: 90
  },
]

export default function Highlighted() {
  const [sliderPage, setSliderPage] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState(true)
  useEffect(() => {
    while(timer !== 10000) {
      const clock = setTimeout(() => {
        if(timerRunning) setTimer(old => old+10)
      },10);
      return() => clearTimeout(clock)
    }
    if(sliderPage == testData.length-1){
      setSliderPage(0)
    }
    else {
      setSliderPage(sliderPage + 1)
    }
    setTimer(0)
  }, [timer, timerRunning])

  function slide(number: number) {
    setSliderPage(number)
  }
  return (
    <>
      <h3 className="text-xl font-semibold mb-4 mt-8">Highlighted</h3>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${(sliderPage) * 100}%)` }}
          onMouseEnter={() => setTimerRunning(false)} onMouseLeave={() => setTimerRunning(true)}
        >
          {testData.map((data, index) => (
            <div className="min-w-full" key={index}>
              <GameDisplay
                discount={data.discount}
                price={data.price}
                size="large"
                gameName={data.name}
                categories={data.categories}
                description={data.shortDescription}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {testData.map((data, i) => (
          <button onClick={() => {slide(i); setTimer(0)}} className="bg-wrench-neutral-dark border-0 pb-2 pt-6 group">
            <div className={`rounded-full transition-all duration-150 group-hover:bg-wrench-neutral-2 h-1 relative ${sliderPage === i ? `bg-wrench-neutral-3 border-none` : 'border-wrench-neutral-3 bg-wrench-neutral-3'} shadow-[inset_0_1px_0_rgba(216,191,216,0.15)]`}>
              { sliderPage === i && <div className={`rounded-full bg-wrench-purple h-1 absolute drop-shadow-glow shadow-[inset_0_1px_0_rgba(216,191,216,0.15)]`} style={{width: timer/100+"%"}}></div> }
              { sliderPage > i && <div className={`rounded-full bg-wrench-purple h-1 absolute drop-shadow-glow w-full shadow-[inset_0_1px_0_rgba(216,191,216,0.15)]`}></div> }
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
