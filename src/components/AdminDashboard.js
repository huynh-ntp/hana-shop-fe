import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './styleComponents/admin.css';

export class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem tag="a" href="/admin/productTable" action>
                        Products
                    </ListGroupItem>
                    <ListGroupItem tag="a" href="/admin/userTable" action>
                        Users
                    </ListGroupItem>
                    <ListGroupItem tag="a" href="/admin/categoryTable" action>
                        Categories
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}
