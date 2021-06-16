import React, {useState} from 'react';
import pdf from './Components/Modal/a.pdf';
import axios from 'axios';
import VideoPlayer from 'simple-react-video-thumbnail';
import VideoThumbnail from 'react-video-thumbnail';
import './Tst.css';
const test = ()=> {
    
  
    const onSubmit = ()=> {

         fetch(`http://localhost:3000/api/file/77baad752896f718dca15ea4e4a22763.jpg`, {
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

    const copy = ()=> {
        var copyText = document.getElementById("myText");
        var btn = document.getElementById("btnCopy");

        copyText.select();
        document.execCommand("Copy");
        // alert("Copied to clipboard!");
        btn.innerHTML = 'Copied'
     
    }
    return(
        <div style={{width:'300px', height:'400px'}}>
        <textarea id="myText" rows="6" cols="22">This is the text content that will be copied to the clipboard.</textarea><br/>
        <button id="btnCopy" onClick={copy}>Copy text</button>
          
   
        </div>
    )
}
export default test;