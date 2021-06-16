import React, {useEffect, useState} from 'react';
import Nav from '../Components/Nav/Nav';
import './Home.css'
import { isAuthenticated } from '../API/authapi';
import { getAllFiles, getFile } from '../API/fileapi';
import {API} from '../Backend';
import Card from '../Components/Card/Card';
import ModalFile from '../Components/ModalFile/ModalFile';
import ModalContext from '../Components/ModalContext/ModalContext';
import { withRouter } from 'react-router-dom';
import empty from './surr.png';
const Home = (history)=> {
  
   const [files, setFiles] = useState([]);
   const [reload, setReload] = useState(false);
   const [reloadHome, setReloadHome] = useState(false);

   const [showToast, setShowToast] = useState({
      bol: false,
      msg: ''
   });
   const [showModalContext, setShowModalContext] = useState({
      sharable: '',
      rename: '',
      file: ''
   });
   
   const {token, user} = isAuthenticated();
   
  
   const imageURL = `${API}file/95d50e0cf45327bcdd0ea3dd2b1367e2`
   useEffect(()=> {
     console.log('use-effect')
     console.log(reload);
     console.log(reloadHome)
      getAllFiles(user.id)
      .then(res=> {
         setFiles(res.files)
      })
   },[reload, reloadHome])

   
  
   return (
      <React.Fragment>
       {console.log(files.length)}
         <div className='homeContainer'>
            <Nav reloadHome={reloadHome}
            setReloadHome={setReloadHome} user={user}></Nav>
            <div className='main' >
               {files.length != 0?files.map(file=> {
                  return <Card key={file._id}
                               file={file}
                               setShowToast={setShowToast} 
                               showToast={showToast}
                               showModalContext={showModalContext}
                               setShowModalContext={setShowModalContext}
                               reload={reload}
                               setReload={setReload}
                               ></Card>
               }): <div id='imagediv'>
               <img src={empty}></img>
               <h1>No files to Show!</h1>
               </div>}
            </div>
            {showToast.bol && <div className='toastContainer'>
              <p>{showToast.msg}</p>
            </div>}
         </div>
       {showModalContext.sharable &&  <ModalContext file={showModalContext.file} showModalContext={showModalContext} setShowModalContext={setShowModalContext}></ModalContext> }

       {showModalContext.rename && 
          <ModalContext file=
          {showModalContext.file} 
          showModalContext={showModalContext} 
          setShowModalContext={setShowModalContext}
          reload={reload}
          setReload={setReload}></ModalContext> }

         
      </React.Fragment>
   )
}
export default withRouter(Home);