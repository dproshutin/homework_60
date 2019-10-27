import React, {Component} from 'react';
import axios from "axios";
import Country from "../../components/Country/Country";
import './CountryInformation.css';

class CountryInformation extends Component {
    state = {
        countries: []
    };
    componentDidMount() {
        const BASE_URL = "https://restcountries.eu/rest/v2/all?fields=name;alpha3Code";
        axios.get(BASE_URL).then(response => {
            return response.data;
        }).then(countries => {
            const preparedCountries = countries.map(country => {
                return {name: country.name, id: country.alpha3Code};
            });
            return preparedCountries;
        }).then(countries => this.setState({countries}));
    }

    render() {
        console.log(this.state.countries);
        let countriesNames;
        if (this.state.countries.length > 0) {
            countriesNames = this.state.countries.map(country => (
                <Country
                    key={country.id}
                    countryName={country.name}
                />
            ));
        }
        return (
            <div>
                {countriesNames}
            </div>
        );
    }
}

export default CountryInformation;