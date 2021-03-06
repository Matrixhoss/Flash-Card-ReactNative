import React, { Component } from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, ScrollView } from 'react-native';
import {connect} from 'react-redux'
import {handleGetDecks ,handleAddCard} from '../actions'
import {deleteData ,addCard} from '../utils/api'


class DecksList extends Component {
    handleOpenDeck = (id)=>{
        this.props.navigation.navigate('Deck', {
            id
          });
    }
    componentDidMount(){
        this.props.dispatch(handleGetDecks())
        
        
      }
    render() {
        const {decks ,loading} = this.props
        if (loading) {
            return (
                <View style={styles.container}>
                <Text>Loading...</Text>
              </View>
            )
        }
        if (decks === null){
            return (<View style={styles.container}>
            <Text>There is no decks</Text>
          </View>)
        }
        return (
            <ScrollView style={{paddingHorizontal : 20}}>
                {Object.keys(decks).map((key) => (
                    <TouchableOpacity key = {key} style={styles.deckcontainer} onPress={() => this.handleOpenDeck(key)}>
                        <Text style={styles.decktitle}>{decks[key].title}</Text>
                        <Text style={styles.deckcards}>{decks[key].questions? decks[key].questions.length : 0} cards</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deckcontainer: {
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth : 1 ,
      borderBottomColor : '#000'
      
    },
    decktitle  : {
        fontSize : 30 ,
        fontWeight : '600'
    },
    deckcards : {
        color : '#888'
    }
  });


  function mapStateToProps({decks , loading} , props){
    return {
        decks,
        loading
    }
}
export default connect(mapStateToProps)(DecksList)