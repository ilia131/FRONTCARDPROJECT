import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Home';
import NotFound from './NotFound';
import Navbar from './Components/NavBar/Navbar';
import Search from './Search';
import DetailAlbum from './DetailAlbum';
import AddItem from './AddItem';

function App() {

  return (
    <Fragment>
           <Routes>
             <Route index element={<Home />}/>
             <Route path='*' element={<NotFound />}/>
             <Route path="/search/:searchTerm" element={<Search />}/>
             <Route path="/detail/:id" element={<DetailAlbum/>}/>
             <Route path='/additem' element={<AddItem />}/>
          </Routes>
    </Fragment>
  )
}

export default App
