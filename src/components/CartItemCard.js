import { View, Text, Image, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors, default_url, fonts } from '../global/constanants';
import service from '../global/service';
import Currency from './Currency';


export default function CartItemCard(props) {
  // console.log(props);
  const navigation = useNavigation()
  const [isDonate, setIsDonate] = useState(false);


  const _updateQty = (qty) => {
    service.post(default_url + `/contest/updateQuantity/${props.order_id}`, { quantity: qty }, (err, res) => {
      // console.log('-----', res, err);
      props?.updateCart()
    })
  }

  
  const _removeFromCart = () => {
    service.post(
      default_url + `/contest/removeFromCart`,
      {order_id: props.order_id},
      (res, err) => {
        if(res == 200)props?.updateCart()
        else console.log(err);
      },
    );
  };

  useEffect(() => {
    props?.onChangeDonate(isDonate)
  }, [isDonate])

  return (
    <View style={{ backgroundColor: '#50EE7C', borderRadius: 30, margin: 10 }}>

      <TouchableOpacity
        // onPress={()=> navigation.navigate('ContestDetails')}
        activeOpacity={0.9}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          margin: 3,
          borderRadius: 30,
          backgroundColor: '#fff',
          overflow: 'hidden',
        }}>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            width: '50%'
          }}>

          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{ ...fonts.bold_font, fontWeight: '900' }}>{props.pr_name}</Text>

            <Image
              // source={require('../assets/car.png')}
              source={{ uri: default_url + '/images/contest_cover/' + props.con_thumbnails }}
              style={{ width: 200, height: 100, marginVertical: 15 }}
            />
            <View style={{ flexDirection: 'row'}}>
              <Text style={{ ...fonts.bold_font, color: '#444444' }}>
                WIN
              </Text>
              <Text style={{ ...fonts.reg_font }} > {props.con_win}</Text>
            </View>
          </View>

          {/* SECT 2 */}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              // source={require('../assets/product.png')}
              source={{ uri: default_url + '/images/products/' + props.pr_thumbnails }}
              style={{ width: 80, height: 100 }}
            />
            <Currency value={props.pr_price} />
            <Text style={{ ...fonts.reg_font, fontSize: 10 }}>Quantity</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  parseInt(props.quantity) > 1 ? _updateQty(parseInt(props.quantity) - 1) :_removeFromCart()
                }}
                style={{
                  backgroundColor: '#C4C4C4',
                  padding: 10,
                  borderRadius: 50
                }}>
                <Text style={{ ...fonts.bold_font, color: '#fff' }}>-</Text>
              </TouchableOpacity>
              <Text style={{ ...fonts.bold_font, marginHorizontal: 10 }}>{props.quantity}</Text>
              <TouchableOpacity
                onPress={() => _updateQty(parseInt(props.quantity) + 1)}
                style={{
                  backgroundColor: '#444444',
                  padding: 10,
                  borderRadius: 50
                }}>
                <Text style={{ color: '#fff', fontWeight: '900' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>


      {/* Donate */}
      {false && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
        <Switch
          trackColor={{ false: "#31984F", true: "#31984F" }}
          thumbColor={isDonate ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsDonate(!isDonate)}
          value={isDonate}
        />
        <Text style={{ color: '#fff', fontSize: 12 }}>Donate product & Double your coupons</Text>
      </View>}

    </View>
  );
}

const styles = StyleSheet.create({});
