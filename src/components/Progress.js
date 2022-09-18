import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {fonts} from '../global/constanants';
import {color} from '../global/util';

export default function Progress(props) {
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const startVal = new Animated.Value(-10);
  const endVal = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.spring(startVal, {
        toValue: endVal,
        friction: 100,
        useNativeDriver: true,
      }),
      {iterations: 1000},
    ).start();
  }, []);

  return (
    <View
      style={{
        flex: 0.5,
        marginBottom: 10,
      }}>
      {props?.data && (
        <Text style={{...fonts.bold_font, fontSize: 12}}>
          {props.data.con_spots} sold
          <Text style={{...fonts.reg_font, fontSize: 12}}>
            {' '}
            out of {props.data.con_total_spots}
          </Text>
        </Text>
      )}
      <View
        style={{
          backgroundColor: color(props.value) + 50,
          borderRadius: 5,
          overflow: 'hidden',
          marginTop: 3,
        }}>
        <Animated.View
          style={{
            height: 5,
            width: props.value + '%',
            backgroundColor: color(props.value),
            transform: [{translateX: startVal}],
          }}></Animated.View>
      </View>
    </View>
  );
}
