import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export class ProductTable extends Component {
    state = {
        productList: [],
        productListDisplay: [],
        curIndexPage: 1,
        totalPage: 0,
        pageSize: 10,
    };

    componentDidMount() {
        axios.get('http://localhost:8000/product').then((res) => {
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
            <div>
                <h1 style={{ color: 'royalblue' }}>Product table</h1>
                <Button onClick={(e) => (window.location = '/admin/createNew')} color="primary" size="lg">
                    Create new
                </Button>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ProductID</th>
                            <th>Product Name</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.productListDisplay.map((pro) => (
                            <tr key={pro.productID}>
                                <td>{pro.productID}</td>
                                <td>{pro.productName}</td>
                                <td>{pro.status ? 'Active' : 'De-Active'}</td>
                                <td>
                                    <Link to={`/admin/productDetail/${pro.productID}`}>
                                        <Button color="info">Details</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div style={{ marginTop: '20px' }}>
                    <Pagination style={{ textAlign: 'center' }} size="lg" aria-label="Page navigation example">
                        {[...Array(this.state.totalPage)].map((el, index) => (
                            <PaginationItem onClick={() => this.handleChangePage(index + 1)}>
                                <PaginationLink>{index + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                    </Pagination>
                </div>
            </div>
        );
    }
}
