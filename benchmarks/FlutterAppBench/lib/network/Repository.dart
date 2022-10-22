import 'package:http/http.dart' as http;
import 'package:starter/model/Program.dart';
import 'package:device_info_plus/device_info_plus.dart';

const BASE_URL = "http://10.42.0.1:3000/";
//const BASE_URL = "http://10.64.0.111:3000/";
const START_ENDPOINT = "what_now/";
const LOGDATA_ENDPOINT = "logdata/";
const FINISH_ENDPOINT = "done/";

const APP_ID = "com.example.starter";
const FRAMEWORK = "FLUTTER";
const TEST_TYPE = "benchmarkGame";

Future<ProgramExecution> start() async {
  AndroidDeviceInfo androidInfo = await DeviceInfoPlugin().androidInfo;
  var response = await http.get(
      Uri.parse(BASE_URL + START_ENDPOINT),
      headers: {
        'device': androidInfo.model!,
        'test_type': TEST_TYPE
      }
  );
  if (response.statusCode == 200){
    return programMapper(response.body.toString());
  }
  throw Exception("Error on starting code");
}

Future<void> logdata() async {
  AndroidDeviceInfo androidInfo = await DeviceInfoPlugin().androidInfo;
  var response = await http.get(
      Uri.parse(BASE_URL + LOGDATA_ENDPOINT),
      headers: {
        'device': androidInfo.model!,
        'test_type': TEST_TYPE,
        'application_id': APP_ID,
        'framework': FRAMEWORK
      }
  );
  if (response.statusCode != 200){
    throw Exception("Error on logging battery status code");
  }
}

void done() async {
  AndroidDeviceInfo androidInfo = await DeviceInfoPlugin().androidInfo;
  http.get(
      Uri.parse(BASE_URL + FINISH_ENDPOINT),
      headers: {
        'device': androidInfo.model!,
        'test_type': TEST_TYPE,
        'application_id': APP_ID,
        'activity': '.MainActivity'
      }
  );
}
