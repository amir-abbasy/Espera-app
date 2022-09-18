import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {TimeLine, Header} from '../../components';
import service from '../../global/service';
import {colors, default_url, fonts} from '../../global/constanants';
import {getStore} from '../../global/util';

export default function Details() {
  const [profile, setProfile] = useState();

  async function getProfile() {
    var userId = JSON.parse(await getStore('@user')).userId;
    // console.log("....user....-....", user);
    service.get(default_url + '/user/getUser/user_id/' + userId, (err, res) => {
      // console.log('-----', res, err);
      setProfile(res[0]);
    });
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Header homeHeader={false} title="Profile" canGoBack />
      {profile ? (
        <View style={{padding: 22}}>
          <Text style={fonts.bold_font}>Personal Details</Text>
          <Text style={fonts.reg_font}>user id: {profile.user_id}</Text>
          <Text style={fonts.reg_font}>Username</Text>
          <Text style={fonts.reg_font}>{profile.username}</Text>
          <Text style={fonts.reg_font}>Email</Text>
          <Text style={fonts.reg_font}>{profile.email}</Text>
          <Text style={fonts.reg_font}>Name</Text>
          <Text style={fonts.reg_font}>{profile.fullname}</Text>
          <Text style={fonts.reg_font}>Phone</Text>
          <Text style={fonts.reg_font}>{profile.mobile}</Text>
          <Text style={fonts.reg_font}>Address</Text>
          <Text style={fonts.reg_font}>{profile.user_address}</Text>
          <Text style={fonts.reg_font}>Profile Pic</Text>
          <Text style={fonts.reg_font}>{profile.profile_pic}</Text>
        </View>
      ) : (
        <ActivityIndicator loading={true} color="#000" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 5,
  },
});
