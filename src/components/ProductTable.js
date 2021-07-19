import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import { getAll } from '../httpHelper/productHelper';

export class ProductTable extends Component {
    state = {
        productList: [],
    };

    componentDidMount() {
        axios.get('http://localhost:8000/product').then((res) => {
            if (res.status === 200) {
                this.setState({
                    productList: res.data,
                });
            }
        });
    }
    handleDelete() {}
    render() {
        return (
            <div>
                <Button color="primary" size="lg">
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
                        {this.state.productList.map((pro) => (
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
            </div>
        );
    }
}
