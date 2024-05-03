/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/router.dart';
import 'package:timezone/data/latest.dart' as tz;
import 'package:firebase_core/firebase_core.dart';
import 'package:ukuvota/services/user_preferences.dart';
import 'firebase_options.dart';
import 'package:provider/provider.dart';
import 'package:ukuvota/providers/process_data_provider.dart';
import 'package:ukuvota/app_state.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  tz.initializeTimeZones();

  await UserPreferences.initialize();

  final locale = UserPreferences.getLocale();
  final themeMode = UserPreferences.getThemeMode();

  runApp(MyApp(initialLocale: locale, initialThemeMode: themeMode));
}

class MyApp extends StatelessWidget {
  final Locale initialLocale;
  final ThemeMode initialThemeMode;

  const MyApp({
    super.key,
    required this.initialLocale,
    required this.initialThemeMode,
  });

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ProcessDataProvider()),
        ChangeNotifierProvider(
          create: (_) => MyAppState()
            ..setLocale(initialLocale)
            ..setThemeMode(initialThemeMode),
        ),
      ],
      child: Consumer<MyAppState>(
        builder: (context, appState, _) {
          return MaterialApp.router(
            title: 'Ukuvota',
            debugShowCheckedModeBanner: false,
            theme: ThemeData(
              colorScheme: ColorScheme.fromSeed(
                seedColor: Colors.deepOrange,
                brightness: Brightness.light,
              ),
              useMaterial3: true,
            ),
            darkTheme: ThemeData(
              colorScheme: ColorScheme.fromSeed(
                seedColor: Colors.deepOrange,
                brightness: Brightness.dark,
              ),
              useMaterial3: true,
            ),
            themeMode: appState.themeMode,
            localizationsDelegates: const [
              AppLocalizations.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
            ],
            supportedLocales: const [
              Locale('de', ''),
              Locale('en', ''),
              Locale('es', ''),
              Locale('it', ''),
            ],
            locale: appState.locale,
            routerConfig: router,
          );
        },
      ),
    );
  }
}
