import axios from 'axios';
import { Component } from 'react';
import { Col, Container, Row, Form, Button } from 'reactstrap';
import React from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';

export class UserDetail extends Component {
    state = {
        userInformation: '',
        userEnpoint: 'http://localhost:8000/api/user/',
        account: '',
        token: '',
        modal: false,
    };

    getInformation() {
        let account = JSON.parse(localStorage.getItem('account'));
        axios
            .get(this.state.userEnpoint + account.username, {
                headers: {
                    Authorization: `Bearer ${account.token}`,
                },
            })
            .then((res) => {
                this.setState({
                    userInformation: res.data,
                });
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        this.setState({
            account: account,
            token: `Bearer ${account.token}`,
        });
    }
    componentDidMount() {
        this.getInformation();
    }
    nameChange(name) {
        if (name !== '') {
            let userInformation = this.state.userInformation;
            userInformation.fullName = name;
            this.setState({
                userInformation: userInformation,
            });
        }
    }
    emailChange(email) {
        if (email !== '') {
            let userInformation = this.state.userInformation;
            userInformation.email = email;
            this.setState({
                userInformation: userInformation,
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let userInformation = this.state.userInformation;
        axios
            .put(
                this.state.userEnpoint,
                {
                    userName: userInformation.userName,
                    password: userInformation.password,
                    fullName: userInformation.fullName,
                    roleID: userInformation.roleID,
                    email: userInformation.email,
                    status: userInformation.status,
                },
                {
                    headers: {
                        Authorization: this.state.token,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        modal: !this.state.modal,
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });
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
                                    <InputGroupText>Fullname:</InputGroupText>
                                </InputGroupAddon>
                                <Input name="fullName" required="" onChange={(e) => this.nameChange(e.target.value)} value={this.state.userInformation.fullName} />
                            </InputGroup>
                            <br></br>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Email</InputGroupText>
                                </InputGroupAddon>
                                <Input type="email" onChange={(e) => this.emailChange(e.target.value)} required="" name="productID" value={this.state.userInformation.email} />
                            </InputGroup>
                            <br></br>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>RoleID</InputGroupText>
                                </InputGroupAddon>
                                <Input type="email" readOnly name="roleID" value={this.state.userInformation.roleID} />
                            </InputGroup>
                            <br></br>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Status</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" readOnly name="status" value={this.state.userInformation.status ? 'Active' : 'De-Active'} />
                            </InputGroup>
                            <br></br>

                            <Button type="submit" color="warning">
                                Save
                            </Button>
                            <Button style={{ marginLeft: '10%' }} onClick={() => (window.location = '/user/changePassword')} color="danger">
                                Change Password
                            </Button>
                        </Form>
                    </Col>
                    <Col sm="2"></Col>
                </Row>
                <div>
                    <Modal isOpen={this.state.modal}>
                        <ModalHeader>HanaShop</ModalHeader>
                        <ModalBody style={{ color: 'red' }}>
                            <h2 style={{ color: 'green' }}>Update success! Please re-login to reload information!</h2>
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
