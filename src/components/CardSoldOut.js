import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { default_url, fonts } from '../global/constanants';

export default function CardSoldOut(props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 20,
        margin: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 10,
        borderColor: '#E5E5E5'
      }}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: '#CD1719',
          padding: 30,
          paddingVertical: 5,
          borderTopStartRadius: 25,
          zIndex: 1,
          width: '60%',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Text style={{ ...fonts.reg_font, color: '#fff', fontSize: 9 }}>Draw Date: </Text>
        <Text style={{ ...fonts.reg_font, color: '#fff', fontSize: 12 }}>{new Date(props.item.con_enddate).toLocaleDateString()}</Text>
      </View>

      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          position: 'absolute',
          zIndex: 1
        }}>
        <Image
          source={require('../assets/sold_out.png')}
          style={{ width: 170, height: 70 }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 50,
        }}>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <Image
            // source={require('../assets/car.png')}
            source={{ uri: default_url + '/images/products/' + props.item.con_thumbnails }}
            style={{ width: 200, height: 100, opacity: 0.3 }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...fonts.reg_font, fontSize: 16, fontWeight: '900', color: '#444444' }}>
              WIN {' '}
            </Text>
            <Text style={{ ...fonts.reg_font, fontSize: 16, fontWeight: '900' }}>{props.item.con_win} </Text>
          </View>
          <Text style={{ ...fonts.reg_font }}>buy our {props.item.pr_name}</Text>
        </View>

        {/* SECT 2 */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            // source={require('../assets/product.png')}
            source={{ uri: default_url + '/images/products/' + props.item.pr_thumbnails }}
            style={{ width: 80, height: 100, opacity: 0.3 }}
          />
        </View>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
