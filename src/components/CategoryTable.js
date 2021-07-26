import axios from 'axios';
import { Component } from 'react';
import { Table, Button } from 'reactstrap';

export class CategoryTable extends Component {
    state = {
        token: localStorage.getItem('account') !== null ? `Bearer ${JSON.parse(localStorage.getItem('account')).token}` : '',
        categoryEndPoint: 'http://localhost:8000/category',
        categoryList: [],
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
                console.log(error.response.data);
            });
    }

    componentDidMount() {
        this.getCategories();
    }
    render() {
        return (
            <div>
                <h1 style={{ color: 'royalblue' }}>Category table</h1>
                <Button onClick={(e) => (window.location = '/admin/categoryCreate')} color="primary" size="lg">
                    Create new
                </Button>
                <Table striped>
                    <thead>
                        <tr>
                            <th>CategoryID</th>
                            <th>CategoryName</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categoryList.map((cate) => (
                            <tr key={cate.categoryID}>
                                <td>{cate.categoryID}</td>
                                <td>{cate.categoryName}</td>
                                <td>
                                    <Button onClick={() => (window.location = `/admin/categoryDetail/${cate.categoryID}`)}>Detail</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
