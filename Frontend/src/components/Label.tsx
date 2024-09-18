export default function Label({category}:{category: string}){
    return(
      <div className="bg-wrench-neutral-4 px-2 mr-1 border border-wrench-neutral-3 rounded-full inline-block">
          <div className="text-center">{category}</div>
      </div>
    )
}