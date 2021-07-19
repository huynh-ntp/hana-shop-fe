import axios from 'axios';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styleComponents/login.css';
export class Login extends Component {
    state = {
        enpoint: 'http://localhost:8000/account/login',
        loginMessage: '',
    };
    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.userName.value);
        console.log(e.target.password.value);
        axios
            .post(this.state.enpoint, {
                userName: e.target.userName.value,
                password: e.target.password.value,
            })
            .then((res) => {
                localStorage.setItem('account', JSON.stringify(res.data));
                localStorage.setItem('isLoggedIn', true);
                var login = this.props.login;
                if (res.data.role === 'ROLE_CUS') {
                    window.location = '/home';
                }
                if (res.data.role === 'ROLE_AD') {
                    window.location = '/admin';
                }
            })
            .catch((error) => {
                this.setState({
                    loginMessage: 'Incorect username or password',
                });
            });
    }
    componentDidMount() {}
    render() {
        return (
            <div className="loginForm">
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <h2>Login</h2>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="text" required name="userName" placeholder="User name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" required name="password" placeholder="password " />
                    </FormGroup>

                    <Button className="button" type="submit" color="success">
                        Login
                    </Button>
                    <Link className="register" to="/signup">
                        Register
                    </Link>
                    <h4>{this.state.loginMessage}</h4>
                </Form>
            </div>
        );
    }
}
