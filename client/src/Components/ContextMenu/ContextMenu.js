import React, {useState, useEffect} from 'react';
import './ContextMenu.css';
import { markStar, removeFile } from '../../API/fileapi';
import { isAuthenticated } from '../../API/authapi';
import Modal from '../Modal/Modal';
import ModalFile from '../ModalFile/ModalFile';
const ContextMenu = ({ top,
                       left, 
                       file, 
                       isStar, 
                       setIsStar, 
                       showToast, 
                       setShowToast, 
                       setReload , 
                       reload,
                       reloadStar,
                       setreloadStar,
                       showModalContext,
                       setShowModalContext   
                    }) => {
  
    const { token, user } = isAuthenticated();
    const star = () => {
        markStar(user.id, file.filename)
            .then(data => {
                console.log(data);
                if(data.success){
                    console.log('inside success')
                    setIsStar(true)
                    setShowToast({...showToast, bol:true, msg:'File Added to Starred'})
                    setTimeout(()=> {
                      setShowToast({...showToast, bol:false})
                    }, 3000)

                } else {
                    console.log('inside else')
                    setIsStar(false)
                    setShowToast({...showToast, bol:true, msg:'File Removed From Starred'})
                    setTimeout(()=> {
                        setShowToast({...showToast, bol:false})
                      }, 3000)
                     console.log(reload);
                     setreloadStar(!reloadStar);

                }
            })
    }
    const showModal = ()=> {
        setShowModalContext({...showModalContext, sharable: true, file: file, rename: false});
    }
    const deleteFile = ()=> {
        removeFile(user.id, file.filename)
        .then(result=> {
            console.log(result);
            console.log(reload);
            setReload(!reload);
        })
    }
    const onRename = ()=> {
        setShowModalContext({...showModalContext, rename: true, sharable: false, file: file})
    }
    return (
        <React.Fragment>
        <div id="context-menu" style={{ top: `${top}`, left: `${left}` }}>
        <div id='context-item' onClick={onRename}>
            <div id='context-icon'><i className="ri-pencil-fill"></i></div>
            <div id='context-option'>Rename</div>
        </div>
        <div id='context-item' onClick={star}>
            <div id='context-icon'><i class="ri-star-fill"></i></div>
            <div id='context-option'>{isStar ? 'Remove From Star' : 'Add to Star'}</div>
        </div>
        <div id='context-item' onClick={showModal}>
            <div id='context-icon'><i class="ri-share-fill"></i></div>
            <div id='context-option'>Get Sharable Link</div>
        </div>
        <div id='context-item'  onClick={deleteFile}>
            <div id='context-icon'><i class="ri-delete-bin-6-fill"></i></div>
            <div id='context-option'>Remove</div>
        </div>
    </div>
     
        </React.Fragment>
    )
}
export default ContextMenu;