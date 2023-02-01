import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';

import {CartItemCard, Currency, Header, Modal, Pay} from '../components';
import service from '../global/service';
import {default_url, fonts, colors} from '../global/constanants';
import {getStore} from '../global/util';
import {useIsFocused} from '@react-navigation/native';
import {razorpay_key} from '../global/constanants';

// stripe key
// public
// pk_test_51H2711DqIVpJBt3RNYIncduJKSJPxTwEYygd4qrZYO34egsxttr06XhTnbZV37mXlAQFqNt2bSvvW2Rvemdn95d3006HwkMWBM

// private
// sk_test_51H2711DqIVpJBt3RVyG0gp9PB5qtU4joHwdPFhySD3UbtLelO73KEwqTtOKbrUvA81p09BYHW9UEI9TP6GMp8xXr00kFybsnV9

async function __makePayment(obj, callback) {
  var user_currency = JSON.parse(await getStore('@currency'));

  var fee = 0.25 * user_currency.value;
  var total = obj.totalPrice * user_currency.value + fee;
  var currency_iso = user_currency.currency;

  var options = {
    description: 'Buy coupen',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: currency_iso,
    key: razorpay_key, // Your api key
    amount: parseInt(total),
    name: 'foo',
    prefill: {
      email: 'void@razorpay.com',
      contact: '9191919191',
      name: 'Razorpay Software',
    },
    theme: {color: '#444444'},
    options: {
      checkout: {
        method: {
          netbanking: 0,
          card: 1,
          upi: 0,
          wallet: 0,
        },
      },
    },
  };
  // RazorpayCheckout.open(options)
  //   .then(data => {
  //     // handle success
  //     alert(`Success: ${data.razorpay_payment_id}`);
  //     callback();
  //   })
  //   .catch(error => {
  //     // handle failure
  //     alert(`Error: ${error.code} | ${error.description}`);
  //     // callback(); // remove
  //   });
}

export default function Cart() {
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDonateEnabled, setIsDonateEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [address, setAddress] = useState();
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delivary, setDelivary] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCartItems();
  }, [isFocused]); // cartItems

  // useEffect(() => {
  //   checkAddress();
  // }, [isDonateEnabled]);

  useEffect(() => {
    checkAddress();
  }, []);

  const getCartItems = async () => {
    setLoading(true);
    var user = JSON.parse(await getStore('@user')).userId;
    service.get(
      default_url + `/contest/getMyOrders/${user}/oncart`,
      (err, res) => {
        // console.log('-----', res, err);
        setCartItems(res);
        var total = res
          .map(_ => parseInt(_.pr_price) * parseInt(_.quantity))
          .reduce((t, n) => n + t, 0);
        setTotalPrice(total);
        setLoading(false);
      },
    );
  };

  const checkAddress = async () => {
    var userId = JSON.parse(await getStore('@user')).userId;
    service.get(default_url + `/user/getMyAddress/${userId}`, (err, res) => {
      // console.log('-----', res, err);
      if (res[0]['user_address'] == null || res[0]['user_address'] == '') {
        setHasAddress(false);
      } else {
        setHasAddress(true);
      }
    });
  };

  const updateAddress = async () => {
    var user_id = JSON.parse(await getStore('@user')).userId;

    const body = {
      user_id,
      address: address,
    };
    service.post(default_url + `/user/updateMyAddress`, body, (err, res) => {
      // console.log(err, res);
      if (res) {
        Alert.alert('Address added successfully');
        setModalVisible(false);
      }
    });
  };

  // const _submit = () => {
  // // UPDATE methods
  //   service.post(
  //     default_url +
  //       `/contest/goToPayment/${cartItems[0].order_id}/${cartItems[0].con_id}`,
  //     {},
  //     (err, res) => {
  //       console.log('----------------', staus, res);
  //       if (res.staus == 200) {
  //         Alert.alert(res.data.message);
  //       } else {
  //         console.log('contest update err');
  //       }
  //     },
  //   );
  // };

  async function _makePayment(obj) {
    var user_currency = JSON.parse(await getStore('@currency'));

    var fee = 0.25 * user_currency.value;
    var total = obj.totalPrice * user_currency.value + fee;
    var currency_iso = user_currency.currency;

    // console.log(cartItems.map(_ => _.order_id));
    // console.log(cartItems.map(_ => _.con_id));
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <Header homeHeader={false} title="My Cart" />
        {cartItems ? (
          <ScrollView contentContainerStyle={styles.root}>
            {cartItems.map((_, k) => (
              <CartItemCard
                {..._}
                updateCart={() => {
                  setTotalPrice();
                  getCartItems();
                }}
                onChangeDonate={bool => {
                  // setIsDonateEnabled(bool);
                }}
              />
            ))}
          </ScrollView>
        ) : loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Text style={{color: '#444444', textAlign: 'center'}}>No Items</Text>
        )}
      </SafeAreaView>

      <View style={styles.payNowContainar}>
        <Text style={{color: '#444444', ...fonts.reg_font}}>
          Inclusive of VAT
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#444444'}}>
            {cartItems ? cartItems.length : 0} items
          </Text>
          {totalPrice ? <Currency value={totalPrice} /> : null}
        </View>

        <View style={{marginVertical: 20}}>
          <Text>Delivary option (Charge : $5)</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
            onPress={()=>setDelivary(0)}
              style={[
                styles.delivary,
                delivary == 0 ?  {color: '#fff', backgroundColor: '#444'}  : null,
              ]}>
              Outlet collection
            </Text>
            <Text
            onPress={()=>setDelivary(1)}
              style={[
                styles.delivary,
                delivary == 1 ? {color: '#fff', backgroundColor: '#444'} : null,
              ]}>
              Home Delivary
            </Text>
          </View>
        </View>

        {/* PAYMENT CARD */}
        {showCard && cartItems ? (
          <Pay
            buttonStyle={styles.button}
            onComplete={() => {
              setCartItems();
              setShowCard(false);
            }}
            onCancel={() => setShowCard(false)}
            onError={null}
            paymentDetails={{
              ids: {
                order_ids: cartItems.map(_ => _.order_id),
                contest_ids: cartItems.map(_ => _.con_id),
              },
              amount: cartItems
                .map(_ => parseInt(_.pr_price) * parseInt(_.quantity))
                .reduce((t, n) => n + t, 0),
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.button}
            // onPress={() =>hasAddress ? _makePayment({totalPrice}, _submit) : setModalVisible(true)}>
            onPress={() =>
              cartItems.length > 0 ? setShowCard(true) : Alert.alert('no items')
            }>
            {/* onPress={() => _makePayment({totalPrice})}> */}
            <Text
              style={{color: '#fff', fontWeight: '900', textAlign: 'center'}}>
              PAY NOW
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Address add Modal */}
      {modalVisible && isDonateEnabled && (
        <Modal
          modalVisible={modalVisible && isDonateEnabled}
          setModalVisible={() => setModalVisible(!modalVisible)}>
          <View style={{padding: 22}}>
            <TextInput
              placeholder="Enter address"
              placeholderTextColor={'#000'}
              onChangeText={text => setAddress(text)}
              multiline
              style={{
                color: '#000',
                borderWidth: 1,
                margin: 10,
                padding: 10,
                fontSize: 15,
                width: '90%',
              }}
              numberOfLines={5}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => updateAddress()}>
              <Text
                style={{color: '#fff', fontWeight: '900', textAlign: 'center'}}>
                SET ADDRESS
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 5,
    paddingBottom: 200,
  },
  button: {
    backgroundColor: '#444444',
    borderRadius: 25,
    height: 45,
    paddingHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    width: '100%',
  },
  payNowContainar: {
    borderColor: '#444444',
    borderWidth: 2,
    borderBottomWidth: 0,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#ffffff',
  },
  delivary: {
    color: '#444444',
    fontWeight: 'bold',
    marginTop: 5,
    marginRight: 5,
    borderColor: '#444444',
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 20,
  },
});
