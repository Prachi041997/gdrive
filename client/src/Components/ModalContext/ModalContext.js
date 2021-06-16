import React from 'react';
import './ModalContext.css';
import SharableModal from './SharableModal/SharableModal';
import Rename from './RenameModal/Rename';
const ModalContext = ({file, 
                      showModalContext, 
                      setShowModalContext, 
                      setReload = f=> f, 
                      reload=undefined,})=> {
    console.log(showModalContext);
    console.log(setShowModalContext);
   return(
       <div className='test flex'>
       {showModalContext.sharable && <SharableModal file={file} showModalContext={showModalContext}
       setShowModalContext={setShowModalContext}
      ></SharableModal> }
      {showModalContext.rename && <Rename file={file} showModalContext={showModalContext}
      setShowModalContext={setShowModalContext} reload={reload} setReload={setReload}></Rename>}
       </div>
   )
}
export default ModalContext;