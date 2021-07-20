import axios from 'axios';
import { Component } from 'react';
import { Table, Button } from 'reactstrap';
export class UserTable extends Component {
    state = {
        userList: [],
        endPoint: 'http://localhost:8000/api/user',
        token: `Bearer ${JSON.parse(localStorage.getItem('account')).token}`,
    };

    componentDidMount() {
        axios
            .get(this.state.endPoint, {
                headers: {
                    Authorization: this.state.token,
                },
            })
            .then((res) => {
                this.setState({
                    userList: res.data,
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    render() {
        return (
            <div>
                <h1 style={{ color: 'royalblue' }}>User table</h1>
                <Table striped>
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Password</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList.map((user) => (
                            <tr>
                                <td>{user.userName}</td>
                                <td>********</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.roleID}</td>
                                <td>{user.status ? 'Active' : 'De-Active'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
