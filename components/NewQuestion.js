import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { addCardToDeck, getDecks } from '../utils/api';

class NewQuestion extends React.Component {
  state = {
    question: '',
    answer: '',
  };

  onSubmit = () => {
    if (this.state.question === '' || this.state.answer === '') {
      return;
    }

    addCardToDeck(this.props.route.params.title, {
      question: this.state.question,
      answer: this.state.answer,
    }).then(() => {
      this.props.route.params.onGoBack();
      this.props.navigation.goBack();
    });
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          placeholder="question"
          style={styles.input}
          name="question"
          onChangeText={(question) => this.setState({ question })}
        />
        <TextInput
          placeholder="answer"
          style={styles.input}
          name="answer"
          onChangeText={(answer) => this.setState({ answer })}
        />
        <TouchableOpacity style={styles.btn} onPress={this.onSubmit}>
          <Text style={{ color: '#ffffff' }}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default NewQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },

  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#900c3f',
    marginBottom: 20,
  },
  btn: {
    borderWidth: 2,
    borderColor: '#00263b',
    backgroundColor: '#00263b',
    borderRadius: 4,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
