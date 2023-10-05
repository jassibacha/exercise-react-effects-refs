import React, { useState } from 'react';

function DrawButton({ drawCard }) {
    return (
        <button className="DrawButton" onClick={drawCard}>
            Draw Card
        </button>
    );
}

export default DrawButton;
