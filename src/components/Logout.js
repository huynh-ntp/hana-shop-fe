import { Component } from 'react';

export class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('account');
        var logout = this.props.logout;
        window.location = '/home';
    }
    render() {
        return <div></div>;
    }
}
