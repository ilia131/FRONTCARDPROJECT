import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

import { IoClose } from "react-icons/io5";

const Card = () => {
  const [card, setCard] = useState([])

  useEffect(()=>{
    fetchdata()
  }, [])

  const fetchdata = async () => {
    try {
    const result = await axios.get(
        'http://localhost:8000/product/all/'
    );
    
    setCard(result.data) 
    } catch(error) {
   }
  }
  const OnRemove = async (id) => {
    console.log(id)
    const res =  await axios.delete(`http://localhost:8000/product/all/${id}/`)
    setCard(card.filter(card => card.id !== id))
  }

  
  return (
    <section className="grid-cols-4 
                        grid justify-items-center  justify-center  gap-10 pt-20 items-center
                        max-md:justify-center max-md:grid-cols-1 max-md:grid max-md:justify-items-center">
     {card.map((el, i) => (
       <div className="bg-gradient-to-r text-white 
                     from-blue-900 
                     to-purple-900 
                     w-[260px] h-[420px] 
                     rounded-sm"
                     key={i + 1}
                     >
            <p 
              className="ml-2 
                        text-sm 
                        text-gray-400
                        cursor-pointer mt-2 
                        "
                        onClick={() => OnRemove(el.id)}
                        ><IoClose /></p>
           <div 
                className="
                     grid justify-center
                     p-4 rounded-md  justify-items-center
                     gap-3
                     ">
         <img 
              src={el.get_image} 
              width={200} 
              height={200}
              alt="Picture"
              className="rounded-md"
        />
        <p>Title : {el.title}</p>
        <p>Description : {el.description}</p>
        <p>Time : {el.timezone}</p>
        <Link to={`/detail/${el.id}`} 
         className="border-cyan-400
                     bg-cyan-400 flex 
                      justify-center 
                      items-center w-20 h-10
                      rounded-md pb-1
                      "
                      
         >Details</Link>
 
     </div>
     </div>
    ))}
    </section>
  )
}

export default Card