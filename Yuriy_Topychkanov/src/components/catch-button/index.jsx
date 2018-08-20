import React, {Component} from 'react';
import './style.css';

export default class CatchButton extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                disabled: false
            }
    }

    componentDidMount() {
        const { id } = this.props;
        fetch(`http://localhost:3000/captured-pokemons/${id}`).then(
            (response) => {
                response.status === 200 ? this.setState({ disabled: true }) : ''
            }
        );
    }


    catchPokemons = () => {
        const { name, id, callback } = this.props;
        let captureTime = new Date();
        captureTime = CatchButton.formatDate(captureTime);
        fetch('http://localhost:3000/captured-pokemons', {
            method: 'POST',
            body: JSON.stringify({ name, id, captureTime }),
            headers: { 'Content-Type': 'application/json' }
        }).then(
            () => {
                if (callback !== undefined)
                {
                    callback();
                }
                this.setState({ disabled: true });
            }
        );
    };

    static formatDate(date) {

        let dd = date.getDate();
        if (dd < 10)
        {
            dd = '0' + dd;
        }

        let mm = date.getMonth() + 1;
        if (mm < 10)
        {
            mm = '0' + mm;
        }

        let yy = date.getFullYear() % 100;
        if (yy < 10)
        {
            yy = '0' + yy;
        }

        let hh = date.getHours();
        if (hh < 10)
        {
            hh = '0' + hh;
        }

        let minutes = date.getMinutes();
        if (minutes < 10)
        {
            minutes = '0' + minutes;
        }

        let seconds = date.getSeconds();
        if (seconds < 10)
        {
            seconds = '0' + seconds;
        }

        return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + minutes + ':' + seconds;
    }

    render() {
        const nameOfClass = this.state.disabled ? 'catch-btn disabled' : 'catch-btn';
        return <button className={nameOfClass} disabled={this.state.disabled}
                       onClick={this.catchPokemons}>Catch</button>;
    }
}