import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './SignUp.css';
import { signup, authenticate } from '../../API/authapi';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import Brand from '../../Brand/Brand';
const SignUp = ()=> {   

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        redirect: '',
        loading: '',
        gender: ''
        
    })
    const [errors, setErrors] = useState('');
    const error ={
        name: '',
        email: '',
        password: ''
    }
    const {name, email, password, redirect, loading, gender} = values;
    const onChangeHandle = name => event=>{
        setValues({...values, [name]: event.target.value})
    }
    const onSignUpHandle = (e)=> {
      e.preventDefault();
      setValues({...values, loading: true})
      setErrors(false);
      signup({name, email, password, gender})
      .then(res=> {
          console.log(res);
          setValues({...values, loading: false})
          if(res.error){
              res.error.map(e=> {
                  console.log(e.param);
                  console.log(e);
                  error[e.param] = e.msg; 
              })
           setErrors(error)
          }
          else {
            authenticate(res, ()=> {
                setValues({...values, redirect: true, loading: false})
            })
          }
          console.log(error);
         
      }).catch(err=> console.log(err))
    }

    const showLoader = ()=> {
        return loading && <SkeletonLoader background=' #423b66' height='8px'></SkeletonLoader>
    }
    const performRedirect = ()=> {
       if(redirect) {
           console.log('redirect', redirect)
           return  <Redirect to='/'></Redirect>
       }
    }
    return (
        <React.Fragment>
        {performRedirect()}
        {showLoader()}
        <div className='signUpContainer flex'>
          <Brand color='#fff'/>
          <div className='signUpForm'>
            <p className='signupTitle'>SIGNUP</p>
            <form>
              {errors.name? <p className='error'>{errors.name}</p>: null}

              <p className='label'>Name</p>
              <input type='text' placeholder='John Doe' className='inputC' onChange={onChangeHandle('name')}></input>

              {errors.email? <p className='error'>{errors.email}</p >: null}

              <p className='label'>Email</p>
              <input type='email' placeholder='johndoe@gmail.com' className='inputC' onChange={onChangeHandle('email')}></input>

              {errors.password? <p className='error'>{errors.password}</p >: null}
              <p className='label'>Password</p>
              <input type='password'  className='inputC' onChange={onChangeHandle('password')}></input>

              <p className='label'>Gender</p>

              <input type="radio" name="gender" value="m"  className='inputR' onChange={onChangeHandle('gender')}></input>
              <label id='option'>Male</label>

              <input type="radio" name="gender" value="f" className='inputR' onChange={onChangeHandle('gender')}></input>
              <label id='option'>Female</label>

              <input type="radio" name="gender" value="o" className='inputR' onChange={onChangeHandle('gender')}></input>
              <label id='option'>Other</label>

             <div className='btnWrapper flex' style={{width:'100%'}}> <input type='submit' value='SIGNUP' className='signupBtn' onClick={onSignUpHandle}></input></div>

             <div className='btnWrapper flex' style={{width: '100%'}}>
             <Link to='/signin' className='signinLink'>Already Registered ? SIGNIN</Link>
             </div>
            </form>
          </div>
        </div>
        </React.Fragment>
    )
}
export default SignUp;