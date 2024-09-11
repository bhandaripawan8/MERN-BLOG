import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = 'http://localhost:4000/api'
    const [allBlogs, setAllBlogs] = useState([]);
    const [token, setToken] = useState('');



    const getAllBlogs = async() =>{
        try {
            const response = await axios.get(url+'/blog/allblogs');
            setAllBlogs(response.data);
            console.log(response)
            
        } catch (error) {
            console.error('Error fetching the data', error)
        }
    }

    useEffect(()=>{
        const loadAllBlogData = async () =>{
            await getAllBlogs();
            const storedToken = localStorage.getItem('token');
            if(storedToken){
                setToken(storedToken);
            }
            }
            loadAllBlogData();
    },[])




    const contextValue = {
        getAllBlogs,
        token, 
        setToken,
        url
    }

  return (
    <storeContext.Provider value = {contextValue}>
        {props.children}
    </storeContext.Provider>
  )
}

export default StoreContextProvider;