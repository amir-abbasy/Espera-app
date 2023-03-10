import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../global/constanants';
import {Header} from '../components';

// - How it works in 3 steps
// Simply buy our products and get a chance to win luxury prizes

// 1 - Shop from our products
// Select from our wide range of clothing and stationery

// 2-Get complimentary coupons to enter the draw
//     With each product purchased you are awarded a complimentary coupon to a prize draw

// 3-Win luxury prizes
//     Once all products with in a campaign are sold, the draw will happen and the winner will be announced

// All draws are approved and regulated by the Dubai

const HowItWorks = () => {
  return (
    <ScrollView>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <Header homeHeader={false} title="How It Works" />

        <Text style={{fontSize:14, fontWeight:'bold', padding: 20}}>
        User Agreement & Draw terms{'\n\n'}
Apple is not a sponsor nor is involved in any of Espera e-shop activities.
        </Text>

        <View
          style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.title, {fontSize: 18, width: '100%'}]}>
            How it works in 3 steps
          </Text>
          <Text style={[styles.title, {marginTop: 20}]}>
            Simply buy our products and get a chance to win luxury prizes
          </Text>
        </View>

        <View style={styles.div}>
          <Text style={styles.step}>1</Text>
          <Text style={styles.title}>Shop from our products</Text>
          <Text style={styles.disc}>
            Select from our wide range of product items.
          </Text>
        </View>

        <View style={styles.div}>
          <Text style={styles.step}>2</Text>
          <Text style={styles.title}>
            Get complimentary coupons to enter the draw
          </Text>
          <Text style={styles.disc}>
            With each product purchased you are awarded a complimentary coupon
            to a prize draw.
          </Text>
        </View>

        <View style={styles.div}>
          <Text style={styles.step}>3</Text>
          <Text style={styles.title}>Win luxury prizes</Text>
          <Text style={styles.disc}>
            Once all products with in a campaign are sold, the draw will happen
            and the winner will be announced.
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HowItWorks;

const styles = StyleSheet.create({
  div: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  step: {
    color: '#fff',
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    textAlign: 'center',
    padding: 10,
    borderRadius: 50,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 15,
    width: '60%',
  },
  disc: {
    marginVertical: 10,
    width: '80%',
  },
});
