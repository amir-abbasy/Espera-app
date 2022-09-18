import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Header} from '../../components';
import service from '../../global/service';
import currencies from '../../global/currencies.json';
import {getStore, storeData} from '../../global/util';
import DropDownPicker from 'react-native-dropdown-picker';
import {fonts} from '../../global/constanants';

// https://free.currconv.com/api/v7/convert?q=USD_QAR&compact=ultra&apiKey=c51953d4f4608a064655

// https://free.currconv.com/api/v7/currencies?apiKey=c51953d4f4608a064655

export default function Settings() {
  const [profile, setProfile] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState();

  async function getProfile() {
    var curr_ = Object.entries(currencies).map(__ => ({
      label: __[0] + ' - ' + __[1].name,
      value: {currency:__[0], value: __[1].price},
    }));
    setItems(curr_);

    var active_curr = JSON.parse(await getStore('@currency'));

    setProfile(active_curr);

    // service.get(
    //   // 'https://free.currconv.com/api/v7/currencies?apiKey=c51953d4f4608a064655',
    //   'https://openexchangerates.org/api/currencies.json',
    //   (err, res) => {
    //     var currencies = Object.entries(res.results).map(__ => ({
    //       label: __[0]+ ' - ' + __[1],
    //       value: __[0],
    //     }));
    //     setItems(currencies);

    //     // console.log('>>>', user);
    //     // console.log('---', JSON.parse(user).currency);

    //   //   setProfile({
    //   //     ...user,
    //   //     currency: Object.keys(JSON.parse(user).currency)
    //   //       .toString()
    //   //       .replace('USD_', ''),
    //   //   });
    //   },

    //   setProfile(user)
    // );
  }

  async function setCurrency(value) {
    setProfile(value);
    storeData('@currency', value);
  }


  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Header homeHeader={false} title="Profile" canGoBack />
      {/* <Text style={{color: '#000'}}>Settings</Text> */}
      <View
        style={{
          margin: 22,
          padding: 15,
          borderWidth: 1,
        }}>
        <View>
          <Text style={{color: '#000'}}>Currency</Text>
          {profile?.currency && (
            <Text style={{...fonts.bold_font}}>{profile.currency}</Text>
          )}
        </View>
      </View>

      <Text style={{color: '#000', margin: 22, marginBottom: 0}}>
        Change Currency
      </Text>

      {items && (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={value => setCurrency(value)}
          style={{marginTop: 10}}
          containerStyle={{
            margin: 22,
            marginTop: 0,
            width: '90%',
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 5,
  },
});
