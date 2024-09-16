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
  useEffect(() => {
    const clock = setTimeout(() => {
      if(sliderPage == testData.length-1){
        setSliderPage(0)
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
      <h3 className="text-wrench-neutral-white text-xl mt-10 mb-3">Highlighted</h3>
      <GameDisplay
        discount={testData[sliderPage].discount}
        price={testData[sliderPage].price}
        size="large"
        gameName={testData[sliderPage].name}
        categories={testData[sliderPage].categories}
        description={testData[sliderPage].shortDescription}
      />
      <div className="grid grid-cols-5 gap-3">
        {testData.map((data, i) => (
          <button onClick={() => slide(i)} className="bg-wrench-neutral-dark border-0 pb-2 pt-6">
            <div className={`border rounded-full h-1 ${sliderPage === i ? `bg-wrench-purple border-none` : 'border-wrench-neutral-3 bg-wrench-neutral-3'}`}></div>
          </button>
        ))}
      </div>
    </>
  );
}
