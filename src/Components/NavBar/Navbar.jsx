import { useState } from 'react';
import { BsSearch } from 'react-icons/bs'
import { useNavigate , Link } from 'react-router-dom'



const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
 

       navigate(`/search/${searchTerm}`);
      
   }
  return (
    <section>
         <div className="flex h-[60px] gap-[30px] p-5 items-center justify-between bg-gradient-to-r text-white 
                         from-blue-900  to-purple-900 max-md:bg-fuchsia-800
                         max-sm:w-full
                         ">
            <Link to={'/'} className='text-white max-md:text-xs'>Release Albums</Link>
            <form className='flex gap-10' onSubmit={handleSubmit}>
                <div className='flex gap-3 items-center'>
                  <input 
                     placeholder='Search for Albums ...'
                     className='bg-transparent outline-none md:w-[220px] max-sm:w-30 min-[320px]:w-[50px]'
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  <BsSearch className='text-white'/>
                </div>
                <Link to={'/additem'} className='bg-green-400 p-2 text-sm rounded-md max-md:hidden' >Add Albums</Link>
                <Link to={'/additem'} className='bg-green-400 p-2 
                 md:hidden fixed top-0 left-0 mt-[250px] w-10 text-center bg-gradient-to-r text-white 
                         from-blue-900  to-purple-900 max-md:bg-fuchsia-800 text-xl
                         pb-3' >+</Link>
            </form>
         </div>
    </section>
  )
}

export default Navbar