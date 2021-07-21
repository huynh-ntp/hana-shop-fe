import { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './styleComponents/cart.css';
export class ViewCart extends Component {
    state = {
        cart: [],
    };
    componentDidMount() {
        if (localStorage.getItem('cart')) {
            this.setState({
                cart: JSON.parse(localStorage.getItem('cart')),
            });
        }
    }

    handleDelete(productID) {
        console.log('remove run');
        var temp = this.state.cart;
        for (var i = 0; i < temp.length; i++) {
            if (this.state.cart[i].productID === productID) {
                temp.splice(i, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(temp));
        this.setState({
            cart: temp,
        });
    }

    updateQuantity(e) {}

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
                                    <input type="number" onChange={(e) => this.updateQuantity(e)} min="1" value={pro.quantity} />
                                </div>
                                <div class="product-removal">
                                    <button onclick={(e) => this.handleDelete(pro.productID)} class="remove-product">
                                        Remove
                                    </button>
                                </div>
                                <div class="product-line-price">{pro.quantity * pro.price}</div>
                            </div>
                        ))}

                        <div class="totals">
                            <div class="totals-item">
                                <label>Subtotal</label>
                                <div class="totals-value" id="cart-subtotal">
                                    71.97
                                </div>
                            </div>
                            <div class="totals-item">
                                <label>Tax (5%)</label>
                                <div class="totals-value" id="cart-tax">
                                    3.60
                                </div>
                            </div>
                            <div class="totals-item">
                                <label>Shipping</label>
                                <div class="totals-value" id="cart-shipping">
                                    15.00
                                </div>
                            </div>
                            <div class="totals-item totals-item-total">
                                <label>Grand Total</label>
                                <div class="totals-value" id="cart-total">
                                    90.57
                                </div>
                            </div>
                        </div>

                        <button class="checkout">Checkout</button>
                    </div>
                </Row>
            </Container>
        );
    }
}
