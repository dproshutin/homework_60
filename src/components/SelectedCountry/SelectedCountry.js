import React, {Component} from 'react';
import axios from "axios";
import './SelectedCountry.css';

class SelectedCountry extends Component {
    state = {
        loadedCountry: null,
        borders: []
    };

    getPromisesCountryNameByAlphaCode = (arr) => {
        const axiosPromises = arr.map(item => {
            return axios.get("/alpha/" + item);
        });
        return axiosPromises;
    };

    _shouldRequest = () => {
        return this.props.id && (!this.state.loadedCountry || this.props.id !== this.state.loadedCountry.alpha3Code);
    };

    formatNumber = num => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    componentDidUpdate(prevProps, prevState) {
        if (this._shouldRequest()) {
            axios.get("/alpha/" + this.props.id)
                .then(response => {
                    this.setState({loadedCountry: response.data});
                    const borders = response.data.borders;
                    return borders;
                })
                .then(this.getBoderingCountries);
        }
    }

    getBoderingCountries = (alphaCodes) => {
        const promises = this.getPromisesCountryNameByAlphaCode(alphaCodes);
        Promise.all(promises)
            .then(response => {
                const array = response.map(item => {
                    return item.data.name;
                });
                this.setState({borders: array});
            })
    };

    render() {
        if (this.state.loadedCountry) {
            let borderingCountries = (
                <p>There are no bordering countries</p>
            );
            if (this.state.borders.length > 0) {
                borderingCountries = this.state.borders.map((country, index) => {
                    return (
                        <p
                            key={country + index}
                        >
                            {country}
                        </p>
                    )
                });
            }
            const flagImage =
                (<img
                        src={this.state.loadedCountry.flag}
                        style={{width: "200px", height: "auto", border: "1px solid #ccc"}}
                        alt={"Flag"}
                    />
                );
            return (
                <div className="CountryInfo">
                    <h2>{this.state.loadedCountry.name}</h2>
                    <p>Capital: {this.state.loadedCountry.capital}</p>
                    <p>Population: {this.formatNumber(this.state.loadedCountry.population)} people</p>
                    <p>Area: {this.formatNumber(this.state.loadedCountry.area)} sq. km.</p>
                    {flagImage}
                    <p><b>Borders with:</b></p>
                    {borderingCountries}
                </div>
            );
        }
        return (<p style={{textAlign: 'center'}}>Please select a country...</p>);
    }
}

export default SelectedCountry;