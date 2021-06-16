import React, { useState } from 'react';
import {reWrite} from '../../../API/fileapi'
import './Rename.css';
const Rename = ({ file, showModalContext, setShowModalContext, reload, setReload = f=>f })=> {
   console.log(file);
  const [rename, setRename] = useState('');

  const onChangeHandle = (e)=> {
      setRename(e.target.value);
  }

  const onRename = ()=> {
    reWrite(rename,file.filename)
    .then(data=> {
      console.log(data)
    setShowModalContext({...showModalContext, rename: false})
      setReload(!reload);
    })
  }

  const onCancel = ()=> {
    setShowModalContext({...showModalContext, rename: false})
  }

   return (
    <div className='renameContainer'>
    <div id='header'>
      <div id='logoContainer'>
        <div id='logo'>
        <i class="ri-pencil-line"></i>
        </div>
      </div>
      <div id='title' className='flex'>RENAME</div>
    </div>
    <div className='linkSection'>
      <div id='renameWrapper'>
        <input type='text' onChange={onChangeHandle}></input>
        <div className='btngrpWrapper'>
          <button id='btn1' onClick={onRename}>Ok</button>
          <button id='btn2' onClick={onCancel}>Cancel</button>

        </div>
      </div>
     </div>
  </div>
   )
}
export default Rename;