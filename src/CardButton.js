import React from 'react';
import './CardButton.css';

function CardButton({ text, className, onClick, disabled }) {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default CardButton;
