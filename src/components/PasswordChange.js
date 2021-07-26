import axios from 'axios';
import { Component } from 'react';
import { Col, Container, Row, Form, Button } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';

export class PasswordChange extends Component {
    state = {
        authEndPoint: 'http://localhost:8000/account/',
        userEndPoint: 'http://localhost:8000/api/user/',
        oldPassError: '',
        newPasswordError: '',
        confirmError: '',
        modal: false,
    };

    login(oldPass, newPass) {
        let account = JSON.parse(localStorage.getItem('account'));
        axios
            .post(this.state.authEndPoint + 'login', {
                userName: account.username,
                password: oldPass,
            })
            .then((res) => {
                this.setState({
                    oldPassError: '',
                    isError: false,
                    newPasswordError: '',
                });
                this.changePassword(newPass);
            })
            .catch((error) => {
                this.setState({
                    oldPassError: 'Old password is not correct!',
                });
            });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (e.target.newPassword.value !== e.target.confirmPassword.value) {
            this.setState({
                confirmError: 'Confirm password is not match!',
            });
        } else {
            this.setState({
                confirmError: '',
            });
            if (e.target.newPassword.value.length <= 6) {
                this.setState({
                    newPasswordError: 'Password is too weak, at least 7 letter',
                });
            } else {
                this.login(e.target.oldPassword.value, e.target.newPassword.value);
            }
        }
    }

    changePassword(newPass) {
        console.log('change pass run');
        let account = JSON.parse(localStorage.getItem('account'));
        console.log(this.state.oldPassError);
        if (this.state.oldPassError === '' && this.state.confirmError === '' && this.state.newPasswordError === '') {
            axios
                .put(
                    this.state.userEndPoint + 'password',
                    {
                        userName: account.username,
                        newPass: newPass,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${account.token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log('chay vo change sucess');
                    this.setState({
                        newPasswordError: '',
                        modal: true,
                        confirmError: '',
                    });
                })
                .catch((error) => {});
        }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="9">
                        <Form onSubmit={(e) => this.handleSubmit(e)} style={{ marginTop: '25%' }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Password</InputGroupText>
                                </InputGroupAddon>
                                <Input type="password" required name="oldPassword" />
                            </InputGroup>
                            <p style={{ color: 'red' }}>{this.state.oldPassError}</p>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>New password</InputGroupText>
                                </InputGroupAddon>
                                <Input type="password" required name="newPassword" />
                            </InputGroup>
                            <p style={{ color: 'red' }}>{this.state.newPasswordError}</p>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Confirm password</InputGroupText>
                                </InputGroupAddon>
                                <Input type="password" required name="confirmPassword" />
                            </InputGroup>
                            <p style={{ color: 'red' }}>{this.state.confirmError}</p>
                            <Button type="submit" color="warning">
                                Save
                            </Button>
                            <p style={{ color: 'red' }}>{this.state.messageSuccess}</p>
                        </Form>
                    </Col>
                    <Col sm="2"></Col>
                </Row>
                <div>
                    <Modal isOpen={this.state.modal}>
                        <ModalHeader>HanaShop</ModalHeader>
                        <ModalBody style={{ color: 'red' }}>
                            <h2 style={{ color: 'green' }}>Change password success!</h2>
                            <Button
                                color="secondary"
                                onClick={() => {
                                    this.setState({ modal: !this.state.modal });
                                }}
                            >
                                Oke
                            </Button>
                        </ModalBody>
                    </Modal>
                </div>
            </Container>
        );
    }
}
