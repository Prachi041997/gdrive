/* global gapi */
import React, { useState, useEffect } from 'react';
import ContextMenu from './Components/ContextMenu/ContextMenu';
// import { gapi } from 'gapi-script'
import { Link } from 'react-router-dom';
import './Tst.css'
const GOOGLE_BUTTON_ID = "google-sign-in-button";

class Tesst extends React.Component {


  insertGapiScript(){
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = ()=> {
       this.initializeGoogleSigIn();
    }
    document.body.appendChild(script);
  }
  initializeGoogleSigIn()  {
    window.gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '339010871913-fumtjmskfo39a66ejj322n3b63e0gc48',
      })
      console.log('api inited')
      window.gapi.load('signin2', function () {
        // render a sign in button
        // using this method will show Signed In if the user is already signed in
        var opts = {
          width: 200,
          height: 50,
          onsuccess: () => {
            console.log('user has finished sigin');
          },
        }
        window.gapi.signin2.render('loginButton', opts)
      })
    })
  }
  componentDidMount() {
    console.log('cdm')
    this.insertGapiScript()
  }


render() {
  return (
    <React.Fragment>
     <div id='a'>
        <img src='https://img.icons8.com/dotty/2x/camera.png'></img>
        <input type='file'></input>
     </div>
    </React.Fragment>
  )
}
}
export default Tesst;