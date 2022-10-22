/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState}from 'react';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import DeviceInfo from 'react-native-device-info';
import type {Node} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

let DATASmall = [
  { source: require('./images/img1.jpg') },
  { source: require('./images/img2.jpg') },
  { source: require('./images/img3.jpg') },
  { source: require('./images/img4.jpg') },
  { source: require('./images/img5.jpg') },
  { source: require('./images/img6.jpg') },
  { source: require('./images/img7.jpg') },
  { source: require('./images/img8.jpg') },
  { source: require('./images/img9.jpg') },
  { source: require('./images/img10.jpg') },
  { source: require('./images/img11.jpg') },
  { source: require('./images/img12.jpg') },
  { source: require('./images/img13.jpg') },
  { source: require('./images/img14.jpg') },
  { source: require('./images/img15.jpg') },
  { source: require('./images/img16.jpg') },
  { source: require('./images/img17.jpg') },
  { source: require('./images/img18.jpg') },
  { source: require('./images/img19.jpg') },
  { source: require('./images/img20.jpg') },
  { source: require('./images/img21.jpg') },
  { source: require('./images/img22.jpg') },
  { source: require('./images/img23.jpg') },
  { source: require('./images/img24.jpg') },
  { source: require('./images/img25.jpg') },
  { source: require('./images/img26.jpg') },
  { source: require('./images/img27.jpg') },
  { source: require('./images/img28.jpg') }
];

const localhostip = '10.42.0.1';
let DATA = DATASmall;
let spinValue = new Animated.Value(0);
let counter = 0;
let maxImagesCount = 28;
let columns = 4;
let waitingTime = 22000;
const APP_ID = "com.reactappexp";
const FRAMEWORK = "REACT";
const TEST_TYPE = "imageRotation";
const {height, width} = Dimensions.get('window');

let hasCalled = false;

const setupData = function (data) {
  const dataSplited = data.split('-');
  maxImagesCount = parseInt(dataSplited[1])
  columns = parseInt(dataSplited[2])
  return dataSplited[1];
};

function getImages(data, imageCount) {
  const list = []
  for (let i = 0; i < imageCount; i++) {
    list.push(data[i % 28])
  }
  return list
}


const App: () => Node = () => {
  useKeepAwake();
  const [isLoading, setLoading] = useState(true);

  const whatNow = async () => {
    try {
      if (hasCalled) { reutrn; }
      let deviceModel = await DeviceInfo.getModel()
      const response = await fetch(
        'http://' + localhostip + ':3000/' + 'what_now',
        {
          method: 'GET',
          headers: {
            'device': deviceModel,
            'test_type': TEST_TYPE,
            'application_id': APP_ID,
            'framework': FRAMEWORK
          }
        }
      );
      const benchmark = await response.text();
      hasCalled = true;
      setupData(benchmark);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  whatNow();

  return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            numColumns={columns}
            data={getImages(DATA, maxImagesCount)}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <View style={styles.imageView}>
                <TouchableOpacity onPress={doNothing()}>
                  <Animated.Image
                    onLoad={() => updateCounter()}
                    style = {{
                      resizeMode: 'contain',
                      transform: [{rotate: spin}],
                      height: (width / columns),
                      width: (width / columns)
                    }}
                    source={item.source}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
  );
};


//Rotate images three seconds after all images have been loaded.
const updateCounter = function () {
  counter++;
  if (counter >= maxImagesCount) {
    setTimeout(() => startRotating(), 2000);
    setTimeout(() => sendLogData(), waitingTime);
  }
};

const sendLogData = async () => {
  try {
    let deviceModel = await DeviceInfo.getModel()
    const response = await fetch(
      'http://' + localhostip + ':3000/' + 'logdata',
      {
        method: 'GET',
        headers: {
          'device': deviceModel,
          'test_type': TEST_TYPE,
          'application_id': APP_ID,
          'framework': FRAMEWORK
        }
      }
    );
    const isDone = await response.text();
    checkCorrectData(isDone);
  } catch (error) {
    console.error(error);
  }
};

const checkCorrectData = async isDone => {
  if (isDone === 'done') {
    let deviceModel = await DeviceInfo.getModel()
    try {
      const response = await fetch(
        'http://' + localhostip + ':3000/' + 'done',
        {
          method: 'GET',
          headers: {
            'device': deviceModel,
            'test_type': TEST_TYPE,
            'application_id': APP_ID,
            'activity': '.MainActivity'
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('not done?');
  }
};

const doNothing = function () {};

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '3240deg'],
});

let rotateImageStyle = {
  resizeMode: 'contain',
  transform: [{rotate: spin}],
};

const startRotating = function () {
  const spinDuration = 18000;
  Animated.timing(spinValue, {
    toValue: 1,
    duration: spinDuration,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();
};

const styles = StyleSheet.create({
  flatList: {
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageView: {
    flex: 1
  },
});


export default App;
