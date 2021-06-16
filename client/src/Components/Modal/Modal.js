import React, { useState } from 'react';
import './Modal.css'
import { uploadFile } from '../../API/fileapi';
import { isAuthenticated } from '../../API/authapi';
import { ProgressBar } from 'react-bootstrap';
import FileViewer from "react-file-viewer";
let files;
const Modal = ({ show, hide, showUpload }) => {
    console.log(show);
    const showClass = show ? 'modal block' : 'modal none';
    console.log(showClass)
    const [values, setValues] = useState({
        name: 'Choose File',
        uploadPercent: '',
        error: ''
    })
    const { token, user } = isAuthenticated();
    const now = 60;

    const change = (event) => {
        console.log(event.target.files[0])
        console.log(event.target.files)

        files = event.target.files;
        setValues({ ...values, name: event.target.files[0].name })

    }

    const onUploadHandle = () => {
        if (values.name !== 'Choose File') {
            setValues({ ...values, error: false })
            let data = new FormData();
            data.append('file', files[0]);

            const options = {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percentage = Math.floor(loaded * 100 / total);
                    console.log(`${loaded} out of ${total} | ${percentage}`)
                    if (percentage < 100) {
                        setValues({ ...values, uploadPercent: percentage })
                    }
                }
            }

            uploadFile(user.id, data, options.onUploadProgress)
                .then(res => {
                    console.log(res);
                    setValues({ ...values, uploadPercent: 100 })
                    setTimeout(() => {
                        setValues({ ...values, uploadPercent: 0 })
                        hide();
                    }, 1000)
                });
        } else {
            setValues({ ...values, error: true })
        }

    }
    return (
        <div className={showClass}>
        <div className='utilities'>
        <i className="ri-close-fill close1" onClick={hide}></i>
        </div>
        {showUpload && <div className='modal-main '>
                 <div className='uploadWrapper '>

                    {values.error && <p className='error' style={{ fontSize: '18px', marginBottom: '10px' }}>Choose File To Upload</p>}
                    <div className="custom-file">
                        <input type="file"  className="custom-file-input" id="customFile" onChange={change}></input>
                        <label className="custom-file-label" htmlFor="customFile">{values.name}</label>
                    </div>
                    <button className='uploadFile' onClick={onUploadHandle}>Upload</button>
                    <div style={{ width: '100%', height: '30px', marginTop: '15px' }}>
                        {values.uploadPercent > 0 && <ProgressBar now={values.uploadPercent} label={`${values.uploadPercent}%`} animated style={{ height: '20px' }} />}
                    </div>
                </div>
                
            </div>}   
        </div>
    )
}
export default Modal;
