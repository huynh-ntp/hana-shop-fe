import { Component } from 'react';
import './styleComponents/navbar.css';
import { Link } from 'react-router-dom';
import { ButtonToggle } from 'reactstrap';
export class MainNav extends Component {
    state = {
        isLoggedIn: this.props.isLoggedIn,
        fullName: localStorage.getItem('account') === null ? '' : JSON.parse(localStorage.getItem('account')).fullName,
    };

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <nav id="navbar">
                    <ul>
                        <Link to={'/home'}>
                            <li>Home</li>
                        </Link>

                        <a href="/contact">
                            <li>Contact</li>
                        </a>
                        <a href="#">
                            <li>About</li>
                        </a>
                    </ul>

                    <div className="nav-details">
                        <Link className="link" to={'/login'}>
                            <ButtonToggle color="success">SignIn</ButtonToggle>
                        </Link>

                        <Link className="link" to={'/register'}>
                            <ButtonToggle color="info">SignUp</ButtonToggle>
                        </Link>
                    </div>
                </nav>
            );
        } else {
            if (JSON.parse(localStorage.getItem('account')).role === 'ROLE_AD') {
                return <nav id="navbar">Admin</nav>;
            }
            return (
                <nav id="navbar">
                    <ul>
                        <Link to={'/home'}>
                            <li>Home</li>
                        </Link>

                        <a href="/contact">
                            <li>Contact</li>
                        </a>
                        <a href="#">
                            <li>About</li>
                        </a>
                    </ul>
                    <div className="nav-details">
                        <Link className="link" to={'/'}>
                            <ButtonToggle color="primary">ViewCart</ButtonToggle>
                        </Link>
                        <Link className="link" to={'/userDetails'}>
                            <ButtonToggle color="success">{this.state.fullName}</ButtonToggle>
                        </Link>
                        <Link className="link" to="/logout">
                            <ButtonToggle color="info">Logout</ButtonToggle>
                        </Link>
                    </div>
                </nav>
            );
        }
    }
}
