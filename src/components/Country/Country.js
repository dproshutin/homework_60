import React from 'react';
import './Country.css';

const Country = props => {
    return (
        <p
            onClick={props.clicked}
        >
            {props.countryName}
        </p>
    );
};

export default Country;