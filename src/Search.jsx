import React , {useState , useEffect, Fragment} from 'react'
import { useParams } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { useNavigate , Link } from 'react-router-dom'

import axios from 'axios'
import Navbar from './Components/NavBar/Navbar';
const Search = () => {
    const {searchTerm} = useParams()
    const [searchCard , setSearchCard] = useState([])
    useEffect(()=>{
        fetchSearchdata(searchTerm)
      }, [searchTerm])
    
      const fetchSearchdata = async (searchTerm) => {
        try {
        const result = await axios.get(
            `http://localhost:8000/product/search?query=${searchTerm}`
        );
        
        setSearchCard(result.data) 
        } catch(error) {
       }
      }

      const OnRemove = async (id) => {
        const res =  await axios.delete(`http://localhost:8000/product/all/${id}/`)
        setSearchCard(searchCard.filter(card => card.id !== id))
      }
  return (
    <Fragment >
        <Navbar />
     <section className='p-6' >
      <p className='bg-gradient-to-r text-white 
                     from-blue-900  to-purple-900 p-2 rounded-md px-5 mt-3 pb-3'>Search result : {searchTerm}</p>
    <div className="grid-cols-4 grid justify-items-center  justify-center  gap-10 pt-20 items-center  
     max-md:justify-center max-md:grid-cols-1 max-md:grid max-md:justify-items-center">
      {searchCard.map((el, i) => (
      <div className="bg-gradient-to-r text-white 
                    from-blue-900 
                    to-purple-900 
                    w-[260px] h-[420px] 
                    rounded-sm">
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
   </div>
   </section>
   </Fragment>
  )
}

export default Search