import React , {Component}from 'react'
import { StyleSheet, Text, View ,TouchableOpacity ,TextInput ,Dimensions ,Keyboard} from 'react-native';
import {connect} from 'react-redux'
import {handleAddCard} from '../actions'
import {setLocalNotification , clearLocalNotification} from '../utils/helper'

class QuizView extends Component  {

    state = {
        viewQuestion : true ,
        questionsCounter : 0,
        endState : false 
    }
    correctAnswers = 0 
    handelNextQuestion = (correct) => {
        const qlength = this.props.questions.length
        if (this.state.questionsCounter < qlength-1){
            if (correct) this.correctAnswers++
            this.setState((crrSt) => ({questionsCounter : crrSt.questionsCounter+1 , viewQuestion : true}))
        }else{
            if (correct) this.correctAnswers++
            this.setState((crrSt) => ({...crrSt , endState : true }))
        }
       
    }
    handleStartAgain= () => {
        this.setState({
            viewQuestion : true ,
            questionsCounter : 0,
            endState : false 
        })
        this.correctAnswers = 0 
    }
    handelViewAnswer = () => {
        this.setState((crrSt) => ({...crrSt ,viewQuestion : !crrSt.viewQuestion }))
    }
    handleGobBack =() => {
        this.props.navigation.pop()
    }
    componentDidMount(){
        clearLocalNotification().then(() => setLocalNotification())
    }
    render(){
        const {questions}  = this.props 
        const {questionsCounter ,endState ,viewQuestion} =this.state
        if (endState){
            return (<View style ={styles.container2 }>
                <Text style={{fontSize : 50 ,textAlign : 'center'}}>Your scoure is</Text>
                <Text style={{fontSize : 50 ,textAlign :'center'}}>{this.correctAnswers} / {questions.length}</Text>
                <TouchableOpacity onPress={this.handleStartAgain}>
                    <Text style = {styles.questionbtntext}>
                       Start quiz again ? 
                    </Text>
                </TouchableOpacity>
                <Text style={{textAlign :'center' ,fontSize : 16}}>or</Text>
                <TouchableOpacity onPress={this.handleGobBack}>
                    <Text style = {styles.goBackbtntext}>
                       go Back 
                    </Text>
                </TouchableOpacity>
            </View>)
        }
     return (
        <View style={styles.container}>
            <View style={{alignSelf :"flex-start"}}>
                <Text style={{fontSize : 16 }}>
                    {questionsCounter+1} / {questions.length}
                </Text>
            </View>
            <View style={styles.questionView}>
                <Text style={styles.maintext}>{viewQuestion ? questions[questionsCounter].question : questions[questionsCounter].answer}</Text>
                <TouchableOpacity onPress={this.handelViewAnswer}>
                    <Text style = {styles.questionbtntext}>
                        {viewQuestion ? "Answer" : "Question"}
                    </Text>
                </TouchableOpacity>
             </View>
             <View style={styles.buttonView}>
            <TouchableOpacity style ={styles.greenbtn} onPress={()=>this.handelNextQuestion(true)}>
                 <Text style = {styles.text }>
                      Correct 
                 </Text>
             </TouchableOpacity>
            <TouchableOpacity style ={styles.redbtn} onPress={()=>this.handelNextQuestion(false)}>
                 <Text style = {styles.text }>
                     Incorrect
                 </Text>
             </TouchableOpacity>
             </View>
        </View>
        )
    }
}

const { height, width } = Dimensions.get('window');
const mainPadding = 10 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: mainPadding,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent : 'flex-start'
    },
    container2: {
      flex: 1,
      padding: mainPadding,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent : 'center'
    },
    maintext : {
        fontSize : 32 ,
        textAlign : 'center' ,
        fontWeight : 'bold',
    },
    redbtn :{
        
        backgroundColor : '#e00',
        borderRadius : 5 ,
        paddingVertical : 15,
        paddingHorizontal  : 60 ,
        borderWidth : 1 ,
        borderColor : '#f00',
        margin : 5,
        
    },
    greenbtn :{
        
        backgroundColor : '#5faa1d',
        borderRadius : 5 ,
        paddingVertical : 15,
        paddingHorizontal  : 60 ,
        borderWidth : 1 ,
        borderColor : '#5faa1d',
        margin : 5,
        
    },
    blackbtn :{
        
        backgroundColor : '#000',
        borderRadius : 5 ,
        paddingVertical : 15,
        paddingHorizontal  : 60 ,
        borderWidth : 1 ,
        borderColor : '#000',
        margin : 5,
        
    },
    buttonView : {
        flex :1.5 ,
        alignItems : 'center',
        justifyContent : 'flex-end'
        
    },
    text  : { 
        color : '#fff',
        fontSize : 16,
        width : width/4,
        textAlign :'center'
    }, 
    questionView : {
        flex :2 ,
        alignContent :'center',
        justifyContent : 'center'
    },
    questionbtntext : { 
        color : 'red', 
        fontSize : 20 ,
        fontWeight : 'bold' ,
        textAlign:'center'
},
    goBackbtntext : { 
        color : '#5faa1d', 
        fontSize : 20 ,
        fontWeight : 'bold' ,
        textAlign:'center'
}


  
  });


  function mapStateToProps ({decks} , props){
    const {id} = props.route.params
    const questions = decks[id].questions
    return {
        questions
    }
  }
  export default connect(mapStateToProps)(QuizView)