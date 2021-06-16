import React, { useState, useEffect } from 'react';
import './SharableModal.css';

const SharableModal = ({ file, showModalContext, setShowModalContext }) => {
  console.log(showModalContext);
  console.log(setShowModalContext);
  const [link, setLink] = useState('')
  useEffect(() => {
    setLink(`https://${window.location.hostname}/api/file/${file.filename}`)
  }, [link])
  const copy = () => {
    var copyText = document.getElementById("link");
    var btn = document.getElementById("btnCopy");

    copyText.select();
    document.execCommand("Copy");
    // alert("Copied to clipboard!");
    btn.innerHTML = 'Copied'

  }
  const hideModal = ()=> {
    setShowModalContext({...showModalContext, sharable: false})
  }
  return (
    <div className='linkContainer'>
      <div id='header'>
        <div id='logoContainer'>
          <div id='logo'>
            <i className="ri-share-forward-2-line"></i>
          </div>
        </div>
        <div id='title' className='flex'>GET LINK</div>
      </div>
      <div className='linkSection'>
        <div className='copyLinkWrapper flex'>
          {link !== '' && <textarea id="link" rows="1" cols="35">{link}</textarea>
          }
          <button id="btnCopy" onClick={copy}>Copy text</button>
        </div>
      </div>
      <div className='btnWrapper flex' onClick={hideModal}>
         <button>Done</button>
      </div>
    </div>
  )
}
export default SharableModal;