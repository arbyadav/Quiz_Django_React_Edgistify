import React, { Component } from 'react';
import './login.css'; // CSS STYLING
// import BaseRouter from './routes';
// import CustomLayout from './containers/Layout';
import axios from 'axios';

class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    onSubmit = e => {

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        };

        const body = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        });

        axios.post('http://127.0.0.1:8000/api/auth/login', body, config)
            .then(res => {
                console.log(res.data)
                if (res.data.token) {
                    this.setCookie("atn", res.data.token, 1)
                    this.props.setAuthenticated()
                }
            })

    };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">QUIZ MANIA</h1>

                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input type="text" name="username" onChange={(e) => this.onChange(e)} id="inputUsername" className="form-control" placeholder="Username" required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" onChange={(e) => this.onChange(e)} name="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <button className="btn btn-lg btn-primary btn-block" onClick={(e) => this.onSubmit(e)} type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy;AmitY</p>
            </form>
        );
    }
}

export default Login;
