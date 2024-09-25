import { useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import test_image_wrench from "../../assets/test_image_wrench.png"
import test_image_wrench_2 from "../../assets/test_image_wrench_2.png"
import Label from "../Label";
import Button from "../Button";
import { Interweave } from "interweave";
import Reviews from "./Reviews";
import RatingStars from "./RatingStars";

const images = [
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench_2, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
  { src: test_image_wrench, alt: 'Test alt', type: "image" },
]

export default function GamePage() {
  const [chosenImage, setChosenImage] = useState(0)
  const imageScrollRef = useRef<HTMLDivElement | null>(null);
  const imageScrollInnerRef = useRef<HTMLDivElement | null>(null);
  const [imageScrollLeftOffset, setImageScrollLeftOffset] = useState(0)
  const imageListItem = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    const handleResize = () => {
      if(imageScrollRef.current && imageListItem.current && imageScrollInnerRef.current){
        const itemWidth = imageListItem.current.offsetWidth // image icon average width
        const offsetResult = Math.min(-((itemWidth * chosenImage) - imageScrollRef.current.offsetWidth * 0.4), 0)
        setImageScrollLeftOffset(offsetResult)
      }
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [chosenImage])
  const params = useParams();
  useEffect(() => {
    async function fetch() { // function to fetch game information
      console.log(params.id)
    }
    fetch()
  }, [])

  // some animations stuff, not the best but works
  const [currentSrc, setCurrentSrc] = useState(images[chosenImage].src);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setCurrentSrc(images[chosenImage].src);
      setIsAnimating(false);
    }, 200); // Adjust the timing to match your CSS animation duration

    return () => clearTimeout(timer);
  }, [chosenImage, images]);

  useEffect(() => {
    while(true) {
      const clock = setTimeout(() => setChosenImage(chosenImage < images.length ? chosenImage + 1 : 0), 5000)
      return () => clearTimeout(clock)
    }
  }, [setChosenImage, chosenImage])

  return(
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 overflow-hidden">
      <div className="flex flex-col xl:flex-row gap-8 mt-16">
        <div className="xl:w-[64%]">
          <img
            className={`rounded-3xl object-cover transition-opacity duration-200 ${isAnimating ? 'opacity-90' : 'opacity-100'}`}
            src={currentSrc}
            alt="Game image"
          />
          <div className={`w-full overflow-hidden whitespace-nowrap relative h-28`} ref={imageScrollRef}>
            <div className={`absolute transition-left duration-500 top-1/2 -translate-y-1/2`} ref={imageScrollInnerRef} style={{left: imageScrollLeftOffset+"px"}}>
              {images.map((image, index) => <button ref={chosenImage === index ? imageListItem : null} className={`inline-block mr-3 rounded-2xl align-middle ${chosenImage === index && "border-wrench-purple-1 border-2 p-0.5 shadow-lg"}`} key={"image-button-"+index} onClick={() => setChosenImage(index)}><img className={`rounded-xl transition-all duration-200 ${chosenImage === index ? "h-24" : "h-20"}`} src={image.src} alt="Game image"/></button>)}
            </div> 
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-semibold mb-4">Game name</h1>
          <div className="mb-4">
            <Label category="something" />
            <Label category="something" />
            <Label category="something" />
          </div>
          <div className="flex align-middle mb-4"><span className="mt-1 mr-1.5">4.2/5.0</span><RatingStars rating={4.2} /></div>
          <Button type="button" size="big" style="purple" text="Add to cart" icon="shopping_cart" className="mb-4" />
          <div className="mb-4 text-lg">
            <span style={{fontFamily: `"Trispace", sans-serif`}} className="line-through text-wrench-neutral-2 mr-4">98.20 &euro;</span>
            <span style={{fontFamily: `"Trispace", sans-serif`}}>123.45 &euro;</span>
          </div>
          <span>Also something about VAT here like if we are going to pay taxes</span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl mt-6 mb-2 font-semibold">About this game</h2>
        <Interweave content="This string contains <b>HTML</b> and will safely be rendered!" />
      </div>
      <div>
        <h2 className="text-2xl mt-6 mb-2 font-semibold">Reviews</h2>
        <Reviews />
      </div>
    </div>
  )
}