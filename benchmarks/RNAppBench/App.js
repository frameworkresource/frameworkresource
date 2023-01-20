import React, {useState} from 'react';
import binarytree from './benchmarks/binarytree';
import fasta from './benchmarks/fasta';
import fann from './benchmarks/fannkuch';
import nbody from './benchmarks/nbody';
import pidigits from './benchmarks/pidigits';
import spectral from './benchmarks/spectral';
import mandelbrot from './benchmarks/mandelbrot';


import startKnucleotide from './benchmarks/knucleotide';
import startRegex from './benchmarks/regex';
import startRevComp from './benchmarks/revcomp';

import DeviceInfo from 'react-native-device-info';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import type {Node} from 'react'; //This is showing as an error, i'm not sure why

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';


let hasCalled = false;

const APP_ID = "com.rnappbench";
const FRAMEWORK = "REACT";
const TEST_TYPE = "benchmarkGame";

const localhostip = '10.42.0.1';

const App: () => Node = () => {
  useKeepAwake();
  let benchmark;
  const [isLoading, setLoading] = useState(true);

  const whatNow = async () => {
    if (hasCalled) { reutrn; }
    console.log('http://' + localhostip + ':3000/' + 'what_now');
    try {
      let deviceModel = await DeviceInfo.getModel()
      const response = await fetch(
        'http://' + localhostip + ':3000/' + 'what_now',
        {
          method: 'GET',
          headers: {
            'device': deviceModel,
            'test_type': TEST_TYPE,
            'framework': FRAMEWORK
          }
        }
      );
      benchmark = await response.text();
      hasCalled = true;
      console.log('executing: ' + benchmark);
      setLoading(false);
      await setupData(benchmark);
      sendLogData();
    } catch (error) {
      console.error(error);
    }
    
  };

  whatNow();

const sendLogData = async () => {
  try {
    console.log('http://' + localhostip + ':3000/' + 'logdata');
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
    try {
      console.log('http://' + localhostip + ':3000/' + 'done');
      let deviceModel = await DeviceInfo.getModel()
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




const setupData = async function (data) {
  const dataSplited = data.split('-');
  console.log(dataSplited);
  const algoritm = dataSplited[0]
  const parameter = parseInt(dataSplited[1])
  var start = new Date().getTime();
  let hasFinished;
  switch (algoritm) {
    case 'binarytree':
      hasFinished = await binarytree(parameter);
      break;
    case 'mandelbrot':
      hasFinished = await mandelbrot(parameter);
      break;
    case 'fannkuch':
      hasFinished = await fann(parameter);
      break;
    case 'fasta':
      hasFinished = await fasta(parameter);
      break;
    case 'knucleotide':
      hasFinished = await startKnucleotide(parameter);
      break;
    case 'nbody':
      hasFinished = await nbody(parameter);
      break;
    case 'pidigits':
      hasFinished = await pidigits(parameter);
      break;
    case 'regex':
      hasFinished = await startRegex(parameter);
      break;
    case 'revcomp':
      hasFinished = await startRevComp(parameter);
      break;
    case 'spectral':
      hasFinished = await spectral(parameter);
      break;
    default:
      console.log('no input option');
  }

  if (hasFinished === 'finished') {
    var end = new Date().getTime();
    var time = (end - start)/1000.0;
    console.log('Execution time: ' + time);
  }else{
    console.log("ERROR: did not finish right");
  }

}

return (
  <View style={styles.view}>
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <FlatList
        contentContainerStyle={styles.flatList}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.imageView}>
            <p>{benchmark}</p>
          </View>
        )}
      />
    )}
  </View>
);

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

const finish = function () {
  console.log('logdata');
  sendLogData();
}

export default App;
