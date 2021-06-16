import React ,{useState}from 'react';
import {Link, Redirect} from 'react-router-dom';
import './SignIn.css';
import { signin , authenticate} from '../../API/authapi';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import Brand from '../../Brand/Brand';

const SignIn = ()=> {
  const [values, setValues] = useState({
    email: '',
    password: '',
    redirect: '',
    loading: '' 
})
const [errors, setErrors] = useState('');

const error ={
    email: '',
    password: ''
}
const { email, password, redirect, loading} = values;
const onChangeHandle = name => event=>{
    setValues({...values, [name]: event.target.value})
}

const loginHandle = (e)=> {
  e.preventDefault();
  setValues({...values, loading: true})
  setErrors(false)
  signin({email, password})
  .then(res=> {
    console.log(res);
    setValues({...values, loading: false})
    if(res.error){
      
        
        setErrors(res.error);
      
        
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
       <div className='signInContainer flex'>
       <Brand color='#383061'/>
       <div className='signInForm'>
         <p className='signInTitle'>WELCOME</p>
         <form>
         
         {errors? <p className='error'>{errors}</p>: null}
         
           <p className='labelsignin'>Email</p>
           <input type='email' placeholder='johndoe@gmail.com' className='inputC' onChange={onChangeHandle('email')}></input>

          
           
           <p className='labelsignin'>Password</p>
           <input type='password' className='inputC' onChange={onChangeHandle('password')}></input>

          <div className='btnWrapper flex' style={{width:'100%'}}> <input type='submit' value='SIGNIN' className='loginBtn' onClick={loginHandle}></input></div>
          <div className='btnWrapper flex' style={{width: '100%'}}>
          <Link to='/register' className='signupLink'>Haven't Registered Yet? SIGNUP</Link>
          </div>
         </form>
       </div>
     </div>
       </React.Fragment>
    )
}
export default SignIn;