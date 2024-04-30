/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:ukuvota/widgets/layout/custom_app_bar.dart';

class MainScaffold extends StatelessWidget {
  final Widget body;

  const MainScaffold({Key? key, required this.body}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    //final isSmallScreen = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      appBar: const CustomAppBar(),
      // drawer: isSmallScreen ? const CustomDrawer() : null,
      body: body,
    );
  }
}
