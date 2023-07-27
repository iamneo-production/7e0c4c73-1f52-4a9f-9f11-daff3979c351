import React from "react";
import './ProfileDropDown.css'
const ProfileDropDown=({isAdmin})=>{
    return (
        <div>
            <select className="dropDown">
                <option>
                    Profile
                </option>
                <option>
                    Create a new movie
                </option>
                <option>
                    Create a new cast
                </option>
                <option>
                    Logout
                </option>
            </select>
        </div>
    );
}

export default ProfileDropDown;