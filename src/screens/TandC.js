import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {Header} from '../components';
// Espera Terms of Use
// https://doc-hosting.flycricket.io/espera-terms-of-use/332b0563-2bed-4793-a08d-3c3e4ebcc21e/terms
const TandC = () => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        {/* <Header homeHeader={false} title="How It Works" /> */}
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.title}>
            Apple is not a sponsor nor is involved in any of Espera e-shop
            activities.
          </Text>

          <Text>
            * All our complementary coupons awarded with the purchase are system
            generated, user cannot choose the coupon number as this generated
            upon completing the purchase by our system automatically.
          </Text>
          <Text>
            {'\n'}* Campaign draws will take place as per the mentioned date for
            each campaign or when the campaign sold out, whichever earlier
            subject to the availability of the regulatory representative.
          </Text>
          <Text>
            {'\n'}* The max draw date of any draw campaign is indicated on each
            draw campaign, Winner will be announced on the draw date itself.
            <Text>
              {'\n\n'}* Winners are responsible for any and all tax liability
              where applicable.
            </Text>
          </Text>
          <Text>
            {'\n'}* We will not be responsible for claims, damages, or expenses
            of any nature whatsoever for any loss, illness, bodily injury,
            including death, of or to any Winner and/or any third party during
            and/or in course of usage of any Prize or due to any defects in any
            Prize.
          </Text>
          <Text>
            {'\n'}* Espera e-shop reserve the right to bring forward the draw
            date indicated on draw campaign at any time.
          </Text>
          <Text style={styles.p}>
            {`By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages or make derivative versions. The app itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, still belong to Espera.`}
          </Text>
          <Text style={styles.p}>
            {`Espera is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for. The Espera app stores and processes personal data that you have provided to us, to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the Espera app won’t work properly or at all.`}
          </Text>

          <Text style={styles.p}>
            {`You should be aware that there are certain things that Espera will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi or provided by your mobile network provider, but Espera cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.`}
          </Text>
          <Text
            style={
              styles.p
            }>{`If you’re using the app outside of an area with Wi-Fi, you should remember that the terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third-party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app. Along the same lines, Espera cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, Espera cannot accept responsibility.`}</Text>

          <Text
            style={
              styles.p
            }>{`With respect to Espera’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Espera accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.`}</Text>
          <Text
            style={
              styles.p
            }>{`At some point, we may wish to update the app. The app is currently available on Android & iOS – the requirements for the both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Espera does not promise that it will always update the app so that it is relevant to you and/or works with the Android & iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.`}</Text>

          <Text style={styles.title}>Changes to This Terms and Conditions</Text>
          <Text
            style={
              styles.p
            }>{`We may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page.These terms and conditions are effective as of ${new Date().toLocaleDateString()}`}</Text>

          <Text style={styles.title}>Contact Us</Text>
          <Text
            style={
              styles.p
            }>{`If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at esperanew@gmail.com.`}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default TandC;

const styles = StyleSheet.create({
  title: {marginVertical: 20, color: '#000'},
  container: {
    padding: 22,
    paddingBottom: 100,
  },
  p: {textAlign: 'justify', fontSize: 12, marginTop: 10},
});
