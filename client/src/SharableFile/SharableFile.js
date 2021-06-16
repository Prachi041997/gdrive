import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import './SharableFile.css';
import FileViewer from 'react-file-viewer'

const SharableFile = ()=> {
    let {filename} = useParams();
    const [link, setLink] = useState('');
    useEffect(()=>{
      setLink(`http://localhost:3000/api/file/${filename}`)
    }, [link])
    const onDownloadHandle = ()=> {
        fetch(`http://localhost:3000/api/file/${filename}`, {
            method: "GET"   
        })       
        .then(response=> response.blob())
        .then(blob=> {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `sample.jpg`)
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
     }
    return <div className='sharableContainer'>
   <div className='utilities'>
   <i className="ri-download-fill save" onClick={onDownloadHandle}></i>
   <i className="ri-close-fill close1" ></i>
   </div>
   <div className='modalImage'>        
  
   {link!=='' &&  <FileViewer className='test'  fileType='jpg' filePath={link}></FileViewer>
   }
   </div>
   </div>
}
export default SharableFile;