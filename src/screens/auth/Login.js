import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import service from '../../global/service';
import {default_url, colors} from '../../global/constanants';
import {storeData} from '../../global/util';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../store/Context';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, seterr] = useState();
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const store = useContext(AppContext);

  const submit = () => {
    if (email.length < 1 || password.length < 1) {
      seterr(`Enter ${email.length < 1 ? 'Username' : 'Password'}`);
      return false;
    } else {
      if (password.length < 6) {
        seterr(`Password must be 6 characters or more`);
        return false;
      } else {
        seterr();
        _login();
        return true;
      }
    }
  };

  const _login = () => {
    var iso = 'AED'; //'USD';
    setLoading(true);
    seterr();
    const body = {username: email, user_password: password};
    service.post(default_url + '/user/login', body, (status, res) => {
      console.log('res-----', res);
      if (res.status) {
        const user = {
          user: res.data[0].username,
          userId: res.data[0].user_id,
          ...res.data[0],
        };
        storeData('@user', user);
        storeData('@currency', {currency: iso, value: 1.0});
        store.setUser(user);
        navigation.navigate('Main');
        setLoading(false);
      } else {
        seterr(res.error);
        setLoading(false);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/logo_light.png')}
      />
      <Image
        style={{width: 100, height: 25, marginBottom: 40}}
        source={require('../../assets/name_light.png')}
      />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#444444"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#444444"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      {err && (
        <Text
          style={{
            color: 'white',
            backgroundColor: 'tomato',
            paddingHorizontal: 5,
          }}>
          {err}
        </Text>
      )}
      {/* 
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity> */}

      <TouchableOpacity style={styles.loginBtn} onPress={submit}>
        {!loading ? (
          <Text style={styles.loginText}>LOGIN</Text>
        ) : (
          <ActivityIndicator color="#fff" loading={true} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => nav.navigate('Register')}>
        <Text style={styles.forgot_button}>Create an account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{opacity: .5}}
        onPress={() => nav.navigate('Main')}>
        <Text style={styles.forgot_button}>Skip now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },

  image: {
    width: 50,
    height: 60,
  },

  inputView: {
    backgroundColor: colors.primary + '20',
    backgroundColor: '#fff',

    // borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 15,
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    color: '#000',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#fff',
  },

  loginBtn: {
    width: '80%',
    // borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.primary,
    backgroundColor: '#000',
  },
  loginText: {
    color: '#fff',
  },
});
