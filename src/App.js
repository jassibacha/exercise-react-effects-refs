import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import DrawButton from './DrawButton';
import axios from 'axios';
import './App.css';

function App() {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);
    const cardsUrl = 'https://deckofcardsapi.com/api/deck';

    // this is called *after* component first added to DOM
    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            const res = await axios.get(
                `${cardsUrl}/new/shuffle/?deck_count=1`
            );
            setDeckId(res.data.deck_id);
            console.log(`Deck ID: ${res.data.deck_id}`);
        }
        fetchDeck();
        //console.log('Deck ID: ', deckId);
    }, []);

    return (
        <div className="App">
            {deckId ? (
                <>
                    <h2>{deckId}</h2>
                    <CardList />
                    <DrawButton />
                </>
            ) : (
                <i>Getting Deck ID</i>
            )}
        </div>
    );
}

export default App;
