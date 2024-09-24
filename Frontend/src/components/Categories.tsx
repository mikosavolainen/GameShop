export default function Categories(){
  return(
    <>
      <h2 className="text-xl font-semibold mt-12 mb-4">By categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-center mb-8">
          <Category name="War" icon="swords" />
          <Category name="Arcade" icon="joystick" />
          <Category name="Simulator" icon="agriculture" />
          <Category name="Puzzle" icon="toys_and_games" />
          <Category name="Racing" icon="search_hands_free" />
          <Category name="Sports" icon="sports_soccer" />
          <Category name="Strategy" icon="chess" />
          <Category name="Adventure" icon="explore" />
      </div>
    </>
  )
}

function Category({name, icon}:{name: string, icon: string}){
  return(
    <>
      <button className="bg-wrench-neutral-dark rounded-2xl border border-wrench-neutral-3 py-9 group hover:border-wrench-neutral-2 transition-all duration-200">
        <div>
          <span className="material-symbols-rounded !text-[64px] group-hover:text-wrench-purple-1 transition-all duration-200">{icon}</span>
        </div>
        <div className="mt-6 text-lg group-hover:text-wrench-purple-1 group-hover:shadow group:hover[text-shadow:_0_5px_0_rgb(--tw-wrench-purple-1)] transition-all duration-200">{name}</div>
      </button>
    </>
  )
}