import React, { useState } from 'react';
import './Card.css';

function Card({ id, value, suit, image }) {
    return (
        <div className={`Card ${id}`}>
            <img
                src={image}
                className="Card-image"
                alt={`Card ${value} of ${suit}`}
            />
        </div>
    );
}

export default Card;
