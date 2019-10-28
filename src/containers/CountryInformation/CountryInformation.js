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
        axios.get("/all?fields=name;alpha3Code").then(response => {
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
                    countryId={country.id}
                    selected={this.state.selectedCountryId}
                    countryName={country.name}
                    clicked={() => this.countrySelectedHandler(country.id)}
                />
            ));
        } else {
            countriesNames = <p style={{paddingLeft: '20px', color: 'black'}}>Countries' information is coming...</p>
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