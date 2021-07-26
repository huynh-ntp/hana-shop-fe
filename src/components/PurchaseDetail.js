import axios from 'axios';
import { Component } from 'react';
import { Table, Button } from 'reactstrap';

export class PurcharseHistory extends Component {
    state = {
        orderDetailEndpoint: 'http://localhost:8000/detail/',
        detailList: [],
    };

    componentDidMount() {
        let account = JSON.parse(localStorage.getItem('account'));
        if (account === null) {
            window.location = '/home';
        }
        let token = `Bearer ${account.token}`;
        let path = window.location.pathname;
        let orderID = path.split('/')[2];
        axios
            .get(`${this.state.orderDetailEndpoint}${orderID}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        detailList: res.data,
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }
    render() {
        return (
            <div>
                <h1 style={{ color: 'royalblue' }}>Purchase Histories</h1>
                <Table striped>
                    <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>Total Price $</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Order date</th>
                            <th>Type Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orderList.map((order) => (
                            <tr>
                                <td>{order.orderID}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.address}</td>
                                <td>{order.phone}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.typePay}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
