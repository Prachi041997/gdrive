import React, { useState, useEffect } from 'react';
import './Card.css'
import { API } from '../../Backend'
import ModalFile from '../ModalFile/ModalFile';
import ContextMenu from '../ContextMenu/ContextMenu';
const Card = ({ file ,
                setShowToast,
                showToast,
                setReload = f=> f,
                reload,
                reloadStar,
                setreloadStar,
                showModalContext,
                setShowModalContext

              }) => {
                console.log(reload);
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true)
  }
  const hideModal = () => {
    setShow(false);
    const v = document.getElementById('video');
    
    if(v)
    v.pause();   
  }
  const [showContext, setShowContext] = useState(false);
   const [style, setStyle] = useState({
        top:'',
        left:'',
        backgroundcolor:''
   })
   const [isStar, setIsStar] = useState(file.metadata.star);
    const showContextMenu =(e)=> {
      e.preventDefault();
      console.log('right click')
      setShowContext(!showContext);
      setStyle({...style, top:e.pageY + 'px', left: e.pageX + 'px', backgroundcolor:'rgb(242, 232, 252)'})
      
     window.addEventListener('click', ()=> {
         console.log('left click');
         setShowContext(false)
         setStyle({...style, backgroundcolor:'#fff'})
     })
    }

  const fileURL = `${API}file/${file.filename}`;
  const fileType = file.contentType.split('/')[1]
  const str = file.contentType.split('/')[1];
  



  return (
    <React.Fragment>
      <div className='cardContainer' id='cardmenu' onDoubleClick={showModal} >
        <div className='cardImage'>
          {fileType=='mp4'? <img src='https://img.icons8.com/clouds/2x/video-playlist.png'></img>:

          fileType=='text' || fileType=='plain'? <img src='https://img.icons8.com/officel/2x/txt.png'></img>:

          fileType=='pdf'?<img src='https://img.icons8.com/doodle/2x/pdf-2.png'></img>: 
          
          fileType=='png' || fileType=='jpg' || fileType=='jpeg'?
          <img src={fileURL}></img>:

          <img src='https://img.icons8.com/cotton/2x/file.png'></img> }

        </div>
        <div className='cardText flex' style={{backgroundColor:`${style.backgroundcolor}`}} onContextMenu={showContextMenu}>
          <p>{file.metadata.originalname}</p>
        </div>
      </div>
      
      {showContext && <ContextMenu top={style.top}
                                   left={style.left}
                                   file={file}
                                  isStar={isStar}
                                  setIsStar={setIsStar}
                                  showToast={showToast}
                                  setShowToast={setShowToast}
                                  setReload={setReload}
                                  reload={reload}
                                  reloadStar={reloadStar}
                                  setreloadStar={setreloadStar}
                                  setShowModalContext={setShowModalContext}
                                  showModalContext={showModalContext}
                                   >
                                  </ContextMenu>}
      <ModalFile show={show} filePath={fileURL} fileType={file.contentType.split('/')[1]} hide={hideModal}></ModalFile>

    </React.Fragment>
  )
}
export default Card;