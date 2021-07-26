import axios from 'axios';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styleComponents/login.css';
export class Register extends Component {
    state = {
        enpoint: 'http://localhost:8000/account/signup',
        passwordNotMatch: '',
        objectError: null,
        successMessage: '',
    };
    handleSubmit(e) {
        e.preventDefault();
        if (e.target.password.value !== e.target.confirm.value) {
            this.setState({
                passwordNotMatch: 'Password is not match',
            });
        } else {
            this.setState({
                passwordNotMatch: '',
            });
            axios
                .post(this.state.enpoint, {
                    userName: e.target.userName.value,
                    password: e.target.password.value,
                    fullName: e.target.fullName.value,
                    email: e.target.email.value,
                })
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        successMessage: 'Register success!',
                    });
                    setTimeout(() => {
                        window.location = '/login';
                    }, 2000);
                })
                .catch((error) => {
                    this.setState({
                        objectError: error.response.data,
                    });
                    console.log(error.response.data);
                });
        }
    }
    componentDidMount() {
        console.log('okeoke');
    }
    render() {
        return (
            <div className="loginForm">
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <h2>Register</h2>
                    <FormGroup>
                        <Label for="userName">Username:</Label>
                        <Input type="text" required name="userName" />
                    </FormGroup>
                    <p className="error">{this.state.objectError === null ? '' : this.state.objectError.userNameError}</p>
                    <FormGroup>
                        <Label for="fullName">Full name:</Label>
                        <Input type="text" required name="fullName" />
                    </FormGroup>
                    <p className="error">{this.state.objectError === null ? '' : this.state.objectError.fullNameError}</p>
                    <FormGroup>
                        <Label for="email">Email:</Label>
                        <Input type="email" required name="email" />
                    </FormGroup>
                    <p className="error">{this.state.objectError === null ? '' : this.state.objectError.emailError}</p>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input type="password" required name="password" />
                    </FormGroup>
                    <p className="error">{this.state.objectError === null ? '' : this.state.objectError.passwordError}</p>
                    <FormGroup>
                        <Label for="confirm">Confirm password:</Label>
                        <Input type="password" required name="confirm" />
                    </FormGroup>
                    <p className="error">{this.state.passwordNotMatch}</p>
                    <Button className="button" type="submit" color="success">
                        Register
                    </Button>
                    <Link className="register" to="/login">
                        I have account!
                    </Link>
                    <h4>{this.state.successMessage}</h4>
                </Form>
            </div>
        );
    }
}
