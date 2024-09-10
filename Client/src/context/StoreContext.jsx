import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = 'http://localhost:4000/api'
    const [allBlogs, setAllBlogs] = useState([]);



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
    getAllBlogs();   
    },[])




    const contextValue = {
        getAllBlogs
    }

  return (
    <storeContext.Provider value = {contextValue}>
        {props.children}
    </storeContext.Provider>
  )
}

export default StoreContextProvider;