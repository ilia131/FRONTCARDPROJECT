import React  , {useState , useEffect, Fragment}from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/NavBar/Navbar';
import * as Yup from 'yup';  
import moment from 'moment';  


const DetailAlbum = () => {
    const { id } = useParams();  
    const [detaildata , setDetailData] = useState([])
    const [title , setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image , setImage] = useState([])
    const [timezone , setTimeZone] = useState('')
    const [error, setError] = useState('')
    useEffect( ()=> {
        fetchDetaildata(id)
      }, [id])
      
      const fetchDetaildata = async (id) => {
        try {
        const result = await axios.get(
            `http://localhost:8000/product/detail?query=${id}`
        );
     
        setDetailData(result.data) 
        } catch(error) {
            console.log('error')
       }   
     
      }

      const handleFileChange = (e) => {
        setImage(e.target.files[0]);
      };
      const onSubmit = async (e) => {  
        e.preventDefault();  
        try {  
          const formData = new FormData(); 
          formData.append('img', image);   
          formData.append('title', title);  
          formData.append('description', description);  
          formData.append('timezone', timezone);  
         
      
          await axios.put(`http://localhost:8000/product/all/${id}/`, formData, {  
            headers: {  
               'Content-Type': 'multipart/form-data'  
             }  
          });  
      
          console.log('Data updated successfully');  
        } catch (error) {  
          console.error('Error updating data:', error);  
        }  
      };  
     
      const validationSchema = Yup.object().shape({  
        timeZone: Yup.date()  
          .max(moment().format('YYYY-MM-DD'), 'تاریخ نباید از امروز بیشتر باشد')  
        })






      const HandleTimeZone = (e) => {
         const value = e.target.value
        
      
          validationSchema  
               .validate({ timeZone: value }, { abortEarly: false })  
               .then(() => {  
                setError(''); 
                setTimeZone(value)  
            })  
               .catch((err) => {  
               setError(err.errors[0]);  
            });  
        }

    



  return (
    <Fragment>
      <Navbar />
       <div className='bg-gradient-to-r 
                     from-blue-900  to-purple-900 h-screen flex md:justify-between max-md:grid
                     max-md:h-screen
                     '>
            
        {detaildata.map((el , i) =>(
            <div className='flex' key={i + 1}>
              <div className='p-10 text-white grid gap-5  '>

              <img  
                    src={image instanceof File? URL.createObjectURL(image) : el.get_image} 
                    alt={el.title} width={400} height={400}
              />
               {title?  <p>Title :{title}</p>: <p>Title : {el.title}</p> } 
               {description? <p>Description : {description}</p> :<p>Description : {el.description}</p>} 
               {timezone? <p>ReleaseTime : {timezone}</p> : <p>ReleaseTime : {el.timezone}</p>} 
               </div>
            </div>
        ))}
        <div>
            <form 
                onSubmit={onSubmit}
                className='grid p-10 gap-4 mt-20 md:mr-10 md:w-[400px] max-md:w-full 
                    '>
              <label htmlFor='title' className='font-bold text-green-500'>Edit Title</label>
               <input 
                  type='text' 
                  id='title'
                  placeholder='Edit title' 
                  className='outline-none p-2 bg-transparent max-md:w-60'
                  onChange = {(e) => setTitle(e.target.value)}
                  value={title}
                />
               <label htmlFor='description' className='font-bold text-green-500'>Edit Description</label>
               <input 
                 type='text' 
                 id='description'
                 placeholder='Edit description' 
                 className='outline-none p-2 bg-transparent max-md:w-60'
                 onChange = {(e) => setDescription(e.target.value)}
                 value={description}
                 />
               <label htmlFor='timezone' className='font-bold text-green-500'>Edit ReleaseTime</label>
               <input type='date' 
                      id='timezone'
                      placeholder='Edit ReleaseTime'
                      className='outline-none p-2 bg-transparent max-md:w-60'
                      onChange={HandleTimeZone}
                      value={timezone}
                      
                      />
               <label htmlFor='image' className='font-bold text-green-500'>Change Image</label>
               <input type='file' 
                      onChange={handleFileChange} 
                      id='image'
                      name='image'
                      className='max-md:w-60'

               />
               <button 
                 
                 className='bg-green-400 p-3 rounded-md hover:bg-green-500 max-md:w-60 
                 '
                 type='onSubmit'>Update</button>
                {error && <div className="text-red-500">{error}</div>}
            </form>
        </div>
    </div>
    </Fragment>
  )
}

export default DetailAlbum