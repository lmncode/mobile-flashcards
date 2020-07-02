import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Deck extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.route.params.title}</Text>
        <Text style={styles.cardCount}>
          {this.props.route.params.cardCount} cards
        </Text>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              this.props.navigation.navigate('Add Card', {
                title: this.props.route.params.title,
                onGoBack: () => this.props.route.params.onGoBack,
              })
            }>
            <Text>Add Card</Text>
          </TouchableOpacity>
          {this.props.route.params.questions.length !== 0 ? (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#6f0000' }]}
              onPress={() =>
                this.props.navigation.navigate('Quiz', {
                  questions: this.props.route.params.questions,
                  title: this.props.route.params.title,
                  cardCount: this.props.route.params.questions.length,
                })
              }>
              <Text style={{ color: '#ffffff' }}>Start Quiz</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

export default Deck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },

  title: {
    color: '#6f0000',
    fontSize: 40,
  },
  cardCount: {
    fontSize: 20,
    color: '#00a1ab',
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
});
