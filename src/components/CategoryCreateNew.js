import axios from 'axios';
import { Component } from 'react';
import { Col, Container, Row, Form, Button } from 'reactstrap';
import React from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
export class CategoryCreateNew extends Component {
    state = {
        token: `Bearer ${JSON.parse(localStorage.getItem('account')).token}`,
        categoryEndPoint: 'http://localhost:8000/category',
        errorCategory: '',
    };
    componentDidMount() {}
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post(
                this.state.categoryEndPoint,
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
                if (res.status === 200) {
                    if (window.confirm('Create success! Continue create new category?')) {
                        window.location = '/admin/categoryCreate';
                    } else {
                        window.location = '/admin/categoryTable';
                    }
                }
            })
            .catch((error) => {
                this.setState({
                    errorCategory: error.response.data,
                });
            });
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Create new category</h1>
                <Container>
                    <Row>
                        <Col xs="3"></Col>
                        <Col xs="6">
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>CategoryID</InputGroupText>
                                    </InputGroupAddon>
                                    <Input required name="categoryID" />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorCategory.categoryIDError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Category name</InputGroupText>
                                    </InputGroupAddon>
                                    <Input required name="categoryName" />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorCategory.categoryNameError}</p>

                                <Button type="submit" color="success">
                                    Create
                                </Button>
                            </Form>
                        </Col>
                        <Col xs="3"></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
