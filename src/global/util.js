import AsyncStorage from '@react-native-async-storage/async-storage';

  export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
     console.log('saving-storage :', e);
    }
  }

  export const getStore = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
    //   jsonValue != null ? JSON.parse(jsonValue) : null;
      return jsonValue;
    } catch(e) {
     console.log('saving-storage :', e);
    }
  }

  
  export const storeRemoveData = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
     console.log('removing-storage :', e);
    }
  }


  export function color(progress) {
    var color = '';
    if (progress > 50 && progress < 75) {
      color = '#D8EE50';
    } else if (progress >= 75) {
      color = '#EE6D50';
    } else {
      color = '#50EE7C';
    }
    
    return color;
  }