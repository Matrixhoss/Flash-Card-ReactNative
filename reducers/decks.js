import {ADD_CARD ,ADD_DECK ,DELETE_DECK ,GET_DECKS} from '../actions/decks'

export default function Decks (state = {} , action){
    
    switch(action.type){
        case ADD_DECK :
            return {...state , ...action.deck}
        case ADD_CARD : 
             state[action.data.key].questions.push({question : action.data.question , answer : action.data.answer})
            return state
        case DELETE_DECK :
        case GET_DECKS : 
            return action.decks
        default :
            return state
    }
}