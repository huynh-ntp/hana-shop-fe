import { Component } from 'react';
import { Container, Row, Col, Button, Form, Input, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './styleComponents/review.css';
export class ProductDetailShopping extends Component {
    state = {
        product: '',
        productEndPoint: 'http://localhost:8000/product',
        rateEndPoint: 'http://localhost:8000/rate/',
        reviewList: [],
        modal: false,
    };
    getProduct() {
        const path = window.location.pathname;
        const productID = path.split('/')[2];
        console.log(productID);
        axios
            .get(this.state.productEndPoint + `/id/${productID}`)
            .then((res) => {
                this.setState({
                    product: res.data,
                });
            })
            .catch((error) => {
                //  this.setState({
                //      messageNotFound: error.response.data,
                //  });
            });
    }

    getReview() {
        const path = window.location.pathname;
        const productID = path.split('/')[2];
        console.log(productID);
        axios
            .get(this.state.rateEndPoint + productID)
            .then((res) => {
                this.setState({
                    reviewList: res.data,
                });
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    addToCart(e) {
        e.preventDefault();
        let account = JSON.parse(localStorage.getItem('account'));
        if (account != null) {
            if (account.role === 'ROLE_AD') {
                window.location = '/forbidden';
            }
        }
        let cart = [];
        if (localStorage.getItem('cart') != null) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        let product = {
            productID: e.target.productID.value,
            quantity: e.target.quantityAdd.value,
            price: e.target.price.value,
            imageSrc: e.target.imageSrc.value,
            productName: e.target.productName.value,
            description: e.target.description.value,
        };

        let isAdded = false;
        cart.map((pro) => {
            if (pro.productID === product.productID) {
                pro.quantity = parseInt(pro.quantity) + parseInt(e.target.quantityAdd.value);
                localStorage.setItem('cart', JSON.stringify(cart));
                isAdded = true;
            }
        });
        if (!isAdded) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        this.setState({
            modal: true,
        });
    }
    componentDidMount() {
        this.getProduct();
        this.getReview();
    }
    render() {
        if (this.state.product === '') {
            return (
                <Container>
                    <Row>
                        <Col sm="3"></Col>
                        <Col sm="6">
                            <img src="/productImage/productNotFound.png"></img>
                        </Col>
                        <Col sm="3"></Col>
                    </Row>
                </Container>
            );
        }
        return (
            <Container>
                <Row>
                    <Col sm="5">
                        <img style={{ width: '100%', height: '400px' }} src={this.state.product.imageSrc}></img>
                    </Col>
                    <Col sm="7">
                        <h1 style={{ color: 'red', marginTop: '10%', fontWeight: '400' }}>{this.state.product.productName}</h1>
                        <h6>Description: {this.state.product.description}</h6>
                        <h5>{`Price: ${this.state.product.price}$`}</h5>
                        {this.state.product.status && <p style={{ color: 'green' }}>Stocking</p>}
                        {!this.state.product.status && <p style={{ color: 'red' }}>Out of stock</p>}
                        <hr></hr>
                        <Form onSubmit={(e) => this.addToCart(e)}>
                            <Input type="hidden" value={this.state.product.productID} name="productID"></Input>
                            <Input type="hidden" value={this.state.product.price} name="price"></Input>
                            <Input type="hidden" value={this.state.product.quantity} name="quantity"></Input>
                            <Input type="hidden" value={this.state.product.imageSrc} name="imageSrc"></Input>
                            <Input type="hidden" value={this.state.product.productName} name="productName"></Input>
                            <Input type="hidden" value={this.state.product.description} name="description"></Input>
                            <input type="number" required name="quantityAdd" min="1" style={{ width: '50px' }}></input>
                            {this.state.product.status && (
                                <Button type="submit" style={{ marginLeft: '10px' }} color="danger">
                                    Add to cart
                                </Button>
                            )}
                            {!this.state.product.status && (
                                <Button type="submit" disabled style={{ marginLeft: '10px' }} color="danger">
                                    Add to cart
                                </Button>
                            )}
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col sm="8">
                        <h1>Review</h1>
                        <h6>Description</h6>
                        <form onSubmit={this.handleRate}>
                            <textarea style={{ width: '100%' }}></textarea>
                            Star: <input required min="1" max="5" type="number" />
                        </form>
                    </Col>
                    <Col sm="2"></Col>
                    <Col sm="2"></Col>
                </Row>
                <hr></hr>

                {this.state.reviewList.length === 0 && <h6 style={{ color: 'blue' }}>The product has no reviews yet</h6>}
                {this.state.reviewList.map((review) => (
                    <Row>
                        <Col sm="1">
                            <img style={{ width: '100px', height: '100px' }} src="/productImage/user.jpg"></img>
                        </Col>
                        <Col sm="11">
                            <h3>{review.userName}</h3>
                            <p>Start: {review.numOfStar}</p>
                            <p>Description: {review.description}</p>
                            <p>Date: {review.dateRate}</p>
                        </Col>
                    </Row>
                ))}
                <div>
                    <Modal isOpen={this.state.modal}>
                        <ModalHeader>HanaShop</ModalHeader>
                        <ModalBody style={{ color: 'red' }}>Add success!</ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => {
                                    this.setState({ modal: !this.state.modal });
                                    window.location = '/viewCart';
                                }}
                            >
                                View Cart
                            </Button>{' '}
                            <Button
                                color="secondary"
                                onClick={() => {
                                    this.setState({ modal: !this.state.modal });
                                }}
                            >
                                Continue buy
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container>
        );
    }
}
