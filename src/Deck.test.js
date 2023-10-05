import React from 'react';
import {
    render,
    waitForElementToBeRemoved,
    screen,
} from '@testing-library/react';
import Deck from './Deck';

it('renders Deck component without crashing', () => {
    render(<Deck />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<Deck />);
    expect(asFragment()).toMatchSnapshot();
});

it('displays initial loading state', () => {
    render(<Deck />);
    expect(screen.getByText('Getting Deck ID')).toBeInTheDocument();
});
