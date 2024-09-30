import { Link } from "wouter"

const PopularCategories = () => {
  return(
    <div className="mt-4">
      {/* <h2 className="mb-2">Popular categories</h2> */}
      <div>
        <PopularCategory name="War" icon="swords" />
        <PopularCategory name="Arcade" icon="joystick" />
        <PopularCategory name="Simulator" icon="agriculture" />
        <PopularCategory name="Puzzle" icon="toys_and_games" />
        <PopularCategory name="Racing" icon="search_hands_free" />
      </div>
    </div>
  )
}

const PopularCategory = ({name, icon}: {name: string, icon: string}) => {
  return(
    <Link href="/" className="text-white px-4 py-1 rounded-full border border-wrench-neutral-3 inline-block font-medium mr-2 mb-3 relative pl-10 shadow-[inset_0_1px_0_rgba(216,191,216,0.15)] hover:text-wrench-purple-1"><i className="absolute left-3 top-4 -translate-y-1/2 material-symbols-rounded !text-[16px]">{icon}</i>{name}</Link>
  )
}

export default PopularCategories