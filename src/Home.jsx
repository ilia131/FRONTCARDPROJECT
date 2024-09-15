import { Fragment } from "react"
import Card from "./Components/Card/Card" 
import Navbar from "./Components/NavBar/Navbar"

const Home = () => {
  return ( 
    <Fragment >
      <Navbar />
    <div className="p-6">
      <p className="bg-gradient-to-r text-white 
                     from-blue-900  to-purple-900 p-2 rounded-md px-5 mt-3 pb-3" >All Albums</p>
       <Card />
    </div>
    </Fragment>
  )
}

export default Home