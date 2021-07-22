import { Component } from 'react';
import './styleComponents/orderSuccess.css';
export class OrderSuccess extends Component {
    render() {
        return (
            <div class="card">
                <div className="check">
                    <i class="checkmark">✓</i>
                </div>
                <h1>Success</h1>
                <p>
                    We received your purchase request;
                    <br /> we'll be in touch shortly!
                </p>
                <div style={{ height: '400px' }}></div>
            </div>
        );
    }
}
