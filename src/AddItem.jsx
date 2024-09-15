import {useState , Fragment} from 'react'
import Navbar from './Components/NavBar/Navbar'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
import * as yup from 'yup';  
import moment from 'moment';  
import {Form , Formik , ErrorMessage, Field} from 'formik'

const AddItem = () => {
    const [image, setImage] = useState([])
    const [title, setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [timezone , setTimeZone] = useState('')

    const navigate = useNavigate();


    const validationSchema = yup.object().shape({  
        title: yup.string().required('عنوان الزامی است'),  
        description: yup.string().required('توضیحات الزامی است'),  
        timezone: yup.date()  
          .required('تاریخ انتشار الزامی است')  
          .max(moment().format('YYYY-MM-DD'), 'تاریخ نباید از امروز بیشتر باشد'),  
      });  









    const onSubmit = async (values) => {  
      
         console.log(values.title)
     try {  
      
       
        const formData = new FormData(); 
         formData.append('img',image);   
         formData.append('title', values.title);  
          formData.append('description', values.description);  
           formData.append('timezone', values.timezone);  
         
      
         await axios.post(`http://localhost:8000/product/all/`, formData, {  
            headers: {  
              'Content-Type': 'multipart/form-data'  
           }  
           })
          .then(()=> {
            navigate('/')
          })
      
        console.log('Data add successfully');  
        } catch (error) {  
        
         
       }  
      };  
  return (
    <Fragment>
           <div className='bg-gradient-to-r  from-blue-900  to-purple-900 h-screen md:mb-[50px]'>
         <Navbar />
          <Formik     
              validationSchema={validationSchema}
              onSubmit={(values) => onSubmit(values)}
              initialValues={{description:'', title:title, image:'', timezone:''}}
         
              >
           {(form) => (
            <div className='flex justify-between max-md:grid
             '>
                    <div className='flex' >
                    <div className='p-10 text-white grid gap-3  '>
       
                   <img  
                        alt='+'
                        src={image instanceof File? URL.createObjectURL(image) : null} 
                        width={100} height={100}
                        className='flex justify-center text-2xl justify-items-center md:w-[300px] md:h-[400px]'
                   /> 
                 
                       <p>Title : {form.values.title}</p>
                       <p>Description : {form.values.description}</p>
                       <p>ReleaseTime : {form.values.timezone}</p> 
                    </div>
                 </div> 
             <Form  className='grid p-10 gap-4 mt-20 md:mr-10 md:w-[400px] max-md:mt-[140px]'>
                <label className='font-bold text-green-500'>Add Title</label>
             <Field 
                name='title'
                type='text' 
                placeholder='Edit title' 
                className='outline-none p-2 bg-transparent max-md:w-60'
          
              />
              <ErrorMessage name='title'  component={'p'}/>
             <label className='font-bold text-green-500'>Add Description</label> 
              <Field
               type='text' 
               name='description'
               placeholder='Edit description' 
               className='outline-none p-2 bg-transparent max-md:w-60'
               />
              <ErrorMessage name='description'  component={'p'}/>
             <label className='font-bold text-green-500'>Add ReleaseTime</label> 
           <Field type='date' 
                    name='timezone'
                    placeholder='Edit ReleaseTime'
                    className='outline-none p-2 bg-transparent max-md:w-60'
                    />
              <ErrorMessage name='timezone'  component={'p'}/>
             <label className='font-bold text-green-500'>Add Image</label> 
             <Field type='file' 
                    onChange={(e) => setImage(e.target.files[0]) } 
                    name='image'
                    accept=".jpg, .jpeg, .png, .gif"
                    className='max-md:w-60'
             />         
             <ErrorMessage name='image'  component={'p'}/>  
             <button 
               
               className='bg-purple-400 p-3 rounded-md hover:bg-purple-500 max-md:w-60'
               type='onSubmit'>Add Item</button>
  
          </Form> 
        
        </div>
        )} 
          </Formik>
     </div>
  </Fragment>
  )
}

export default AddItem