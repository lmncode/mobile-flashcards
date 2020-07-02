import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/notifications';

class Quiz extends React.Component {
  state = {
    questions: this.props.route.params.questions,
    index: 0,
    showAnswer: false,
    score: 0,
  };
  render() {
    const { index } = this.state;
    return (
      <View style={styles.container}>
        {index !== this.state.questions.length ? (
          <View>
            <Text>{`${index + 1} / ${this.state.questions.length}`}</Text>
            <View style={styles.centerContent}>
              <Text style={styles.text}>
                {this.state.showAnswer
                  ? this.state.questions[index].answer
                  : this.state.questions[index].question}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState((prevState) => ({
                    showAnswer: !prevState.showAnswer,
                  }))
                }>
                <Text style={styles.textBtn}>
                  Show {this.state.showAnswer ? 'Question' : 'Answer'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  this.setState((prevState) => ({
                    index: prevState.index + 1,
                    score: prevState.score + 1,
                  }));

                  if (index === this.state.questions.length) {
                    clearLocalNotification().then(setLocalNotification);
                  }
                }}>
                <Text>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn,{backgroundColor:'#6f0000'}]}
                onPress={() => {
                  this.setState((prevState) => ({
                    index: prevState.index + 1,
                  }));
                    if (index === this.state.questions.length) {
                    clearLocalNotification().then(setLocalNotification);
                  }
                }}>
                <Text style={{color:'#ffffff'}}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.centerContent}>
            <Text style={styles.text}>Score : {this.state.score}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.setState({
                  index: 0,
                  score: 0,
                });
              }}>
              <Text>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn,{backgroundColor:'#6f0000'}]}
              onPress={() =>
                this.props.navigation.navigate('Deck Details', {
                  questions: this.props.route.params.questions,
                  title: this.props.route.params.title,
                  cardCount: this.props.route.params.cardCount,
                })
              }>
              <Text style={{color:'#ffffff'}}>Back To Deck</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  text: {
    fontSize: 30,
    marginBottom:20,
    color:'#00263b'
  },
  textBtn: {
    color: '#00a1ab',
    fontSize: 20,
    marginTop:20,
    marginBottom:20
  },
  btn: {
    borderWidth: 2,
    borderColor: '#6f0000',
    borderRadius: 4,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
