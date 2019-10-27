import React from 'react';
import './Country.css';

const Country = props => {
    return (
        <a
            href={"/"}
        >
            {props.countryName}
        </a>
    );
};

export default Country;