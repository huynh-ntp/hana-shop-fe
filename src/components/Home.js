import axios from 'axios';
import { Component } from 'react';
import { Container, Modal, ModalBody, ModalHeader, ModalFooter, Form, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, InputGroup, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
export class Home extends Component {
    state = {
        productEndpoint: 'http://localhost:8000/product',
        categoryEndPoint: 'http://localhost:8000/category',
        productList: [],
        categoryList: [],
        productListDisplay: [],
        curIndexPage: 1,
        totalPage: 0,
        pageSize: 9,
        modal: false,
    };
    getListProduct() {
        axios.get(this.state.productEndpoint).then((res) => {
            if (res.status === 200) {
                this.setState({
                    productList: res.data,
                    totalPage: Math.ceil(res.data.length / this.state.pageSize),
                });
                let productListDisplay = [];
                for (var i = 0; i < this.state.pageSize && i < this.state.productList.length; i++) {
                    productListDisplay.push(this.state.productList[i]);
                }
                this.setState({
                    productListDisplay: productListDisplay,
                });
            }
        });
    }
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
    componentDidMount() {
        this.getListProduct();
        this.getCategories();
    }
    handleChangePage(index) {
        this.setState({
            curIndexPage: index,
        });
        let productListDisplay = [];
        let startIndex = (index - 1) * this.state.pageSize;
        let endIndex = index * this.state.pageSize;
        for (var i = startIndex; i < endIndex && i < this.state.productList.length; i++) {
            productListDisplay.push(this.state.productList[i]);
        }
        this.setState({
            productListDisplay: productListDisplay,
        });
    }
    handleSearch(e) {
        e.preventDefault();
        if (e.target.categoryID.value === '0') {
            this.searchByName(e.target.productName.value);
        } else {
            this.searchByNameAndCategory(e.target.productName.value, e.target.categoryID.value);
        }
    }
    searchByName(name) {
        axios
            .get(`${this.state.productEndpoint}/${name}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        productList: res.data,
                        totalPage: Math.ceil(res.data.length / this.state.pageSize),
                    });
                    console.log(res.data);
                    let productListDisplay = [];
                    for (var i = 0; i < this.state.pageSize && i < this.state.productList.length; i++) {
                        productListDisplay.push(this.state.productList[i]);
                    }
                    this.setState({
                        productListDisplay: productListDisplay,
                    });
                }
            })
            .catch((error) => {
                let emptyList = [];
                this.setState({
                    productList: emptyList,
                    productListDisplay: emptyList,
                    curIndexPage: 1,
                    totalPage: 0,
                });
                console.log(this.state.productList);
            });
        console.log('find by name done');
    }
    searchByNameAndCategory(name, category) {
        if (name.length === 0) {
            name = 'no';
        }
        axios
            .get(`${this.state.productEndpoint}/${name}/${category}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        productList: res.data,
                        totalPage: Math.ceil(res.data.length / this.state.pageSize),
                    });
                    let productListDisplay = [];
                    for (var i = 0; i < this.state.pageSize && i < this.state.productList.length; i++) {
                        productListDisplay.push(this.state.productList[i]);
                    }
                    this.setState({
                        productListDisplay: productListDisplay,
                    });
                }
            })
            .catch((error) => {
                let emptyList = [];
                this.setState({
                    productList: emptyList,
                    productListDisplay: emptyList,
                    curIndexPage: 1,
                    totalPage: 0,
                });
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
            quantity: 1,
            price: e.target.price.value,
            imageSrc: e.target.imageSrc.value,
            productName: e.target.productName.value,
            description: e.target.description.value,
        };
        let isAdded = false;
        cart.map((pro) => {
            if (pro.productID === product.productID) {
                pro.quantity = pro.quantity + 1;
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

    render() {
        if (this.state.productListDisplay.length === 0) {
            return (
                <Container>
                    <Row>
                        <Col sm="3">
                            <Form onSubmit={(e) => this.handleSearch(e)}>
                                <Input placeholder="Search name" name="productName"></Input>
                                <br></br>
                                <InputGroup>
                                    <Input type="select" name="categoryID" id="categoryID">
                                        <option value="0">Select category</option>
                                        {this.state.categoryList.map((cate) => (
                                            <option value={cate.categoryID}>{cate.categoryName}</option>
                                        ))}
                                    </Input>
                                </InputGroup>
                                <br></br>
                                <Button type="submit">Search</Button>
                            </Form>
                        </Col>
                        <Col sm="9">
                            <img style={{ width: '100%' }} src="productImage/productNotFound.png" />
                        </Col>
                    </Row>
                </Container>
            );
        }
        return (
            <Container>
                <Row>
                    <Col sm="3">
                        <Form onSubmit={(e) => this.handleSearch(e)}>
                            <Input placeholder="Search name" name="productName"></Input>
                            <br></br>
                            <InputGroup>
                                <Input type="select" name="categoryID" id="categoryID">
                                    <option value="0">Select category</option>
                                    {this.state.categoryList.map((cate) => (
                                        <option value={cate.categoryID}>{cate.categoryName}</option>
                                    ))}
                                </Input>
                            </InputGroup>
                            <br></br>
                            <Button type="submit">Search</Button>
                            <br></br>
                            <h3 style={{ color: 'red' }}>{this.state.statusAdd}</h3>
                        </Form>
                    </Col>
                    <Col sm="9">
                        <Row>
                            {this.state.productListDisplay.map((pro, index) => (
                                <Col sm="4">
                                    <Form onSubmit={(e) => this.addToCart(e)}>
                                        <Input type="hidden" value={pro.productID} name="productID"></Input>
                                        <Input type="hidden" value={pro.price} name="price"></Input>
                                        <Input type="hidden" value={pro.quantity} name="quantity"></Input>
                                        <Input type="hidden" value={pro.imageSrc} name="imageSrc"></Input>
                                        <Input type="hidden" value={pro.productName} name="productName"></Input>
                                        <Input type="hidden" value={pro.description} name="description"></Input>
                                        <Card>
                                            <CardImg style={{ width: '100%', height: '250px' }} src={pro.imageSrc} alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle tag="h5">{pro.productName}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                                    {`Price: ${pro.price} $`}
                                                </CardSubtitle>
                                                {pro.status && <p style={{ color: 'green' }}>Stocking</p>}
                                                {!pro.status && <p style={{ color: 'red' }}>Out of stock</p>}
                                                <CardText></CardText>
                                                {pro.status ? (
                                                    <Button type="submit" style={{ marginLeft: '10%' }} color="danger">
                                                        Add to cart
                                                    </Button>
                                                ) : (
                                                    <Button style={{ marginLeft: '10%' }} disabled color="danger">
                                                        Add to cart
                                                    </Button>
                                                )}
                                                <Button style={{ marginLeft: '15%' }} onClick={() => (window.location = `/productDetail/${pro.productID}`)} color="warning">
                                                    Detail
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Form>
                                </Col>
                            ))}
                        </Row>
                        <div style={{ marginTop: '20px' }}>
                            <Pagination style={{ textAlign: 'center' }} size="lg" aria-label="Page navigation example">
                                {[...Array(this.state.totalPage)].map((el, index) => (
                                    <PaginationItem onClick={() => this.handleChangePage(index + 1)}>
                                        <PaginationLink>{index + 1}</PaginationLink>
                                    </PaginationItem>
                                ))}
                            </Pagination>
                        </div>
                    </Col>
                </Row>
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
