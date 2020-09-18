import React , {Component}from 'react'
import { StyleSheet, Text, View ,TouchableOpacity ,TextInput ,Dimensions ,Keyboard} from 'react-native';
import {connect} from 'react-redux'
import {handleAddCard} from '../actions'

class AddCard extends Component  {

    state = {
        question : "",
        answer : ""
    }
    onChangeText1 = (value) => {
        this.setState({question : value})
    }
    onChangeText2= (value) => {
        this.setState({answer : value})
    }
    handelAddCard = () => {
        const {dispatch ,id} = this.props
        const {question ,answer} =this.state
    
        Keyboard.dismiss()
       dispatch(handleAddCard(id , question ,answer))
       this.props.navigation.pop();
        
    }
    render(){
        const {id}  = this.props 
    return (
        <View style={styles.container}>
            <Text style={styles.maintext}>Add new card for</Text>
            <Text style={styles.subtext}>{id}</Text>
            <TextInput
                style={styles.textfield}
                onChangeText={text => this.onChangeText1(text)}
                value={this.state.value}
                placeholder = 'Quesion'
            />
            <TextInput
                style={styles.textfield}
                onChangeText={text => this.onChangeText2(text)}
                value={this.state.value}
                placeholder = 'Answer'
            />
            <View style={styles.buttonView}>
             <TouchableOpacity style ={styles.blackbtn} onPress={this.handelAddCard}>
                 <Text style = {styles.text ,{ color : '#fff',}}>
                     Add Card
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
    maintext : {
        fontSize : 32 ,
        fontWeight : 'bold',
    },
    subtext : {
        fontSize : 18 ,
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


  function mapStateToProps (state , props){
    const {id} = props.route.params
    
    return {
        id
    }
  }
  export default connect(mapStateToProps)(AddCard)