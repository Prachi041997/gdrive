import {API} from '../Backend';

export const signup = (user)=> {
    console.log(API);
    console.log(user);
    return fetch(`/api/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
    })
    .then(data => {
       return data.json()
    }).catch(err => console.log(err));
}
export const signin = (user)=> {
    console.log(API);
    console.log(user);
    return fetch(`/api/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
    })
    .then(data => {
       return data.json()
    }).catch(err => console.log(err));
}

export const authenticate = (data, next)=> {
    if(typeof(Window)!==undefined) {
        sessionStorage.setItem('jwt', JSON.stringify(data))
    }
    next();
}
export const isAuthenticated = ()=> {
    if(typeof(window)=== undefined) {
        return false;
    }
    if(sessionStorage.getItem('jwt')) {
        return JSON.parse(sessionStorage.getItem('jwt'))
    }else {
        return false;
    }
}
export const signout = (next)=> {
    if(typeof(window)!== undefined) {
        sessionStorage.removeItem("jwt")
        next();

        return fetch(`/signout`, {
            method: "GET"
        })
        .then(data => {
           return data.json()
        }).catch(err => console.log(err));
    }  
}