import React, {useEffect, useState} from 'react';
import './Starred.css'
import Nav from '../Components/Nav/Nav';
import { getStar } from '../API/fileapi';
import { isAuthenticated } from '../API/authapi';
import Card from '../Components/Card/Card';
import empty from '../Home/surr.png';
import { Link } from 'react-router-dom';


const Starred = () => {
    const [files, setFiles] = useState([]);
    const [reloadStar, setreloadStar] = useState(false);
    const [showToast, setShowToast] = useState({
        bol: false,
        msg: ''
     });
     const {token, user} = isAuthenticated();
    useEffect(()=> {
       getStar(user.id)
       .then(data=> {
           console.log(data)
           setFiles(data.data);
       })
    },[reloadStar])
    return (<React.Fragment>
        <div className='homeContainer'>
            <Nav user={user}></Nav>
            <div className='main' >
             
              {files.length!=0? files.map(file=> {
                  return <Card file={file}
                               key={file._id} 
                               setShowToast={setShowToast} 
                               showToast={showToast}
                               reloadStar={reloadStar}
                               setreloadStar={setreloadStar}
                               ></Card>
              }):<div id='imagediv'>
              <img src={empty}></img>
              <h1>No files Starred!</h1>
               <Link to='/'><button id='imagedivbtn'>Go To Home</button></Link>
              </div>}
            </div>
            {showToast.bol && <div className='toastContainer'>
              <p>{showToast.msg}</p>
            </div>}
        </div>
    </React.Fragment>)
}
export default Starred;