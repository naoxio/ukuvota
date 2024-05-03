/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ukuvota/main.dart';

void main() {
  testWidgets('MyApp initializes correctly', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp(
      initialLocale: Locale('en', 'English'),
      initialThemeMode: ThemeMode.dark,
    ));
    expect(find.byType(MaterialApp), findsOneWidget);
  });
}
