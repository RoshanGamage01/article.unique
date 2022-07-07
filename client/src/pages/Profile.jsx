import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Profile(){
    const [userData, setUserData ] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:3000/api/user/me', {headers:{
            "x-auth-token": localStorage.getItem('auth-token')
        }}).then(response => {
            setUserData(response.data)
        }).catch(error => console.log(error.response.data))
    }, [])

    return (
        <section>
            <Navbar />
            <h1>{userData.firstName} {userData.lastName}</h1>
            <h1>{userData.email}</h1>
        </section>
    )
}

export default Profile;