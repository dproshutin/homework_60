import React, {Component} from 'react';
import axios from "axios";
import Country from "../../components/Country/Country";
import SelectedCountry from "../../components/SelectedCountry/SelectedCountry";
import './CountryInformation.css';

class CountryInformation extends Component {
    state = {
        countries: [],
        selectedCountryId: null
    };

    countrySelectedHandler = (id) => {
        this.setState({selectedCountryId: id});
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
        let countriesNames;
        if (this.state.countries.length > 0) {
            countriesNames = this.state.countries.map(country => (
                <Country
                    key={country.id}
                    countryName={country.name}
                    clicked={() => this.countrySelectedHandler(country.id)}
                />
            ));
        } else {
            countriesNames = <p>No information about the countries</p>
        }
        return (
            <section className="Container">
                <div className="CountryPanel">
                    {countriesNames}
                </div>
                <SelectedCountry
                    id={this.state.selectedCountryId}
                />
            </section>
        );
    }
}

export default CountryInformation;