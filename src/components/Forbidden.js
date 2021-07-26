import { Component } from 'react';
import { Button } from 'reactstrap';

export class Forbidden extends Component {
    goBack() {
        let account = JSON.parse(localStorage.getItem('account'));
        if (account !== null) {
            if (account.role === 'ROLE_CUS') {
                window.location = '/home';
            }
            if (account.role === 'ROLE_AD') {
                window.location = '/admin';
            }
        } else {
            window.location = '/home';
        }
    }
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'red' }}>Warning</h1>
                <h5>You don't have permisson to access this resource</h5>
                <Button onClick={() => this.goBack()}>Go back</Button>
            </div>
        );
    }
}
