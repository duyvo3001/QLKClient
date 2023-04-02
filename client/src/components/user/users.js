import { useState , useEffect } from "react";
import axios from "../../api/axios";

const Users=() =>{
    const [users,setUsers] = useState();
    
    useEffect(()=>{
        let isMuounted = true ;
        const controller = new AbortController()

        const getUsers= async() =>{
            try{
                const res = await axios.get('users',{
                    signal: controller.signal
                })
                console.log(res.data)
                isMuounted && setUsers(res.data)
            }catch(err){
                console.log(err);
            }
        }
        getUsers()

        return() =>{
            isMuounted = false ;
            controller.abort();
        }

    },[])

    return (
        <div>users</div>
      )
} 
export default Users