export default function Label({categories}:{categories: string[]}){

    return(
        <div className="flex text-wrench-neutral-white font-base">
        {categories.map(function(data){
            return(
                <div key={(Math.random() + 1).toString(36).substring(7)} className="bg-wrench-neutral-4 px-2 mr-1 border border-wrench-neutral-3 rounded-full">
                    <div className="text-center">{data}</div>
                </div>
            )
        })}
    </div>
    )
}