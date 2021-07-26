import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export class UserDashboard extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem tag="a" href="/user" action>
                        Information
                    </ListGroupItem>
                    <ListGroupItem tag="a" href="/user/shippingInfo" action>
                        Shipping Information
                    </ListGroupItem>
                    <ListGroupItem tag="a" href="/user/changePassword" action>
                        Change Password
                    </ListGroupItem>
                    <ListGroupItem tag="a" href="/user/purchaseHistory" action>
                        Purcharse History
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}
