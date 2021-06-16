import React, { useEffect, useState } from 'react';
import './Photo.css'
import axios from 'axios' 
const Photo = ({user, reloadHome, setReloadHome=f=>f}) => {
    console.log(user);
    let imageURL = user.gender ==='f'? 'https://img.icons8.com/cotton/2x/user-female--v6.png': 'https://img.icons8.com/color/2x/circled-user-male-skin-type-3.png';
    
    
   

    return <React.Fragment>
       {console.log('Photo')}
        <div className='profilePic'>
            <img id='pp'src={imageURL}></img>
            <div id='overlay'>
            

           
            </div>
        </div>
    </React.Fragment>
}
export default Photo