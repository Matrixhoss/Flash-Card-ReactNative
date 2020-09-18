import {addDeck ,getDecks ,removeDeck ,addCard} from '../utils/api'
import { addCardAction ,addDeckAction ,deleteDeckAction ,getDecksAction } from "./decks";
import {createEmptyDeck} from '../utils/helper'
import {startLoading ,stopLoading} from './loading'



export function handleAddDeck (key){
    const deck = createEmptyDeck(key)
    return(dispatch) => {
        addDeck({key ,deck}).then(() => {
            dispatch(addDeckAction({[key] :deck}))
        })
    }
}

export function handleAddCard (key , question ,answer){
    return(dispatch) => {
        addCard(key , question ,answer).then(() => {
            dispatch(addCardAction({key ,question ,answer}))
        })
    }
}

export function handelRemoveDeck(){
    // todo : Hnadle Remover decks from redux and database
}
export function handleGetDecks (){
    return (dispatch) => {
        dispatch(startLoading())
        getDecks().then((decks) => {
            dispatch(getDecksAction(JSON.parse(decks)))
            dispatch(stopLoading)
        } )
    }
}

