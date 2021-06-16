import React, { useState, useEffect } from 'react';
import './ModalFile.css';
import FileViewer from 'react-file-viewer'

const ModalFile = ({ show, filePath, fileType, hide}) => {
    
    // console.log(filePath, fileType)

    // console.log('show is ' , show);
    const [modalClass, setModalClass] = useState('')
     
     useEffect(()=> {
         if(show) {
            setModalClass('modal block')
         } else {
             setModalClass('modal none')
         }    
     },[show])

     const onDownloadHandle = ()=> {
        fetch(`${filePath}`, {
            method: "GET"   
        })       
        .then(response=> response.blob())
        .then(blob=> {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `sample.${fileType}`)
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
     }

 
   const onError = (e)=>{
        console.log(e, 'error in file-viewer');
      }
    return (
        <div className={modalClass} >
           <div className='utilities'>
           <i className="ri-download-fill save" onClick={onDownloadHandle}></i>
           <i className="ri-close-fill close1" onClick={hide}></i>
           </div>
           <div className='modalImage'>
             {fileType == 'jpeg' ||
              fileType == 'png' || 
              fileType=='jpg'? <img id='img' src={filePath}></img>: 
              
              fileType == 'pdf'? <iframe src={filePath} style={{width:"100%", height:"500px", overflow:'auto', backgroundSize:'cover'}}>
             </iframe>: 
             
             fileType == 'mp4'? <video controls="controls" id='video' style={{width:'100%', height:'100%'}}>
             <source src={filePath} type="video/mp4"></source>
             </video>: 
             
             fileType == 'text' || fileType == 'plain'? <object  style={{backgroundColor:'#fff', width:'100%', height:'100%', padding: '30px'}} type="text/plain" data={filePath} border="0" >
             </object>: <h1 style={{color:'#fff'}}>Reading {fileType} is not supported</h1>}
           
           </div>
        </div>
    )
}
export default ModalFile;
