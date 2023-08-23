import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../../constants';
import { Navigate } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {     
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        console.log(token)
        console.log(ACCESS_TOKEN)
        localStorage.setItem(ACCESS_TOKEN, token)
        console.log(localStorage)
        console.log(localStorage.ACCESS_TOKEN)
        console.log(error)   
        return (
            token && 
                <Navigate to={{
                    pathname: "/profile",
                    state: { from: this.props.location }
                }}/>
            
                // <Navigate to={{
                //     pathname: "/login",
                //     state: { 
                //         from: this.props.location,
                //         error: error 
                //     }
                // }}/>
        )
    }
}


export default OAuth2RedirectHandler;