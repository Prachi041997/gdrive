import React, { useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Nav.css';
import Modal from '../Modal/Modal';
import Photo from '../Photo/Photo';
import { signout } from '../../API/authapi';
const Nav = ({reloadHome, setReloadHome=f=>f, user, history}) => {
    const [show, setShow] = useState(false);
    const [showUpload, setShowUpload] = useState('');

    const showModal = ()=> {
        setShow(true)
    }
    const hideModal = ()=> {
        setShow(false)
        setReloadHome(!reloadHome)
    }
    const logout = ()=> {
        signout(()=> {
            history.push('/signin')
        })
    }
    const changePage = (para)=> {
         history.push(`/${para}`)
    }
    return (
        
        <React.Fragment>
        {console.log('Reloaded')}
            <div className='navContainer'>
                <div className='profile'>
                    <Photo user={user} reloadHome={reloadHome} setReloadHome={setReloadHome}/>
                    <p className='userName'>{user.name}</p>
                </div>
                <div className='dashboardOptions'>

                <div className='optionWrapper flex' style={{ width: '100%' }}>
                    <div className='option flex'>
                            <div className='icon flex'><i className="ri-home-3-line"></i></div>
                            <div className='optionname' onClick={()=>changePage('')}>Home</div>
                       </div>
                    </div>
                    <div className='optionWrapper flex' style={{ width: '100%' }}>
                        <div className='option flex'>
                            <div className='icon flex'><i className="ri-folder-upload-fill"></i></div>
                            <div className='optionname' onClick={showModal}>Upload File</div>
                       </div>
                    </div>

                    
                     <div className='optionWrapper flex' style={{ width: '100%' }}>
                        
                        <div className='option flex'>
                           <div className='icon flex'><i className="ri-star-fill"></i></div>
                           <div className='optionname' onClick={()=>changePage('starred')}>Starred</div>
                        </div>
                        
                    </div>
                    

                    


                    <div className='optionWrapper flex' style={{ width: '100%' }}>
                        <div className='option flex'>
                            <div className='icon flex'><i className="ri-logout-circle-fill"></i></div>
                            <div className='optionname' onClick={logout}>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} hide={hideModal} showUpload={true}></Modal>
        </React.Fragment>
    )
}
export default withRouter(Nav);