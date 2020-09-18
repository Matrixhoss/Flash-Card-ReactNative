import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'

let mount = false

class Deck extends React.Component {
    
    _isMounted = false;
    addCard = () =>{
        const {id , navigation} = this.props
        navigation.push('Add Card' , {id})
    }
     startQuiz = () =>{
     console.log('Start quiz pressed')
    }
    componentDidMount(){
        this._isMounted = true;


    }
    componentWillUnmount() {
        this._isMounted = false;
      }
   render(){
    const {deck } = this.props
    
  
    return (
        <View style={styles.container}>
            <View style={styles.textcontainer}>
                <Text style={styles.decktitle}>{deck.title  !== undefined ? deck.title : ''}</Text>
                <Text style={styles.deckcards}>{deck.questions.length ? deck.questions.length : 0  } cards</Text>
             </View>

             <View style={styles.textcontainer}>
             <TouchableOpacity style ={styles.whitebtn} onPress= {this.addCard}>
                 <Text style = {styles.text ,{ color : '#000',}}>
                     Add Card
                 </Text>
             </TouchableOpacity>
             <TouchableOpacity style ={styles.blackbtn} onPress={this.startQuiz}>
                 <Text style = {styles.text ,{ color : '#fff',}}>
                     Start Quiz
                 </Text>
             </TouchableOpacity>
             </View>
        </View>
        
    ) 
   }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent : 'flex-start'
      },
    textcontainer: {
      flex :1 ,
      alignItems: 'center',
      justifyContent: 'center',
    },
    decktitle  : {
        fontSize : 30 ,
        fontWeight : '600'
    },
    deckcards : {
        color : '#888'
    },
    blackbtn :{
        backgroundColor : '#000',
        borderRadius : 5 ,
        paddingVertical : 15,
        paddingHorizontal  : 60 ,
        borderWidth : 1 ,
        borderColor : '#000',
        margin : 10
    
    },
    whitebtn :{
        backgroundColor : '#fff',
        borderRadius : 5 ,
        borderColor : '#000',
        borderWidth : 1 ,
        paddingVertical : 15,
        paddingHorizontal  : 60 ,
        margin : 10
    
    },
    text : {
        fontSize : 20
    }
  });

  function mapStateToProps({decks},props){
        const {id} = props.route.params
        return {
            deck : decks[id],
            id
        }
  }
  export default connect(mapStateToProps)(Deck)