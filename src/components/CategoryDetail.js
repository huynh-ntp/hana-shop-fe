import axios from 'axios';
import { Component } from 'react';
import { Col, Container, Row, Form, Button } from 'reactstrap';
import React from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Label } from 'reactstrap';

export class CategoryDetail extends Component {
    state = {
        category: '',
        token: localStorage.getItem('account') !== null ? `Bearer ${JSON.parse(localStorage.getItem('account')).token}` : '',
        categoryError: '',
        categoryEndpoint: 'http://localhost:8000/category/',
        categoryNotFound: '',
        statusChange: '',
        cannotDeleteMessage: '',
    };

    getCategory() {
        let path = window.location.pathname;
        let categoryID = path.split('/')[3];
        axios
            .get(this.state.categoryEndpoint + categoryID, {
                headers: {
                    Authorization: this.state.token,
                },
            })
            .then((res) => {
                this.setState({
                    category: res.data,
                });
            })
            .catch((error) => {
                this.setState({
                    categoryNotFound: error.response.data,
                });
                console.log(error.response.data);
            });
    }
    componentDidMount() {
        this.getCategory();
    }

    categoryNameChange(categoryName) {
        let category = this.state.category;
        category.categoryName = categoryName;
        this.setState({
            category: category,
        });
    }
    hanleDelete(categoryID) {
        axios
            .delete(this.state.categoryEndpoint + categoryID, {
                headers: {
                    Authorization: this.state.token,
                },
            })
            .then((res) => {
                this.setState({
                    statusChange: res.data,
                });
                setTimeout(() => {
                    window.location = '/admin/categoryTable';
                }, 2000);
            })
            .catch((error) => {
                this.setState({
                    cannotDeleteMessage: error.response.data,
                });
            });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(
                this.state.categoryEndpoint,
                {
                    categoryID: e.target.categoryID.value,
                    categoryName: e.target.categoryName.value,
                },
                {
                    headers: {
                        Authorization: this.state.token,
                    },
                }
            )
            .then((res) => {
                this.setState({
                    statusChange: 'Update success!',
                });
                setTimeout(() => {
                    this.setState({
                        statusChange: '',
                    });
                }, 3000);
            })
            .catch((error) => {
                this.setState({
                    categoryError: error.response.data,
                });
            });
    }
    render() {
        if (this.state.categoryNotFound !== '') {
            return (
                <div>
                    <h2>Not found category</h2>
                </div>
            );
        }
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Category Detail</h1>
                <Container>
                    <Row>
                        <Col xs="2"></Col>
                        <Col xs="6">
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>CategoryID:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input readOnly name="categoryID" value={this.state.category.categoryID} />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.categoryError.categoryIDError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Category name:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="categoryName" required onChange={(e) => this.categoryNameChange(e.target.value)} value={this.state.category.categoryName} />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.categoryError.categoryNameError}</p>
                                <Button type="submit" color="warning">
                                    Update
                                </Button>
                                <Button onClick={(e) => this.hanleDelete(this.state.category.categoryID)} style={{ marginLeft: '20px' }} color="danger">
                                    Delete
                                </Button>
                                <h3 style={{ textAlign: 'left', color: 'red' }}>{this.state.statusChange}</h3>
                                <h3 style={{ textAlign: 'left', color: 'red' }}>{this.state.cannotDeleteMessage}</h3>
                            </Form>
                        </Col>
                        <Col xs="4"></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
