import { Component } from 'react';
import { Col, Container, Row, ButtonToggle } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ProductTable } from './ProductTable';
import { Dashboard } from './Dashboard';
import { ProductDetail } from './ProductDetail';
import { UserTable } from './UserTable';
import { CategoryTable } from './CategoryTable';
import { ProductCreateNew } from './ProductCreateNew';
import { CategoryCreateNew } from './CategoryCreateNew';
import { ManagerBanner } from './ManagerBanner';
export class Admin extends Component {
    state = {};
    componentDidMount() {
        if (JSON.parse(localStorage.getItem('account')) === null) {
            window.location = '/';
        } else if (JSON.parse(localStorage.getItem('account')).role === 'ROLE_CUS') {
            window.location = '/logout';
        }
    }
    render() {
        return (
            <Router>
                <Container className="container">
                    <Row>
                        <Col xs="3"></Col>

                        <Col xs="9"></Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            <h1>Welcome admin</h1>
                            <h2 style={{ color: 'darkgreen' }}>{JSON.parse(localStorage.getItem('account')).fullName}</h2>
                            <ButtonToggle onClick={(e) => (window.location = '/logout')} style={{ marginBottom: '20px' }} color="info">
                                Logout
                            </ButtonToggle>

                            <br></br>
                            <Route>
                                <Dashboard path="/admin" />
                            </Route>
                        </Col>
                        <Col xs="9">
                            <Route exact path="/admin">
                                <ManagerBanner></ManagerBanner>
                            </Route>
                            <Route path="/admin/productTable">
                                <ProductTable />
                            </Route>
                            <Route path="/admin/productDetail/">
                                <ProductDetail />
                            </Route>
                            <Route path="/admin/userTable">
                                <UserTable />
                            </Route>
                            <Route path="/admin/categoryTable">
                                <CategoryTable />
                            </Route>
                            <Route path="/admin/createNew">
                                <ProductCreateNew />
                            </Route>
                            <Route path="/admin/categoryCreate">
                                <CategoryCreateNew />
                            </Route>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}
