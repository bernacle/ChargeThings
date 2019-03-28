import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput
} from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { fetchToken, doPayment } from '../actions/PaymentActions';
import { connect } from 'react-redux';

class Charge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }

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

  pay() {
    const { tokenId } = this.props;
    console.log(this.state.amount);
    let paymentBody = {};
    paymentBody.amount = this.state.amount;
    paymentBody.currency = 'usd';
    paymentBody.tokenId = tokenId;
    paymentBody.description = 'Charge Things';
    this.props.doPayment(paymentBody);
  }

  render() {
    const { amount } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            width: 300,
            marginLeft: 40,
            marginRight: 40,
            borderColor: 'gray',
            borderWidth: 1
          }}
          onChangeText={amount => this.setState({ amount })}
        />
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={this.scanCard.bind(this)}
        >
          <Text style={styles.submitBtnText}>Scan Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={() => this.pay()}
        >
          <Text style={styles.submitBtnText}>Pay</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    tokenId: state.tokenId,
    paymentResponse: state.paymentResponse
  };
};

export default connect(
  mapStateToProps,
  { fetchToken, doPayment }
)(Charge);

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
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
});
