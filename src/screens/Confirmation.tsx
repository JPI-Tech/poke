import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Share from 'react-native-share';

const shareToContacts = async () => {
  const shareOption = {
    message: 'Download Pokemon go today and checkout what I purchased!',
  };

  try {
    const shareRespnse = await Share.open(shareOption);
    console.log(JSON.stringify(shareRespnse));
  } catch (error: any) {
    console.log(JSON.stringify(error));
  }
};

const Confirmation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.amountText}>Confirmation Order</Text>
        <Text style={styles.text}>Congrads you bough your pokemon</Text>
      </View>
      <View>
        <Image
          style={{width: 300, height: 300}}
          source={require('../assets/images/qrcode.png')}
        />
        <View style={styles.center}>
          <Text style={styles.text}>Share with your Family and Friends</Text>
        </View>
        <TouchableOpacity onPress={shareToContacts}>
          <View style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  shareText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  shareButton: {
    backgroundColor: 'black',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  amountText: {fontSize: 18, fontWeight: 'bold', marginBottom: 30},
  text: {fontSize: 12, fontWeight: 'bold', marginVertical: 20},
  center: {alignItems: 'center'},
});
export default Confirmation;
