import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import '../styles/profile.scss'

function Profile(){
    const [userData, setUserData ] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:3000/api/user/me', {headers:{
            "x-auth-token": localStorage.getItem('auth-token')
        }}).then(response => {
            setUserData(response.data)
        }).catch(error => console.log(error.response.data))
    }, [])
    console.log(userData.profileImage)
    return (
        <section>
            <Navbar />
            <div className="profile">
                <div className="profile-photo" style={{background: `url('${userData.profileImage}')`}}></div>
                <div className="bio">
                    <div className="user-name">{userData.firstName} {userData.lastName}</div>
                    <div className="user-email">{userData.email}</div>
                </div>
                <button>Edit profile</button>
            </div>
        </section>
    )
}

export default Profile;