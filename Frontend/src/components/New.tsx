import GameDisplay from "./GameDisplay"

export default function Popular(){
    return(
        <>
            <p className="text-2xl pt-10">Newest</p>
            <div className="pb-20 grid sm-:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                <GameDisplay classname="pb-5" game_name="gameName" price={40} discount={20} description="Test test test test test test test test test test test test test test test test test test test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" game_name="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" game_name="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" game_name="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" game_name="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" game_name="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" game_name="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" game_name="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
            </div>
        </>
    )
}