import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './styleComponents/admin.css';

export class Dashboard extends Component {
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
                    <ListGroupItem tag="a" href="#" action>
                        Order
                    </ListGroupItem>
                    <ListGroupItem disabled tag="a" href="#" action>
                        Report
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}
