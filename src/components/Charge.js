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

  static navigationOptions = {
    title: 'Charge Things',
    headerStyle: {
      backgroundColor: '#8491A3'
    },
    headerTintColor: '#F7FFF6'
  };

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
            borderWidth: 1,
            textAlign: 'center',
            backgroundColor: '#F7FFF6',
            borderWidth: 0.2,
            color: '#8491A3'
          }}
          onChangeText={amount => this.setState({ amount })}
        />
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
  { doPayment }
)(Charge);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF6',
    justifyContent: 'center'
  },
  iosSubmitBtn: {
    width: 300,
    backgroundColor: '#87D68D',
    padding: 10,
    borderRadius: 100,
    height: 50,
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
