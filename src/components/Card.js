import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../global/constanants';
import {default_url} from '../global/constanants';
import service from '../global/service';
import Currency from './Currency';
import { color } from '../global/util';

const Progress = ({progress}) => {
  // console.log(progress);

  var col = color(progress);
  const progress_bg_Colors = [col + '50', col + '00'];
  const progressColors = [col, col + '00'];

  return (
    <LinearGradient
      colors={progress_bg_Colors}
      style={{
        ...StyleSheet.absoluteFill,
        maxHeight: 60,
      }}>
      <LinearGradient
        colors={progressColors}
        style={{
          ...StyleSheet.absoluteFill,
          maxHeight: 60,
          width: progress + '%',
        }}></LinearGradient>
    </LinearGradient>
  );
};

export default function Card(props) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  // console.log("card--",props.item.pr_thumbnails);

  const nav = useNavigation();
  var width_percent = (props.item.con_spots * 100) / props.item.con_total_spots;

  const _addToCart = () => {
    if(!props?.user)return
    service.get(
      default_url +
        `/contest/orderSpot/${props?.user}/${props.item.con_id}/${props.item.product_id}`,
      (err, res) => {
        // console.log("----------------",err, res);
        setIsAddedToCart(true);
      },
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        nav.navigate('ContestDetails', {con_id: props.item.con_id})
      }
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 20,
        margin: 10,
        borderRadius: 30,
        backgroundColor: colors.primary + 10,
        overflow: 'hidden',
      }}>
      <Progress progress={width_percent} />

      <View style={{flexDirection: 'row'}}>
        <Text style={{...fonts.reg_font, fontWeight: '900'}}>
          {props.item.con_spots} sold{' '}
        </Text>
        <Text style={{...fonts.reg_font, fontWeight: '600'}}>
          Out of {props.item.con_total_spots}
        </Text>
      </View>

      {/* SECT 2 */}

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <View>
          <Image
            // source={require('../assets/car.png')}
            source={{
              uri:
                default_url +
                '/images/contest_cover/' +
                props.item.con_thumbnails,
            }}
            style={{width: 200, height: 100}}
            resizeMode="contain"
          />
        </View>

        <View>
          <Image
            // source={require('../assets/product.png')}
            source={{
              uri: default_url + '/images/products/' + props.item.pr_thumbnails,
            }}
            style={{width: 80, height: 100}}
            resizeMode="contain"
          />
          {/* <Currency value={props.item.pr_price} prefix=" Only" /> */}
        </View>
      </View>

      {/* SECT 3 */}

      <View>
        <Text style={{...fonts.bold_font, color: '#444444', fontSize: 18}}>
          WIN{' '}
          <Text style={{...fonts.bold_font, fontWeight: '900', fontSize: 18}}>
            {props.item.con_win}
          </Text>
        </Text>

        {/* <Text style={fonts.reg_font}> INR cash</Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{width: '60%'}}>
            <Currency value={props.item.pr_price} prefix=" Only" />
            <Text style={fonts.reg_font}>
              Buy our {props.item.pr_name}
            </Text>
          </View>

          <TouchableOpacity
            // onPress={() => nav.navigate('Cart')}
            onPress={props?.user ? () => (isAddedToCart ? null : _addToCart()) : ()=> alert('To make purchase need signup!')}
            disabled={isAddedToCart}
            style={{
              backgroundColor: isAddedToCart ? '#fff' : '#444444',
              borderWidth: isAddedToCart ? 3 : 0,
              borderColor: '#444444',
              padding: isAddedToCart ? 7 : 10,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: !isAddedToCart ? '#fff' : '#444444',
                fontWeight: '900',
              }}>
              {isAddedToCart ? 'ADDED' : 'ADD TO CART'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
