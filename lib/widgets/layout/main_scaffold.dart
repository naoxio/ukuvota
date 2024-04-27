import 'package:flutter/material.dart';
import 'package:ukuvota/widgets/layout/custom_app_bar.dart';
import 'package:ukuvota/widgets/layout/custom_drawer.dart';

class MainScaffold extends StatelessWidget {
  final Widget body;

  const MainScaffold({Key? key, required this.body}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isSmallScreen = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      appBar: const CustomAppBar(),
      drawer: isSmallScreen ? const CustomDrawer() : null,
      body: body,
    );
  }
}
