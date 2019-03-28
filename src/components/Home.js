import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import { fetchToken } from '../actions/PaymentActions';
import { connect } from 'react-redux';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Charge Things',
    headerStyle: {
      backgroundColor: '#8491A3'
    },
    headerTintColor: '#F7FFF6'
  };

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
        this.props.navigation.navigate('Charge');
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
          <Text style={styles.submitBtnText}>Scan</Text>
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
)(Home);

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
  androidSubmitBtn: {
    width: 100,
    backgroundColor: '#87D68D',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 100,
    borderRadius: 50,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  submitBtnText: {
    color: '#F7FFF6',
    fontSize: 22,
    textAlign: 'center'
  }
});
