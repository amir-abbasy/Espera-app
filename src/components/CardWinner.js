import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import { default_url, fonts } from '../global/constanants';

export default function CardWinner(props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 10,
        borderColor:'#F7E6B1'
      }}>
     
{/* WIN TROPHY */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex:1,
          bottom: 20,
          right: '25%'
}}>
        <Image
          source={require('../assets/win.png')}
          style={{width: 71, height: 86}}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            marginTop: 10
          }}>
        <Text style={{...fonts.bold_font}}>{props.item.username}</Text>
        <Text style={{...fonts.reg_font, fontSize: 14}}>on winning  {props.item.con_win}</Text>
        <Text style={{...fonts.reg_font, fontSize: 12, color: '#444444'}}>Coupon no: {props.item.con_winnerCoupen}</Text>
        <Text style={{...fonts.reg_font, fontSize: 10}}>{props.item.con_enddate}</Text>
          <Image
            // source={require('../assets/car.png')}
            source={{ uri: default_url + '/images/products/' + props.item.con_thumbnails }}
            style={{width: 200, height: 100}}
          />
        </View>

        {/* SECT 2 */}
        <View style={{justifyContent: 'center', alignItems: 'center',
         backgroundColor:'#FECB1020', 
        padding: 20,
         borderTopLeftRadius: 40,
         borderBottomLeftRadius: 40,
         }}>
          <Image
            source={require('../assets/product.png')}
            // source={{ uri: default_url + '/images/products/' + props.item.con_thumbnails }}
            style={{width: 60, height: 70}}
          />
          <Image
            // source={require('../assets/product.png')}
            // source={{ uri: default_url + '/images/contest_cover/' + props.item.con_thumbnails }}
            // source={{ uri: default_url + '/images/products/' + props.item.con_thumbnails }}

            style={{width: 50, height: 50, marginTop: 10, borderRadius: 10, backgroundColor: '#ccc'}}
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
