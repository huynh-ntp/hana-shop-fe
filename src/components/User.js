import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { UserDashboard } from './UserDashboard';
import { UserDetail } from './UserDetail';
import { PasswordChange } from './PasswordChange';
import { ShippingInfo } from './ShippingInfo';
import { PurcharseHistory } from './PurcharseHistory';
export class User extends Component {
    componentDidMount() {
        if (JSON.parse(localStorage.getItem('account')) === null) {
            window.location = '/forbidden';
        } else if (JSON.parse(localStorage.getItem('account')).role === 'ROLE_AD') {
            window.location = '/forbidden';
        }
    }
    render() {
        return (
            <Router>
                <Container>
                    <Row>
                        <Col xs="3">
                            <img style={{ width: '50%', height: '130px', marginLeft: '25%' }} src="/productImage/user.jpg"></img>
                            <h2 style={{ color: 'darkgreen' }}>{localStorage.getItem('account') !== null ? JSON.parse(localStorage.getItem('account')).fullName : ''}</h2>
                            <br></br>
                            <Route>
                                <UserDashboard path="/user" />
                            </Route>
                        </Col>
                        <Col xs="9">
                            <Route exact path="/user">
                                <UserDetail></UserDetail>
                            </Route>
                            <Route exact path="/user/changePassword">
                                <PasswordChange></PasswordChange>
                            </Route>
                            <Route exact path="/user/shippingInfo">
                                <ShippingInfo></ShippingInfo>
                            </Route>
                            <Route exact path="/user/purchaseHistory">
                                <PurcharseHistory />
                            </Route>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}
