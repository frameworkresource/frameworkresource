import subprocess
import threading
import time
import re


class Vmstat:

    def set_recording_time(self, recording_time):
        assert type(recording_time) == int
        self.__recording_time = recording_time

    def set_filename(self, filename):
        assert type(filename) == str
        self.__filename = filename

    def __init__(self, recording_time=40, filename="vmstat.txt"):
        self.__recording_time = recording_time
        self.__filename = filename

    def __call__(self):
        subprocess.call("adb shell vmstat 1 " + str(self.__recording_time) + " > /data/local/tmp/" + self.__filename, shell=False)


class Systrace:
    def __init__(self, recording_time, output_file, android_platform_tools_path):
        self.__recording_time = recording_time
        self.__output_file = output_file
        self.__android_platform_tools_path = android_platform_tools_path

    def __call__(self):
        command = "python {}/systrace/systrace.py --time={} freq idle -o {}".format(
            self.__android_platform_tools_path,
            self.__recording_time,
            self.__output_file
        )
        subprocess.call(command, shell=False)



def install_apk(apk, device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} install -r ".format(device) + apk, shell=True)

def uninstall_apk(pkg, device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} uninstall ".format(device) + pkg, shell=True)

def pull_data(file, target_folder, device=""):


    subprocess.call("cp " + file + " " + target_folder, shell=True)	

    #args = ["adb"]

    #if device:
    #    args.extend(['-s', device])

    #args.append("pull")
    #args.append(file)
    #args.append(target_folder)

    #subprocess.call(args, shell=True)
	


def start_app(pkg, activity, device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} shell am start -n ".format(device) + pkg + "/." + activity, shell=True)

def start_app_implicit(data, action="android.intent.action.VIEW", device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} shell am start -a {} -d {}".format(device, action, data), shell=True)

def stop_app(pkg, device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} shell am force-stop ".format(device) + pkg, shell=True)

def start_instrumentation(package, classname, background=True, device=""):
    device = "-s " + device if device else ""

    if background:
        subprocess.call("adb {device} shell nohup am instrument -w -e debug false -e class '{package}.{classname}' {package}/androidx.test.runner.AndroidJUnitRunner > /dev/null 2>&1".format(package=package, classname=classname, device=device), shell=True)
    else:
        subprocess.call("adb {device} shell am instrument -w -e debug false -e class '{package}.{classname}' {package}/androidx.test.runner.AndroidJUnitRunner".format(package=package, classname=classname, device=device), shell=True)

def dump_batterystats(device=""):
    device = ("-s " + device) if device else ""
    subprocess.call("adb {} shell dumpsys batterystats > ./data/local/tmp/battery.txt".format(device), shell=True)

def dump_meminfo(appId, device=""):
    device = ("-s " + device) if device else ""
    subprocess.call("adb {} shell dumpsys meminfo {} > ./data/local/tmp/meminfo.txt".format(device, appId), shell=True)

def clear_batterystats(device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} shell dumpsys batterystats --reset".format(device), shell=True)

def start_systrace(recording_time, output_file, android_platform_tools_path):
    thread = threading.Thread(target=Systrace(recording_time, output_file, android_platform_tools_path), name="systrace-thread")
    thread.start()
    time.sleep(3)  # setup time approx

def start_vmstat(recording_time, filename):
    thread = threading.Thread(target=Vmstat(recording_time, filename), name="vmstat-thread")
    thread.start()

def start_top(recording_time, filename, device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} shell top -b -d 1 -n ".format(device) + str(recording_time) + " > /data/local/tmp/" + filename)

def clear_gfxinfo(package, device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} shell dumpsys gfxinfo {} reset".format(device, package))

def dump_gfxinfo(package, filename, device=""):
    device = "-s " + device if device else ""
    subprocess.call("adb {} shell dumpsys gfxinfo {} > /data/local/tmp/{}".format(device, package, filename), shell=True)

def get_connected_device(ip="", port=7777):
    if ip:
        p = subprocess.check_output("adb -s {}:{} shell getprop ro.product.model".format(ip, port), shell=True)
    else:
        p = subprocess.check_output("adb shell getprop ro.product.model".format(ip, port), shell=True)
    return p.decode('utf-8').strip().replace(" ", "")

def kill_all():
    # kill all background processes
    subprocess.call("adb shell am kill-all", shell=True)

def get_ip():
    net_output = subprocess.check_output(
        "adb shell ip -f inet addr show wlan0",
        shell=True,
        universal_newlines=True
    )
    return re.search(r"inet \d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", net_output).group()[5:]

def connect_wifi(ip_address):
    subprocess.call('adb tcpip 5555')
    subprocess.call('adb connect {}'.format(ip_address))

def get_wifi_connected_device():
    devices = subprocess.check_output(
        "adb devices",
        shell=True,
        universal_newlines=True
    )
    match = re.search(r"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})", devices)

    if match:
        return {
            "ip": match.group(1),
            "port": match.group(2)
        }

def get_device_model():
    return subprocess.check_output("adb shell getprop ro.product.model", shell=True, universal_newlines=True).strip()
