import axios from 'axios';
import { Component } from 'react';
import { Col, Container, Row, Form, Button } from 'reactstrap';
import React from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
export class ProductCreateNew extends Component {
    state = {
        token: `Bearer ${JSON.parse(localStorage.getItem('account')).token}`,
        productEndPoint: 'http://localhost:8000/product',
        categoryEndPoint: 'http://localhost:8000/category',
        categoryList: [],
        errorProduct: '',
    };

    getCategories() {
        axios
            .get(this.state.categoryEndPoint)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        categoryList: res.data,
                    });
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    componentDidMount() {
        this.getCategories();
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post(
                this.state.productEndPoint,
                {
                    productName: e.target.productName.value,
                    imageSrc: e.target.imageSrc.value,
                    description: e.target.description.value,
                    price: e.target.price.value,
                    quantity: e.target.quantity.value,
                    categoryID: e.target.categoryID.value,
                },
                {
                    headers: {
                        Authorization: this.state.token,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    if (window.confirm('Create success! Continue create new product?')) {
                        window.location = '/admin/createNew';
                    } else {
                        window.location = '/admin/productTable';
                    }
                }
            })
            .catch((error) => {
                this.setState({
                    errorProduct: error.response.data,
                });
            });
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Create new product</h1>
                <Container>
                    <Row>
                        <Col xs="6">
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Product name:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input required name="productName" />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.productNameError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Description:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input required name="description" />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.descriptionError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Image Src:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input required onChange={(e) => this.imageOnchange(e)} name="imageSrc" id="imageSrc" />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.imageSrcError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Quantity:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input required type="number" name="quantity" min="1" />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.quantityError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Price $ :</InputGroupText>
                                    </InputGroupAddon>
                                    <Input required type="number" name="price" min="1" />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.priceError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Category</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="categoryID" id="categoryID">
                                        {this.state.categoryList.map((cate) => (
                                            <option value={cate.categoryID}>{cate.categoryName}</option>
                                        ))}
                                    </Input>
                                </InputGroup>
                                <br></br>
                                <Button type="submit" color="success">
                                    Create
                                </Button>
                                <h3 style={{ textAlign: 'left', color: 'red' }}>{this.state.statusChange}</h3>
                            </Form>
                        </Col>
                        <Col xs="6">
                            <img style={{ width: '100%', height: '50%', marginTop: '10%' }} id="imageScrDisplay" alt="Product image" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
    imageOnchange(e) {
        document.getElementById('imageScrDisplay').src = e.target.value;
    }
}
