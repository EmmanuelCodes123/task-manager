import { Edit, Trash } from "lucide-react";

export default function Category({sn, category}:{sn:number, category:string}) {
    return <>
        <div className="flex ">
            <div className="w-10 border-r-2 border-gray-400 flex items-center justify-center">
                <h2>{sn}</h2>
            </div>
            <div className="flex-1 border-r-2 border-gray-400 flex items-center justify-center">
                <h2>{category}</h2>
            </div>
            <div className="flex-1 border-r-2 border-gray-400 flex items-center justify-center space-x-5">
                <button className="py-1 px-3 rounded flex gap-2 bg-red-400 text-white"><Edit />Edit</button>
                <button className="py-1 px-3 rounded flex gap-2 bg-red-400 text-white"><Trash />Delete</button>
            </div>
        </div>
    </>
}