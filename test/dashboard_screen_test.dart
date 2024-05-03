/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ukuvota/screens/dashboard/dashboard_screen.dart';

void main() {
  testWidgets('DashboardScreen displays correctly',
      (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: DashboardScreen()));

    expect(find.text('Currently in Progress'), findsOneWidget);
    expect(find.text('Completed Processes'), findsOneWidget);
    expect(find.text('Start a New Process'), findsOneWidget);
  });
}
