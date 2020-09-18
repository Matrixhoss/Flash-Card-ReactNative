export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const GET_DECKS = 'GET_DECKS'
export const DELETE_DECK = 'DELETE_DECK'

export function addDeckAction (deck){
    return {
        type : ADD_DECK,
        deck
    }
}
export function addCardAction (data){
    return {
        type : ADD_CARD,
        data
    }
}
export function deleteDeckAction (key){
    return {
        type : DELETE_DECK,
        key
    }
}

export function getDecksAction (decks){
    return {
        type : GET_DECKS,
        decks
    }
}