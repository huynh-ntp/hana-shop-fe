import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Component } from 'react';
import { MainNav } from './components/MainNav';
import { Login } from './components/Login';
import { Admin } from './components/Admin';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Logout } from './components/Logout';
import { ViewCart } from './components/ViewCart';
class App extends Component {
    state = {
        isLoggedIn: localStorage.getItem('account') === null ? false : true,
    };
    componentDidMount() {
        console.log(this.state.isLoggedIn);
    }
    shouldComponentUpdate() {
        return true;
    }
    handleLoggedIn = () => {
        this.setState({
            isLoggedIn: true,
        });
    };
    handleLogout = () => {
        this.setState({
            isLoggedIn: false,
        });
    };
    render() {
        return (
            <Router>
                <div className="App">
                    <MainNav isLoggedIn={this.state.isLoggedIn}></MainNav>
                    <Route path="/login">
                        <Login login={this.handleLoggedIn} />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/logout">
                        <Logout logout={this.handleLogout} />
                    </Route>
                    <Route path="/viewCart">
                        <ViewCart></ViewCart>
                    </Route>
                </div>
                ;
            </Router>
        );
    }
}

export default App;
