import axios from 'axios';
import { Component } from 'react';
import { Col, Container, Row, Form, Button } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';

export class ShippingInfo extends Component {
    handleSubmit(e) {}
    render() {
        return (
            <Container>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="9">
                        <Form onSubmit={(e) => this.handleSubmit(e)} style={{ marginTop: '25%' }}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Address</InputGroupText>
                                </InputGroupAddon>
                                <Input name="address" />
                            </InputGroup>
                            <br></br>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Phone</InputGroupText>
                                </InputGroupAddon>
                                <Input name="phone" />
                            </InputGroup>
                            <br></br>
                            <Button type="submit" color="warning">
                                Save
                            </Button>
                        </Form>
                    </Col>
                    <Col sm="2"></Col>
                </Row>
            </Container>
        );
    }
}
