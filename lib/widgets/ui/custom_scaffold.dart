import 'package:flutter/material.dart';
import 'package:ukuvota/widgets/ui/custom_app_bar.dart';
import 'package:ukuvota/widgets/ui/custom_drawer.dart';

class CustomScaffold extends StatelessWidget {
  final Widget body;

  const CustomScaffold({Key? key, required this.body}) : super(key: key);

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
