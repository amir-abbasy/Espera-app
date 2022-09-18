import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const {width, height} = Dimensions.get('window');

import {
  default_url,
  fonts,
  colors,
  stripe_pub_key,
} from '../global/constanants';
import service from '../global/service';
import {getStore} from '../global/util';

const PaymentGateway = props => {
  return (
    <StripeProvider
      publishableKey={stripe_pub_key}
      merchantIdentifier="merchant.identifier">
      <StripeTest {...props} />
    </StripeProvider>
  );
};

const StripeTest = props => {
  const [data, setData] = useState(props.data);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [loading, setLoading] = useState();
  const [card, setCard] = useState();
  const [clientSecret, setClientSecret] = useState('');

  const {confirmPayment, confirmSetupIntent} = useStripe();
  const {buttonStyle, onComplete, onError, paymentDetails, onCancel} = props;

  if (card?.complete) {
    Keyboard.dismiss();
  }

  useEffect(() => {
    createPayment();
  }, []);

  // step 1

  const createPayment = async () => {
    setPaymentProcessing(true)
    var user_currency = JSON.parse(await getStore('@currency'));
    service.post(
      default_url + `/user/paymentIntent`,
      {
        currency: user_currency?.currency ?? 'usd',
        amount: paymentDetails.amount,
      },
      (status, response) => {
        console.log('ClientSecret ---------------------', response);
        setPaymentProcessing(false)
        if (status) {
          setClientSecret(response.paymentIntent);
        } else {
          Alert.alert(
            'Error',
            'Stripe payment intent not created, retry or choose another payment method',
          );
        }
      },
    );
  };

  // step 2

  const handleConfirmation = async () => {
    setPaymentProcessing(true);

    ///////////////// DUMMY
    //   if(card.complete){
    //   Alert.alert('Received payment successfully');
    // }else   Alert.alert('Enter Card details');

    if (!clientSecret) return;

    // Gather the customer's billing information (for example, email)
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };

    // Fetch the intent client secret from the backend
    // const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
      Alert.alert('Payment confirmation error');
      // onError();
      setPaymentProcessing(false);
    } else if (paymentIntent) {

      // debug
      console.log('Confirm paymentIntent', paymentIntent);
      console.log("NEXT CONFIRM",  {
        intent_id: paymentIntent.id,
        ...paymentDetails.ids,
      });


      service.post(
        default_url + `/user/paymentIntentConfirm`,
        {
          intent_id: paymentIntent.id,
          ...paymentDetails.ids,
        },
        (status, response) => {
          // console.log('success booking Confirmation --- : ', data);
          if (status == 200) {
            Alert.alert(
              'Received payment successfully',
              // `Billed for amount ${paymentIntent?.amount / 100}`,
              );
            onComplete();
            setPaymentProcessing(false);
            console.log("ORDER PLACED!")
          }
        },
      );
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderRadius: 20,
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 15,
        }}
        onCardChange={cardDetails => {
          // console.log('cardDetails', cardDetails);
          setCard(cardDetails);
        }}
        onFocus={focusedField => {
          // console.log('focusField', focusedField);
        }}
        autofocus={true}
      />
      <TouchableOpacity
        onPress={handleConfirmation}
        style={{...buttonStyle, backgroundColor: 'blue', marginBottom: 0}}
        buttonContainerStyle={{}}>
        {paymentProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{color: '#fff', fontWeight: '900', textAlign: 'center'}}>
            Confirm payment
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onCancel()}
        style={{...buttonStyle, backgroundColor: '#99999990'}}
        buttonContainerStyle={{paddingHorizontal: 20}}>
        <Text style={{color: '#fff', fontWeight: '900', textAlign: 'center'}}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentGateway;
