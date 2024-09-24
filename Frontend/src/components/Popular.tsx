import GameDisplay from './GameDisplay'
import test_image_wrench from "../assets/test_image_wrench.png"
import test_image_wrench_2 from "../assets/test_image_wrench_2.png"

export default function Popular() {
  return (
    <>
      <h2 className="text-xl font-semibold mt-12 mb-4">Popular</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          discount={20}
          description="Test test test test test test test test test test test test test test test test test test test"
          size="small"
          categories={['Cool']}
          images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
          images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
          images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
          images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
          images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
          images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
          images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
          images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
        />
      </div>
    </>
  )
}
