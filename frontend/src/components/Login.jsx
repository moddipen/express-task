import React, { Component } from "react";
import {
  Button
} from "reactstrap";
import { login } from "../services/LoginService";

class Login extends Component {

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push("/");
        }
    }

    login = e => {
        login().then((result) => {
            localStorage.setItem('token', result.data.accessToken)
            this.props.history.push("/");
        }).catch(err => {
            alert("login failed")
        })
    };

    render() {
        return (
            <Button onClick={this.login}>Login</Button>
        );
    }
}

export default Login;
