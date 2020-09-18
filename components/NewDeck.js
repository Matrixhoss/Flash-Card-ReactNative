import React , {Component}from 'react'
import { StyleSheet, Text, View ,TouchableOpacity ,TextInput ,Dimensions ,Keyboard} from 'react-native';
import {createEmptyDeck} from '../utils/helper'
import {connect} from 'react-redux'
import {handleAddDeck} from '../actions'

class NewDeck extends Component  {

    state = {
        value : ""
    }
    onChangeText = (value) => {
        this.setState({value})
    }
    handelAddNewDeck = () => {
        const {dispatch} = this.props
        const id = this.state.value
        Keyboard.dismiss()
       dispatch(handleAddDeck(this.state.value))
       this.props.navigation.navigate('Deck', {
        id
      });
       this.setState({value : ''})
      
        
    }
    render(){
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Create new deck </Text>
            <TextInput
                style={styles.textfield}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.value}
            />
            <View style={styles.buttonView}>
             <TouchableOpacity style ={styles.blackbtn} onPress={this.handelAddNewDeck}>
                 <Text style = {styles.text ,{ color : '#fff',}}>
                 Create Deck
                 </Text>
             </TouchableOpacity>
             </View>
        </View>
    )
    }
}

const { height, width } = Dimensions.get('window');
const mainPadding = 30 
const styles = StyleSheet.create({
    container: {
    
      flex: 1,
      padding: mainPadding,
      paddingBottom : 10 ,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent : 'flex-start'
    },
    textfield : {
        height: 40, 
        borderColor: '#000', 
        borderWidth: 1 ,
        padding : 10,
        width : width-mainPadding*2 ,
        
    },
    text : {
        fontSize : 36 ,
        fontWeight : 'bold',
        marginBottom : 30
    },
    blackbtn :{
        
        backgroundColor : '#000',
        borderRadius : 5 ,
        paddingVertical : 15,
        paddingHorizontal  : 60 ,
        borderWidth : 1 ,
        borderColor : '#000',
        margin : 10,
        
    },
    buttonView : {
        flex :1 ,
        alignItems : 'center',
        justifyContent : 'flex-end'
        
    }
  
  });


  export default connect()(NewDeck)