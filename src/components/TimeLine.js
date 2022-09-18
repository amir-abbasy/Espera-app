import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';

const data_ = [
  {
    prize: 'start',
    icon: 'start',
    status: 'current',
  },
  {
    prize: '150',
    icon: 'win',
    status: 'next',
  },
  {
    prize: '300',
    icon: 'win',
    status: 'upcoming',
  },
  {
    prize: '500',
    icon: 'win',
    status: 'upcoming',
  },
  {
    prize: '200',
    icon: 'win',
    status: 'upcoming',
  },
];

const Level = props => {
  return (
    <View
      style={{
        // width: 50,
        borderBottomWidth: 2,
        paddingBottom: 10,
        alignItems: 'center',
        borderColor: '#444444',
        opacity: props.item.status == 'upcoming' ? 0.4 : 1,
        borderStyle: props.item.status == 'upcoming' ? 'dashed' : 'solid',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          backgroundColor: '#444444',
          color: '#fff',
          textAlign: 'center',
          borderRadius: 10,
          paddingHorizontal: 5,
          fontSize: 10,
        }}>
        {props.item.prize}
      </Text>
      {props.item.status == 'current' ? (
        <IconFA
          onPress={() => nav.navigate('Profile')}
          name="user"
          color="#444444"
          size={25}
          style={{marginTop: 5}}
        />
      ) : (
        <Image
          source={require('../assets/win.png')}
          style={{width: 30, height: 30, marginTop: 5}}
        />
      )}
    </View>
  );
};

export default function TimeLine() {
  return (
    <View>
      <FlatList
        data={data_}
        renderItem={({item}, index) => <Level item={item} />}
        keyExtractor={(_, k) => k.toString()}
        horizontal
        contentContainerStyle={{marginTop: 50, paddingLeft: 22}}
      />
      <Text style={{fontSize: 10, marginTop: 5, paddingLeft: 22}}>
        Purshease for Rs 2000.00 more to reach next level
      </Text>
    </View>
  );
}