import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import DrawButton from './DrawButton';
import './Deck.css';

function Deck() {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);
    const [remaining, setRemaining] = useState(null);
    const cardsUrl = 'https://deckofcardsapi.com/api/deck';

    // this is called *after* component first added to DOM
    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            const res = await axios.get(
                `${cardsUrl}/new/shuffle/?deck_count=1`
            );
            setDeckId(res.data.deck_id);
            console.log(`Deck ID: ${res.data.deck_id}`);
            setRemaining(52);
        }
        fetchDeck();
        //console.log('Deck ID: ', deckId);
    }, []);

    async function drawCard() {
        try {
            const res = await axios.get(`${cardsUrl}/${deckId}/draw/?count=1`);
            if (res.data.remaining === 0) {
                setIsDeckEmpty(true);
                throw new Error('The deck is empty.');
            }

            let card = res.data.cards[0];
            console.log(
                `Drew ${card.value} OF ${card.suit}. ${res.data.remaining} cards left.`
            );

            setCards((cards) => [
                ...cards,
                {
                    id: card.code,
                    suit: card.suit,
                    value: card.value,
                    image: card.image,
                    name: card.value + ' OF ' + card.suit,
                },
            ]);

            setRemaining(res.data.remaining);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="Deck">
            {deckId ? (
                <>
                    <h2>Deck ID: {deckId}</h2>
                    <div>{remaining} Cards Remaining</div>
                    <div className="Deck-cards">
                        {cards.map((c) => (
                            <Card
                                id={c.id}
                                key={c.id}
                                suit={c.suit}
                                value={c.value}
                                image={c.image}
                            />
                        ))}
                    </div>
                    <DrawButton drawCard={drawCard} />
                </>
            ) : (
                <>
                    <div>Getting Deck ID</div>
                    <span class="loader"></span>
                </>
            )}
        </div>
    );
}

export default Deck;
