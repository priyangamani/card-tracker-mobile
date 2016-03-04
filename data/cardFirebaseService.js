'use strict';

const Firebase = require('firebase');
const BaseFirebaseService = require('./baseFirebaseService');
const Card = require('./card');

class CardFirebaseService extends BaseFirebaseService {
  constructor() {
    super();
    this.cardsRef = new Firebase(super.constructRefURL('/cards'));
  }

  addCard(card, callback = function() {}) {
    this.cardsRef.push(card.getJSONData(), callback);
  }

  onCardAdd(callback) {
    this.cardsRef.on('child_added', (snapshot) => {
      const cardDetails = snapshot.val();
      const newCard = new Card(snapshot.key(), cardDetails);
      callback(newCard);
    });
  }

  detachAll() {
    this.cardsRef.off();
  }

  detach(eventType) {
    this.cardsRef.off(eventType);
  }
}

module.exports = CardFirebaseService;
