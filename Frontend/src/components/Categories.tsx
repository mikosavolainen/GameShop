import swords from "../assets/Vector-1.png"
import adventure from "../assets/Vector-2.png"
import strategy from "../assets/Vector-3.png"
import sports from "../assets/Vector-4.png"
import racing from "../assets/Vector-5.png"
import puzzle from "../assets/Vector-6.png"
import simulator from "../assets/Vector-7.png"
import arcade from "../assets/Vector.png"

export default function Categories(){
  return(
    <>
      <h2 className="text-xl font-semibold mt-12 mb-4">By categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-center mb-8">
          <Button name="War" png={swords} />
          <Button name="Arcade" png={arcade} />
          <Button name="Simulator" png={simulator} />
          <Button name="Puzzle" png={puzzle} />
          <Button name="Racing" png={racing} />
          <Button name="Sports" png={sports} />
          <Button name="Strategy" png={strategy} />
          <Button name="Adventure" png={adventure} />
      </div>
    </>
  )
}

function Button({name, png}:{name: string, png: any}){
  return(
    <>
      <button className="bg-wrench-neutral-dark rounded-2xl border border-wrench-neutral-3 py-9">
        <div>
          <img className="block m-auto" src={png}/>
        </div>
        <div className="mt-6 text-lg font-semibold">{name}</div>
      </button>
    </>
  )
}