import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { colors, default_url, fonts } from '../global/constanants';
const { width } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import {Progress} from '../components'

export default function Card(props) {
  var width_percent = (props.item.con_spots * 100 / props.item.con_total_spots)

  const nav = useNavigation();


  return (
    <View
      style={{
        width: width / 2.5,
        // height: width / 2.2,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginRight: 5,
        marginVertical: 10,
        borderWidth: 4,
        borderColor: '#EDEDED',
        borderRadius: 15,
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        onPress={() => nav.navigate('ContestDetails', { con_id: props.item.con_id })}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{}}>
          <View style={{ width: width / 3, height: 75, alignItems: 'center' }}>
            {/* reward */}
            <Image
              // source={require('../assets/car.png')}
              source={{ uri: default_url + '/images/contest_cover/' + props.item.con_thumbnails }}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            />
            {/* product */}
            <View style={{ position: 'absolute', right: 0 }}>
              <View style={{ width: 50, height: 50 }}>
                <Image
                  // source={require('../assets/product.png')}
                  source={{ uri: default_url + '/images/products/' + props.item.pr_thumbnails }}
                  style={{ width: '100%', height: 100 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <Text style={{ ...fonts.reg_font, fontSize: 10 }}>Get a chance to</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...fonts.bold_font, color: '#444444' }}>
              WIN
            <Text style={{ ...fonts.bold_font, fontSize: 14 }}> {props.item.con_win}</Text>
            </Text>
          </View>
        </View>

      </TouchableOpacity>

      {/* Progress */}
      <View style={{ marginTop: 2 }}>
        <Progress value={width_percent} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...fonts.reg_font, fontSize: 10, fontWeight: '900' }}>{props.item.con_spots} sold </Text>
          <Text style={{ ...fonts.reg_font, fontSize: 10 }}>Out of {props.item.con_total_spots}</Text>
        </View>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({

});
