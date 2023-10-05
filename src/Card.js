import React from 'react';
import './Card.css';

function Card({
    id,
    value,
    suit,
    image,
    rotation,
    topOffset,
    leftOffset,
    zIndex,
}) {
    return (
        <div
            className={`Card ${id}`}
            style={{
                '--random': rotation,
                top: `${topOffset}px`,
                left: `${leftOffset}px`,
                zIndex: zIndex,
            }}
        >
            <img
                src={image}
                className="Card-image"
                alt={`Card ${value} of ${suit}`}
            />
        </div>
    );
}

export default Card;
