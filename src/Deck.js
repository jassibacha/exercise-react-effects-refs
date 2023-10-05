import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import CardButton from './CardButton';
import './Deck.css';

function Deck() {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);
    const [remaining, setRemaining] = useState(null);
    const [isShuffling, setIsShuffling] = useState(false);
    const cardsUrl = 'https://deckofcardsapi.com/api/deck';

    // this is called *after* component first added to DOM
    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            try {
                const res = await axios.get(
                    `${cardsUrl}/new/shuffle/?deck_count=1`
                );
                setDeckId(res.data.deck_id);
                console.log(`Deck ID: ${res.data.deck_id}`);
                setRemaining(52);
            } catch (err) {
                alert(err);
            }
        }
        fetchDeck();
        //console.log('Deck ID: ', deckId);
    }, []);

    async function drawCard() {
        try {
            const res = await axios.get(`${cardsUrl}/${deckId}/draw/?count=1`);

            let card = res.data.cards[0];
            console.log(
                `Drew ${card.value} OF ${card.suit}. ${res.data.remaining} cards left.`
            );

            // Random rotation, top/left offsetting, and zIndex
            const randomRotation = Math.random(); // Value between 0 and 1
            const topOffset = Math.floor(Math.random() * 11) - 5; // Random value between -20 and 20
            const leftOffset = Math.floor(Math.random() * 11) - 5; // Random value between -20 and 20

            setCards((cards) => [
                ...cards,
                {
                    id: card.code,
                    suit: card.suit,
                    value: card.value,
                    image: card.image,
                    rotation: randomRotation,
                    top: topOffset,
                    left: leftOffset,
                    zIndex: cards.length + 1, // This ensures that the zIndex increases with each drawn card
                },
            ]);

            setRemaining(res.data.remaining);

            if (res.data.remaining === 0) {
                setIsDeckEmpty(true);
                throw new Error('The deck is empty.');
            }
        } catch (err) {
            alert(err);
        }
    }

    async function shuffleDeck() {
        setIsShuffling(true);
        try {
            await axios.get(`${cardsUrl}/${deckId}/shuffle/`);
            setCards([]);
            setRemaining(52);
        } catch (err) {
            alert(err);
        } finally {
            setIsShuffling(false);
        }
    }

    /** Return draw button (disabled if shuffling) */
    function renderDrawBtn() {
        if (!deckId) return null;

        return (
            <button
                className="DrawCard Button"
                onClick={drawCard}
                disabled={isShuffling}
            >
                Draw Card
            </button>
        );
    }

    /** Return shuffle button (disabled if already is) */
    function renderShuffleBtn() {
        if (!deckId) return null;
        return (
            <button
                className="ShuffleDeck Button"
                onClick={shuffleDeck}
                disabled={isShuffling}
            >
                Shuffle Deck
            </button>
        );
    }

    return (
        <div className="Deck">
            {deckId ? (
                <>
                    <h2>Deck ID: {deckId}</h2>
                    <div className="remaining">{remaining} Cards Remaining</div>
                    <div className="buttons">
                        <CardButton
                            text="Draw Card"
                            className="DrawCard Button"
                            onClick={drawCard}
                            disabled={isShuffling}
                        />

                        <CardButton
                            text="Shuffle Deck"
                            className="ShuffleDeck Button"
                            onClick={shuffleDeck}
                            disabled={isShuffling}
                        />
                    </div>
                    <div className="Deck-cards">
                        {cards.map((c) => (
                            <Card
                                id={c.id}
                                key={c.id}
                                suit={c.suit}
                                value={c.value}
                                image={c.image}
                                rotation={c.rotation}
                                topOffset={c.top}
                                leftOffset={c.left}
                                zIndex={c.zIndex}
                            />
                        ))}
                    </div>
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
