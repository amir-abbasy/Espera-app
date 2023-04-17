import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('screen');
import { colors, default_url, fonts } from '../global/constanants'
import { useNavigation } from '@react-navigation/native';

const RenderItem = ({ item, index }) => {
  const progress_bg_Colors = [colors.primary, '#221f4d'];
  const nav = useNavigation();

  return (
    <LinearGradient
      colors={progress_bg_Colors}
      style={{
        width,
        height: height / 2.6,
        justifyContent: 'flex-end',
        backgroundColor: '#4540A2',
        padding: 20,
        position: 'relative'
      }}>


      <Image
        // source={require('../assets/car.png')}
        source={{ uri: default_url + '/images/contest_cover/' + item.con_thumbnails }}
        style={{ ...StyleSheet.absoluteFillObject, width: width, height: height / 2.5, zIndex: 0 }}
        resizeMode="contain"
      />
      <TouchableOpacity style={{ zIndex: 2 }} onPress={() => nav.navigate('ContestDetails', { con_id: item.con_id })}>
        <Text style={{ ...fonts.bold_font, fontSize: 30, color: '#ff4788' }}>Win</Text>
        <Text style={{ ...fonts.bold_font, fontSize: 20, color: '#fff' }}>
          {item.con_win}
        </Text>
        <Text style={{...fonts.reg_font, fontSize: 12, color: '#fff' }} numberOfLines={3}>
          {item.con_discription}
        </Text>
      </TouchableOpacity>

      <LinearGradient
        colors={['transparent', '#222']}
        style={{
          width,
          height: height / 2.6,
          position: 'absolute',
          zIndex: 1
        }}></LinearGradient>


    </LinearGradient>
  );
};

export default function Carousel(props) {
  return (
    <View>
      <FlatList
        data={props.data}
        horizontal
        pagingEnabled
        style={width}
        contentContainerStyle={width}
        renderItem={(item, _) => <RenderItem key={_}  {...item} />}
      />
    </View>
  );
}
