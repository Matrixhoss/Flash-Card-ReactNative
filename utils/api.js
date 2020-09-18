import AsyncStorage from '@react-native-community/async-storage'

const DECKS_STORAGE_KEY = '@deck-storage'

export function addDeck ({ key , deck }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: deck
      }))
}

export function removeDeck (key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCard (key , question ,answer) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key].questions.push({question :question , answer :answer})
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  })
}

export function getDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      
      
  }

  // remove it
  export function deleteData (){
    AsyncStorage.clear();

  }