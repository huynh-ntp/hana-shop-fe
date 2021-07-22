import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
export class Checkout extends Component {
    state = {};
    handleSubmit(e) {}
    render() {
        return (
            <div className="loginForm">
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <h2>Checkout</h2>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="text" readOnly name="userName" placeholder="User name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Full name</Label>
                        <Input type="text" readOnly name="fullName" placeholder="password " />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Address</Label>
                        <Input type="text" readOnly name="fullName" placeholder="password " />
                    </FormGroup>

                    <Button className="button" type="submit" color="success">
                        Login
                    </Button>
                    <Link className="register" to="/register">
                        Register
                    </Link>
                    <h4>{this.state.loginMessage}</h4>
                </Form>
            </div>
        );
    }
}
