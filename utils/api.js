import { dummyData } from './DATA';
import { AsyncStorage } from 'react-native';

export const MOBILE_FLASHCARDS_STORAGE_KEY = 'MobileFlashcards';

export function setDummyData() {
  return AsyncStorage.setItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData));
}

export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY).then((results) => {
    return results ? JSON.parse(results) : setDummyData();
  });
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY).then((results) => {
    const decks = JSON.parse(results);
    decks[title].questions.push(card);
    AsyncStorage.setItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    MOBILE_FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    })
  );
}
