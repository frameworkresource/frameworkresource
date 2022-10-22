/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import type {Node} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
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
  {
    id: '0',
    source: require('./images/small/img1.jpg'),
  },
  {
    id: '1',
    source: require('./images/small/img2.jpg'),
  },
  {
    id: '2',
    source: require('./images/small/img3.jpg'),
  },
  {
    id: '3',
    source: require('./images/small/img4.jpg'),
  },
  {
    id: '4',
    source: require('./images/small/img5.jpg'),
  },
  {
    id: '5',
    source: require('./images/small/img6.jpg'),
  },
  {
    id: '6',
    source: require('./images/small/img7.jpg'),
  },
  {
    id: '7',
    source: require('./images/small/img8.jpg'),
  },
  {
    id: '8',
    source: require('./images/small/img9.jpg'),
  },
  {
    id: '9',
    source: require('./images/small/img10.jpg'),
  },
  {
    id: '10',
    source: require('./images/small/img11.jpg'),
  },
  {
    id: '11',
    source: require('./images/small/img12.jpg'),
  },
  {
    id: '12',
    source: require('./images/small/img13.jpg'),
  },
  {
    id: '13',
    source: require('./images/small/img14.jpg'),
  },
  {
    id: '14',
    source: require('./images/small/img15.jpg'),
  },
  {
    id: '15',
    source: require('./images/small/img16.jpg'),
  },
  {
    id: '16',
    source: require('./images/small/img17.jpg'),
  },
  {
    id: '17',
    source: require('./images/small/img18.jpg'),
  },
  {
    id: '18',
    source: require('./images/small/img19.jpg'),
  },
  {
    id: '19',
    source: require('./images/small/img20.jpg'),
  },
  {
    id: '20',
    source: require('./images/small/img21.jpg'),
  },
  {
    id: '21',
    source: require('./images/small/img22.jpg'),
  },
  {
    id: '22',
    source: require('./images/small/img23.jpg'),
  },
  {
    id: '23',
    source: require('./images/small/img24.jpg'),
  },
  {
    id: '24',
    source: require('./images/small/img25.jpg'),
  },
  {
    id: '25',
    source: require('./images/small/img26.jpg'),
  },
  {
    id: '26',
    source: require('./images/small/img27.jpg'),
  },
  {
    id: '27',
    source: require('./images/small/img28.jpg'),
  },
];

let DATAMedium = [
  {
    id: '0',
    source: require('./images/medium/img1.jpg'),
  },
  {
    id: '1',
    source: require('./images/medium/img2.jpg'),
  },
  {
    id: '2',
    source: require('./images/medium/img3.jpg'),
  },
  {
    id: '3',
    source: require('./images/medium/img4.jpg'),
  },
  {
    id: '4',
    source: require('./images/medium/img5.jpg'),
  },
  {
    id: '5',
    source: require('./images/medium/img6.jpg'),
  },
  {
    id: '6',
    source: require('./images/medium/img7.jpg'),
  },
  {
    id: '7',
    source: require('./images/medium/img8.jpg'),
  },
  {
    id: '8',
    source: require('./images/medium/img9.jpg'),
  },
  {
    id: '9',
    source: require('./images/medium/img10.jpg'),
  },
  {
    id: '10',
    source: require('./images/medium/img11.jpg'),
  },
  {
    id: '11',
    source: require('./images/medium/img12.jpg'),
  },
  {
    id: '12',
    source: require('./images/medium/img13.jpg'),
  },
  {
    id: '13',
    source: require('./images/medium/img14.jpg'),
  },
  {
    id: '14',
    source: require('./images/medium/img15.jpg'),
  },
  {
    id: '15',
    source: require('./images/medium/img16.jpg'),
  },
  {
    id: '16',
    source: require('./images/medium/img17.jpg'),
  },
  {
    id: '17',
    source: require('./images/medium/img18.jpg'),
  },
  {
    id: '18',
    source: require('./images/medium/img19.jpg'),
  },
  {
    id: '19',
    source: require('./images/medium/img20.jpg'),
  },
  {
    id: '20',
    source: require('./images/medium/img21.jpg'),
  },
  {
    id: '21',
    source: require('./images/medium/img22.jpg'),
  },
  {
    id: '22',
    source: require('./images/medium/img23.jpg'),
  },
  {
    id: '23',
    source: require('./images/medium/img24.jpg'),
  },
  {
    id: '24',
    source: require('./images/medium/img25.jpg'),
  },
  {
    id: '25',
    source: require('./images/medium/img26.jpg'),
  },
  {
    id: '26',
    source: require('./images/medium/img27.jpg'),
  },
  {
    id: '27',
    source: require('./images/medium/img28.jpg'),
  },
];

let DATAMicro = [
  {
    id: '0',
    source: require('./images/micro/img1.jpg'),
  },
  {
    id: '1',
    source: require('./images/micro/img2.jpg'),
  },
  {
    id: '2',
    source: require('./images/micro/img3.jpg'),
  },
  {
    id: '3',
    source: require('./images/micro/img4.jpg'),
  },
  {
    id: '4',
    source: require('./images/micro/img5.jpg'),
  },
  {
    id: '5',
    source: require('./images/micro/img6.jpg'),
  },
  {
    id: '6',
    source: require('./images/micro/img7.jpg'),
  },
  {
    id: '7',
    source: require('./images/micro/img8.jpg'),
  },
  {
    id: '8',
    source: require('./images/micro/img9.jpg'),
  },
  {
    id: '9',
    source: require('./images/micro/img10.jpg'),
  },
  {
    id: '10',
    source: require('./images/micro/img11.jpg'),
  },
  {
    id: '11',
    source: require('./images/micro/img12.jpg'),
  },
  {
    id: '12',
    source: require('./images/micro/img13.jpg'),
  },
  {
    id: '13',
    source: require('./images/micro/img14.jpg'),
  },
  {
    id: '14',
    source: require('./images/micro/img15.jpg'),
  },
  {
    id: '15',
    source: require('./images/micro/img16.jpg'),
  },
  {
    id: '16',
    source: require('./images/micro/img17.jpg'),
  },
  {
    id: '17',
    source: require('./images/micro/img18.jpg'),
  },
  {
    id: '18',
    source: require('./images/micro/img19.jpg'),
  },
  {
    id: '19',
    source: require('./images/micro/img20.jpg'),
  },
  {
    id: '20',
    source: require('./images/micro/img21.jpg'),
  },
  {
    id: '21',
    source: require('./images/micro/img22.jpg'),
  },
  {
    id: '22',
    source: require('./images/micro/img23.jpg'),
  },
  {
    id: '23',
    source: require('./images/micro/img24.jpg'),
  },
  {
    id: '24',
    source: require('./images/micro/img25.jpg'),
  },
  {
    id: '25',
    source: require('./images/micro/img26.jpg'),
  },
  {
    id: '26',
    source: require('./images/micro/img27.jpg'),
  },
  {
    id: '27',
    source: require('./images/micro/img28.jpg'),
  },
];








const localhostip = '10.43.0.1';
let DATA = [];
let spinValue = new Animated.Value(0);
let counter = 0;
let maxImagesCount = 28;
let waitingTime = 14000;


const setupData = function (data) {
  const dataSplited = data.split('-');
  if (dataSplited[1] === 'micro') {
    DATA = DATAMicro;
  } else if (dataSplited[1] === 'small') {
    DATA = DATASmall;
  } else if (dataSplited[1] === 'medium') {
    DATA = DATAMedium;
  }
  maxImagesCount = +dataSplited[2];
  return dataSplited[1];
};



const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    const response = await fetch(
      'http://' + localhostip + ':3000/' + 'logdata',
    );
    const isDone = await response.text();
    checkCorrectData(isDone);
  } catch (error) {
    console.error(error);
  }
};

const checkCorrectData = async isDone => {
  if (isDone === 'done') {
    try {
      const response = await fetch('http://' + localhostip + ':3000/' + 'done');
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
  outputRange: ['0deg', '1080deg'],
});

let rotateImageStyle = {
  resizeMode: 'contain',
  height: 70,
  width: 70,
  transform: [{rotate: spin}],
};

const startRotating = function () {
  const spinDuration = 6000;
  Animated.timing(spinValue, {
    toValue: 1,
    duration: spinDuration,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  flatList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
    flex: 1,
  },
  imageView: {
    padding: 5,
  },
});













export default App;
