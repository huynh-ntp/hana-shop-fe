import axios from 'axios';
import { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styleComponents/cart.css';
export class ViewCart extends Component {
    state = {
        customerEndpoint: 'http://localhost:8000/customer',
        orderEndpoint: 'http://localhost:8000/api/order',
        account: '',
        token: '',
        cart: [],
        orderError: [],
        subTotal: 0,
        tax: 0,
        shipping: 2,
        grandTotal: 0,
        customer: '',
        modal: false,
        orderSuccess: {
            orderID: '',
            address: '',
            orderDate: '',
            phone: '',
            totalPrice: '',
            typePay: '',
            userName: '',
        },
    };
    componentDidMount() {
        let account = JSON.parse(localStorage.getItem('account'));
        if (account !== null) {
            if (account.role === 'ROLE_AD') {
                window.location = 'forbidden';
            }
            this.setState({
                account: account,
                token: `Bearer ${account.token}`,
            });
            axios
                .get(`${this.state.customerEndpoint}/${account.username}`, {
                    headers: {
                        Authorization: 'Bearer ' + account.token,
                    },
                })
                .then((res) => {
                    this.setState({
                        customer: res.data,
                    });
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        let temp = JSON.parse(localStorage.getItem('cart'));
        let subTotal = 0;
        if (temp != null) {
            this.setState({
                cart: temp,
            });
            temp.map((pro) => {
                subTotal += pro.price * pro.quantity;
            });
            let tax = (subTotal * 5) / 100;
            this.setState({
                subTotal: subTotal.toFixed(2),
                tax: tax.toFixed(2),
                grandTotal: (subTotal + tax + this.state.shipping).toFixed(2),
            });
        }
    }

    handleDelete(productID) {
        let subTotal = this.state.subTotal;
        var temp = this.state.cart;
        for (var i = 0; i < temp.length; i++) {
            if (this.state.cart[i].productID === productID) {
                subTotal -= temp[i].price * temp[i].quantity;
                temp.splice(i, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(temp));
        let tax = (subTotal * 5) / 100;
        this.setState({
            cart: temp,
            subTotal: subTotal.toFixed(2),
            tax: tax.toFixed(2),
            grandTotal: (subTotal + tax + this.state.shipping).toFixed(2),
        });
    }

    updateQuantity(newQuantity, productID) {
        let subTotal = 0;
        if (newQuantity > 0) {
            var temp = this.state.cart;
            for (var i = 0; i < temp.length; i++) {
                if (this.state.cart[i].productID === productID) {
                    temp[i].quantity = newQuantity;
                }
                subTotal += temp[i].quantity * temp[i].price;
            }
            let tax = (subTotal * 5) / 100;
            localStorage.setItem('cart', JSON.stringify(temp));
            this.setState({
                cart: temp,
                subTotal: subTotal.toFixed(2),
                tax: tax.toFixed(2),
                grandTotal: (subTotal + tax + this.state.shipping).toFixed(2),
            });
        }
    }

    handleCheckout(e) {
        e.preventDefault();
        if (this.state.account === '') {
            window.location = '/login';
        } else if (this.state.account.role === 'ROLE_AD') {
            window.location = '/forbidden    ';
        }
        axios
            .post(
                this.state.orderEndpoint,
                {
                    cart: this.state.cart,
                    customer: this.state.customer,
                },
                {
                    headers: {
                        Authorization: this.state.token,
                    },
                }
            )
            .then((res) => {
                localStorage.removeItem('cart');
                this.setState({
                    orderSuccess: res.data,
                    modal: !this.state.modal,
                });
            })
            .catch((error) => {
                this.setState({
                    orderError: error.response.data,
                });
            });
    }
    render() {
        if (this.state.cart.length === 0) {
            return (
                <div class="container-fluit">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body cart ">
                                    <div class="col-sm-12 empty-cart-cls text-center">
                                        {' '}
                                        <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3" />
                                        <h3>
                                            <strong>Your Cart is Empty</strong>
                                        </h3>
                                        <h4>Add something to make me happy :)</h4>
                                        <a href="/home" class="btn btn-primary cart-btn-transform m-3" data-abc="true">
                                            continue shopping
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Container>
                <Row>
                    <h1>Shopping Cart</h1>
                    <Col sm="9">
                        <div class="shopping-cart">
                            <div class="column-labels">
                                <label class="product-image">Image</label>
                                <label class="product-details">Product</label>
                                <label class="product-price">Price</label>
                                <label class="product-quantity">Quantity</label>
                                <label class="product-removal">Remove</label>
                                <label class="product-line-price">Total</label>
                            </div>
                            {this.state.cart.map((pro) => (
                                <div class="product">
                                    <div class="product-image">
                                        <img src={pro.imageSrc} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                    <div class="product-details">
                                        <div class="product-title">{pro.productName}</div>
                                        <p class="product-description">{pro.description}</p>
                                    </div>
                                    <div class="product-price">{pro.price}</div>
                                    <div class="product-quantity">
                                        <input type="number" name="quantity" onChange={(e) => this.updateQuantity(e.target.value, pro.productID)} min="1" value={pro.quantity} />
                                    </div>
                                    <div class="product-removal">
                                        <button onClick={(e) => this.handleDelete(pro.productID)} class="remove-product">
                                            Remove
                                        </button>
                                    </div>
                                    <div class="product-line-price">{(pro.quantity * pro.price).toFixed(2)}</div>
                                </div>
                            ))}
                            <Row>
                                <Col sm="7">
                                    {this.state.orderError.map((error) => (
                                        <p style={{ color: 'red' }}>{error}</p>
                                    ))}
                                </Col>
                                <Col sm="5">
                                    <div class="totals">
                                        <div class="totals-item">
                                            <label>Subtotal</label>
                                            <div class="totals-value" id="cart-subtotal">
                                                {this.state.subTotal}
                                            </div>
                                        </div>
                                        <div class="totals-item">
                                            <label>Tax (5%)</label>
                                            <div class="totals-value" id="cart-tax">
                                                {this.state.tax}
                                            </div>
                                        </div>
                                        <div class="totals-item">
                                            <label>Shipping</label>
                                            <div class="totals-value" id="cart-shipping">
                                                {this.state.shipping}
                                            </div>
                                        </div>
                                        <div class="totals-item totals-item-total">
                                            <label>Grand Total</label>
                                            <div style={{ color: 'red' }} class="totals-value" id="cart-total">
                                                {this.state.grandTotal}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col sm="3">
                        <Form onSubmit={(e) => this.handleCheckout(e)}>
                            <FormGroup>
                                <Label for="Address">Address:</Label>
                                <Input type="text" value={this.state.customer.address} onChange={(e) => this.addressChange(e.target.value)} required name="address" placeholder="Address for shipping" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone</Label>
                                <Input type="text" value={this.state.customer.phone} onChange={(e) => this.phoneChange(e.target.value)} required name="email" id="exampleEmail" placeholder="Phone contact" />
                            </FormGroup>
                            <button type="submit" class="checkout">
                                Checkout
                            </button>
                            <br></br>
                        </Form>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>Thanks for purchase</ModalHeader>
                    <ModalBody>
                        <h6>{`OrderID: ${this.state.orderSuccess.orderID}`}</h6>
                        <h6>{`Username: ${this.state.orderSuccess.userName}`}</h6>
                        <h6>{`Total: ${this.state.orderSuccess.totalPrice}$`}</h6>
                        <h6>{`Address: ${this.state.orderSuccess.address}`}</h6>
                        <h6>{`Phone: ${this.state.orderSuccess.phone}`}</h6>
                        <h6>{`Type pay: ${this.state.orderSuccess.typePay}`}</h6>
                        <h6>{`Order date: ${new Date(this.state.orderSuccess.orderDate)}`}</h6>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => {
                                this.setState({ modal: !this.state.modal });
                                window.location = '/home';
                            }}
                        >
                            Continue Shopping
                        </Button>{' '}
                        <Button
                            color="secondary"
                            onClick={() => {
                                this.setState({ modal: !this.state.modal });
                            }}
                        >
                            History Purchase
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
    addressChange(address) {
        if (this.state.account === '') {
            window.location = '/login';
        }
        let customer = this.state.customer;
        customer.address = address;
        this.setState({
            customer: customer,
        });
    }

    phoneChange(phone) {
        if (this.state.account === '') {
            window.location = '/login';
        }
        let customer = this.state.customer;
        customer.phone = phone;
        this.setState({
            customer: customer,
        });
    }
}
