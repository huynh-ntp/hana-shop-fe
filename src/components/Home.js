import axios from 'axios';
import { Component } from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, InputGroup, Input, InputGroupAddon, InputGroupText, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
        this.getCategories();
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
    render() {
        return (
            <Container>
                <Row>
                    <Col sm="3">
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
                    </Col>
                    <Col sm="9">
                        <Row>
                            {this.state.productListDisplay.map((pro, index) => (
                                <Col sm="4">
                                    <Card>
                                        <CardImg style={{ width: '100%', height: '250px' }} src={pro.imageSrc} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle tag="h5">{pro.productName}</CardTitle>
                                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                                {`Price: ${pro.price} $`}
                                            </CardSubtitle>
                                            <CardText>{pro.description}</CardText>
                                            {pro.status ? (
                                                <Button style={{ marginLeft: '10%' }} color="danger">
                                                    Add to cart
                                                </Button>
                                            ) : (
                                                <Button style={{ marginLeft: '10%' }} disabled color="danger">
                                                    Add to cart
                                                </Button>
                                            )}
                                            <Button style={{ marginLeft: '15%' }} color="warning">
                                                Detail
                                            </Button>
                                        </CardBody>
                                    </Card>
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
            </Container>
        );
    }
}
