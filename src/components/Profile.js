import {useAuth0} from "@auth0/auth0-react";
import React from "react";

import "./Profile.css";
const Profile = props => {
    const {user} = useAuth0();
    return (
        <div className = "profile"
             style = {{right: props.width*4, top: props.width/3}}>
            {/*{JSON.stringify(user, null, 2)} */}
            <div style = {{width: "10px"}}/>
            <div className = "noSelect" style = {{marginLeft: "5%"}}> {user.nickname} </div>
            <img className= "profileImage"
                style = {{maxWidth: props.width, maxHeight: props.height+1}}
                 src = {user.picture} alt = "No profile picture loaded"/>
            <div style = {{width:"10px"}}/>
         </div>
    )
}

export default Profile;