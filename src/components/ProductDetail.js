import axios from 'axios';
import { Component } from 'react';
import { Col, Container, Row, Form, Button } from 'reactstrap';
import React from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Label } from 'reactstrap';
export class ProductDetail extends Component {
    state = {
        token: localStorage.getItem('account') !== null ? `Bearer ${JSON.parse(localStorage.getItem('account')).token}` : '',
        productEndPoint: 'http://localhost:8000/product',
        categoryEndPoint: 'http://localhost:8000/category',
        product: '',
        categoryList: [],
        statusChange: '',
        errorProduct: '',
        messageNotFound: '',
        imageNotSupport: '',
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
                res.data.map((cate, index) => {
                    if (this.state.product.categoryID === cate.categoryID) {
                        document.getElementById('categoryID').getElementsByTagName('option')[index].selected = 'selected';
                    }
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    getProductDetail() {
        const path = window.location.pathname;
        const productID = path.split('/')[3];
        axios
            .get(this.state.productEndPoint + `/id/${productID}`)
            .then((res) => {
                this.setState({
                    product: res.data,
                });
                if (res.data.status === true) {
                    document.getElementById('status').getElementsByTagName('option')[0].selected = 'selected';
                } else {
                    document.getElementById('status').getElementsByTagName('option')[1].selected = 'selected';
                }
            })
            .catch((error) => {
                this.setState({
                    messageNotFound: error.response.data,
                });
            });
    }

    componentDidMount() {
        this.getProductDetail();
        this.getCategories();
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(
                this.state.productEndPoint,
                {
                    productID: this.state.product.productID,
                    productName: this.state.product.productName,
                    imageSrc: this.state.product.imageSrc,
                    description: this.state.product.description,
                    price: this.state.product.price,
                    quantity: this.state.product.quantity,
                    status: this.state.product.status,
                    createDate: this.state.product.createDate,
                    updateDate: this.state.product.updateDate,
                    categoryID: this.state.product.categoryID,
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
                        statusChange: 'Update success!',
                        errorProduct: '',
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    errorProduct: error.response.data,
                });
            });
        setTimeout(() => {
            this.setState({
                statusChange: '',
            });
        }, 2000);
    }

    hanleDelete(e) {
        if (window.confirm('Are you sure to delete')) {
            axios
                .delete(`${this.state.productEndPoint}/${this.state.product.productID}`, {
                    headers: {
                        Authorization: this.state.token,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({
                            statusChange: 'Delete success!',
                        });
                        window.location = `/admin/productDetail/${this.state.product.productID}`;
                    }
                })
                .catch((error) => {
                    this.setState({
                        statusChange: error.response.data,
                    });
                });
            setTimeout(() => {
                this.setState({
                    statusChange: '',
                });
            }, 3000);
        }
    }
    render() {
        if (this.state.messageNotFound === "Don't have any product") {
            return (
                <div>
                    <h2>Product not found</h2>
                </div>
            );
        }
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Product Detail</h1>
                <Container>
                    <Row>
                        <Col xs="6">
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>ProductID:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input readOnly name="productID" value={this.state.product.productID} />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.productIDError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Product name:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="productName" required onChange={(e) => this.productNameOnchange(e)} value={this.state.product.productName} />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.productNameError}</p>

                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Description:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="description" required onChange={(e) => this.descriptionOnchange(e)} value={this.state.product.description} />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.descriptionError}</p>

                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Image Src:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="file" accept="image/*" id="imageSrc" onChange={(e) => this.imageOnchange(e)} />
                                    <Input type="hidden" name="imageSrc" value={this.state.product.imageSrc}></Input>
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.imageSrcError}</p>
                                <p style={{ color: 'red' }}>{this.state.imageNotSupport}</p>

                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Quantity:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="number" required onChange={(e) => this.quantityOnchange(e)} name="quantity" min="1" value={this.state.product.quantity} />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.quantityError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Price $ :</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="number" step="0.01" required onChange={(e) => this.priceOnchange(e)} name="price" min="1" value={this.state.product.price} />
                                </InputGroup>
                                <p style={{ color: 'red' }}>{this.state.errorProduct.priceError}</p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Create date:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="createDate" readOnly value={this.state.product.createDate} />
                                </InputGroup>
                                <p></p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Update date:</InputGroupText>
                                    </InputGroupAddon>
                                    <Input readOnly value={this.state.product.updateDate} />
                                </InputGroup>
                                <p></p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Status</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" onChange={(e) => this.statusOnchange(e)} name="status" id="status">
                                        <option value="true">Active</option>
                                        <option value="false">De-Active</option>
                                    </Input>
                                </InputGroup>
                                <p></p>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Category</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" onChange={(e) => this.categoryIDOnchange(e)} name="categoryID" id="categoryID">
                                        {this.state.categoryList.map((cate) => (
                                            <option value={cate.categoryID}>{cate.categoryName}</option>
                                        ))}
                                    </Input>
                                </InputGroup>
                                <br></br>
                                <Button type="submit" color="warning">
                                    Update
                                </Button>
                                <Button onClick={(e) => this.hanleDelete(e)} style={{ marginLeft: '20px' }} color="danger">
                                    Delete
                                </Button>
                                <h3 style={{ textAlign: 'left', color: 'red' }}>{this.state.statusChange}</h3>
                            </Form>
                        </Col>
                        <Col xs="6">
                            <img style={{ width: '100%', height: '50%', marginTop: '10%' }} id="imageScrDisplay" src={this.state.product.imageSrc} alt="Product image" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
    imageOnchange(e) {
        let imageSrc = e.target.value;
        if (imageSrc.split('.')[1] !== 'jpg' && imageSrc.split('.')[1] !== 'gif' && imageSrc.split('.')[1] !== 'png') {
            this.setState({
                imageNotSupport: 'Unsupported image format( just png,gif,jpg)',
            });
            setTimeout(() => {
                this.setState({
                    imageNotSupport: '',
                });
            }, 4000);
        } else {
            let newProduct = this.state.product;
            newProduct.imageSrc = `/productImage/${imageSrc.split('\\')[2]}`;
            this.setState({
                product: newProduct,
            });
        }
    }
    productNameOnchange(e) {
        let newProduct = this.state.product;
        newProduct.productName = e.target.value;
        this.setState({
            product: newProduct,
        });
    }
    descriptionOnchange(e) {
        let newProduct = this.state.product;
        newProduct.description = e.target.value;
        this.setState({
            product: newProduct,
        });
    }
    quantityOnchange(e) {
        let newProduct = this.state.product;
        newProduct.quantity = e.target.value;
        this.setState({
            product: newProduct,
        });
    }
    priceOnchange(e) {
        let newProduct = this.state.product;
        newProduct.price = e.target.value;
        this.setState({
            product: newProduct,
        });
    }
    statusOnchange(e) {
        let newProduct = this.state.product;
        newProduct.status = e.target.value;
        this.setState({
            product: newProduct,
        });
    }
    categoryIDOnchange(e) {
        let newProduct = this.state.product;
        newProduct.categoryID = e.target.value;
        this.setState({
            product: newProduct,
        });
    }
}
