import { Component } from 'react';
import { Col, Container, Row, ButtonToggle } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ProductTable } from './ProductTable';
import { AdminDashboard } from './AdminDashboard';
import { ProductDetail } from './ProductDetail';
import { UserTable } from './UserTable';
import { CategoryTable } from './CategoryTable';
import { ProductCreateNew } from './ProductCreateNew';
import { CategoryCreateNew } from './CategoryCreateNew';
import { ManagerBanner } from './ManagerBanner';
import { Forbidden } from './Forbidden';
export class Admin extends Component {
    state = {};
    componentDidMount() {
        if (JSON.parse(localStorage.getItem('account')) === null) {
            window.location = '/forbidden';
        } else if (JSON.parse(localStorage.getItem('account')).role === 'ROLE_CUS') {
            window.location = '/forbidden';
        }
    }
    render() {
        return (
            <Router>
                <Container className="container">
                    <Route path="/forbidden">
                        <Forbidden />
                    </Route>
                    <Row>
                        <Col xs="3">
                            <h1>Welcome admin</h1>
                            <h2 style={{ color: 'darkgreen' }}>{localStorage.getItem('account') !== null ? JSON.parse(localStorage.getItem('account')).fullName : ''}</h2>
                            <ButtonToggle onClick={(e) => (window.location = '/logout')} style={{ marginBottom: '20px' }} color="info">
                                Logout
                            </ButtonToggle>

                            <br></br>
                            <Route>
                                <AdminDashboard path="/admin" />
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
