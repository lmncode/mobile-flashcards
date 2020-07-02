import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { saveDeckTitle, getDecks } from '../utils/api';

class NewDeck extends React.Component {
  state = {
    title: '',
  };

  onSubmit = () => {
    if (this.state.title === '') return;
    saveDeckTitle(this.state.title).then(() => {
      this.props.navigation.navigate('Deck Details', {
        title: this.state.title,
        cardCount: 0,
        questions: [],
      });

      this.setState({ title: '' });
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title}
        />
        <TouchableOpacity style={styles.btn}>
          <Text onPress={this.onSubmit} style={{ color: '#ffffff' }}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#00263b',
  },

  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#900c3f',
    marginBottom: 20,
  },
  btn: {
    borderWidth: 2,
    borderColor: '#6f0000',
    backgroundColor: '#6f0000',
    borderRadius: 4,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
