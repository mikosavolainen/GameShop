import GameDisplay from "./GameDisplay"

export default function Popular(){
    return(
        <>
            <p className="text-xl font-semibold my-4">Popular</p>
            <div className="pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                <GameDisplay classname="pb-5" gameName="gameName" price={40} discount={20} description="Test test test test test test test test test test test test test test test test test test test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
            </div>
        </>
    )
  }