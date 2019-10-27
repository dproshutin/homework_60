import React, {Component} from 'react';
import './SelectedCountry.css';

class SelectedCountry extends Component {
    componentDidUpdate() {
        console.log('[SelectedCountry] in componentDidUpdate. id=', this.props.id);
    }

    render() {
        return (
            <div className="CountryInfo">
                <h2>Name</h2>
                <p>Capital</p>
                <p>Code</p>
                <p>Population</p>
                <p>Borders with:</p>
                <p>Flag</p>
            </div>
        );
    }
}

export default SelectedCountry;