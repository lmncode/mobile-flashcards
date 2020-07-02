import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { getDecks, addCardToDeck } from '../utils/api';

class DeckList extends React.Component {
  state = {
    decks: {},
  };

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    getDecks().then((decks) => {
      this.setState({ decks });
      return decks;
    });
  };

  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.decks && Object.values(this.state.decks)}
          renderItem={(row) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Deck Details', {
                    title: row.item.title,
                    cardCount: row.item.questions.length,
                    onGoBack: () => this.onRefresh(),
                    questions: row.item.questions,
                  })
                }>
                <View style={styles.listItem}>
                  <Text style={styles.deckName}>{row.item.title}</Text>
                  <Text style={{ color: '#ffffff' }}>
                    {row.item.questions.length} cards
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.title}
        />
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}

export default DeckList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  listItem: {
    backgroundColor: '#00a1ab',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 50,
    paddingLeft: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,

    shadowColor: '#00263b',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowRadius: 3.84,
  },
  deckName: {
    color: '#ffffff',
    fontSize: 30,
  },
});
