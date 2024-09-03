import GameDisplay from "./GameDisplay"

export default function Popular(){
    return(
        <>
            <p className="text-2xl pt-10">Popular</p>
            <div className="grid sm-:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <GameDisplay classname="pb-5" game_name="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
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