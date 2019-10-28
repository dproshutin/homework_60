import React from 'react';
import './Country.css';

const Country = props => {
    let pClasses = ["listed"];
    if (props.selected === props.countryId) {
        pClasses.push("selected");
    }

    return (
        <p
            className={pClasses.join(' ')}
            onClick={props.clicked}
        >
            {props.countryName}
        </p>
    );
};

export default Country;