import GameDisplay from './GameDisplay'

export default function Popular() {
  return (
    <>
      <h2 className="text-xl font-semibold mt-12 mb-4">Newest</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          discount={20}
          description="Test test test test test test test test test test test test test test test test test test test Test test test test test test test test test test test test test test test test test test test Test test test test test test test test test test test test test test test test test test test"
          size="small"
          categories={['Cool']}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
        />
        <GameDisplay
          classname="pb-5"
          gameName="gameName"
          price={40}
          description="Test"
          size="small"
          categories={['Cool']}
        />
      </div>
    </>
  )
}
