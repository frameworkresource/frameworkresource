import 'dart:async';
import 'dart:developer';
import 'dart:io';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_app_exp/network/Repository.dart';
import 'package:wakelock/wakelock.dart';

void main() async {
  runApp(const MyApp());
  Wakelock.enable();
  Future.delayed(const Duration(seconds: 22), () async {
    await logdata();
    done();
  });
}

Future<Pair<List<Widget>,int>> fetchImages() async {
  List<String> parameters = (await start()).split("-");
  var list = <Widget>[];
  var columnSize = int.parse(parameters[2]);
  for (int i = 0; i < int.parse(parameters[1]); i++) {
     list.add(Image.asset(
      "images/images_img${(i % 28) + 1}.jpg"
    ));
  }
  return Pair(list, columnSize);
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage>
    with SingleTickerProviderStateMixin {
  late Future<Pair<List<Widget>,int>> _futureList;
  late Animation<double> _animation;
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    setState(() {
      _controller =
          AnimationController(vsync: this, duration: const Duration(seconds: 18));
      _futureList = fetchImages();
      _animation =
          Tween<double>(begin: 0, end: getAngle(3240)).animate(_controller);
      Future.delayed(const Duration(seconds: 2), (){
        _controller.forward(from: 0);
      });
    });
  }

  double getAngle(int degrees) {
    return degrees * pi / 180;
  }

  @override
  void didUpdateWidget(MyHomePage oldWidget) {
    super.didUpdateWidget(oldWidget);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<Pair<List<Widget>,int>>(
          future: _futureList,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Wrap(children: [
                GridView.count(
                  shrinkWrap: true,
                  crossAxisCount: snapshot.data!.right,
                  children: snapshot.data!.left.map((e) => Center(
                      child: AnimatedBuilder(
                      animation: _animation,
                      builder: (context, child) => Transform.rotate(
                          angle: _animation.value, child: e
                      ),
                    )
                  )).toList(),
                )
              ]);
            }
            return Container();
          },
        ),
    );
  }
}

class Pair<T, R>{
  T left;
  R right;

  Pair(this.left, this.right);
}
