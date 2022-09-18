import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getStore} from '../global/util';
import {fonts} from '../global/constanants';

export default function Currency(props) {
  const [value, setValue] = useState();
  // https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=c51953d4f4608a064655

  useEffect(() => {
    calcPrice();
  }, []);
  
  async function calcPrice() {
    var currency = JSON.parse(await getStore('@currency'));
    setValue({
      currency: currency.currency,
      price: ((props.value * currency.value)+(props?.fee?props.fee:0)).toFixed(1),
    });
  }
  return (
    <View style={{flexDirection: 'row'}}>
      <Text
        style={{
          ...fonts.bold_font,
          fontSize: props?.size ? geSize(props?.size) : null,
          ...props?.style,
        }}>
        {value?.price}{' '}
      </Text>
      <Text style={{...fonts.reg_font, fontSize: 10, ...props?.style}}>
        {value?.currency}
        {props?.prefix}
      </Text>
    </View>
  );
}

function geSize(size) {
  var _ = 14;
  switch (size) {
    case 'md':
      _ = 18;
      break;
    case 'lg':
      _ = 24;
      break;
    case 'xl':
      _ = 32;
      break;
    default:
      _ = 14;
      break;
  }
  return _;
}
