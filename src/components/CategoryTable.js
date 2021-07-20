import axios from 'axios';
import { Component } from 'react';
import { Table, Button } from 'reactstrap';

export class CategoryTable extends Component {
    state = {
        token: `Bearer ${JSON.parse(localStorage.getItem('account')).token}`,
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
                console.log(error.response);
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categoryList.map((cate) => (
                            <tr>
                                <td>{cate.categoryID}</td>
                                <td>{cate.categoryName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
