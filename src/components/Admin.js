import { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ProductTable } from './ProductTable';
import { Dashboard } from './Dashboard';
import { ProductDetail } from './ProductDetail';
import { UserTable } from './UserTable';
import { CategoryTable } from './CategoryTable';
export class Admin extends Component {
    state = {
        listProducts: '',
        listCategory: '',
    };
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
                            <h1>Admin information here</h1>
                            <br></br>
                            <Route>
                                <Dashboard path="/admin" />
                            </Route>
                        </Col>
                        <Col xs="9">
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
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}
