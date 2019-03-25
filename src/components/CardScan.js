import React, { Component } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { fetchToken } from '../actions/PaymentActions';
import { connect } from 'react-redux';

class CardScan extends Component {
  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  }

  scanCard() {
    CardIOModule.scanCard()
      .then(data => {
        let card = {};
        card.number = data.cardNumber;
        card.exp_month = data.expiryMonth;
        card.exp_year = data.expiryYear;
        card.cvv = data.cvv;
        this.props.fetchToken(card);
      })
      .catch(() => {
        // the user cancelled
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={this.scanCard.bind(this)}
        >
          <Text stlye={styles.submitBtnText}>Scan card!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    tokenId: state.tokenId
  };
};

export default connect(
  mapStateToProps,
  { fetchToken }
)(CardScan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  iosSubmitBtn: {
    width: 300,
    backgroundColor: '#4286f4',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  androidSubmitBtn: {
    width: 300,
    backgroundColor: '#4286f4',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
});
