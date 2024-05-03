/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:provider/provider.dart';
import 'package:ukuvota/app_state.dart';

class LanguageSwitcher extends StatelessWidget {
  const LanguageSwitcher({Key? key}) : super(key: key);

  void _showLanguageDialog(BuildContext context) {
    final appState = Provider.of<MyAppState>(context, listen: false);
    final localizations = AppLocalizations.of(context)!;

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(localizations.languageDialogTitle),
          content: SingleChildScrollView(
            child: ListBody(
              children: AppLocalizations.supportedLocales.map((locale) {
                final languageCode = locale.languageCode;
                final languageName = {
                      'en': 'English',
                      'es': 'Español',
                      'de': 'Deutsch',
                      'fr': 'Français',
                      'it': 'Italiano',
                    }[languageCode] ??
                    languageCode;

                return ListTile(
                  title: Text(languageName),
                  onTap: () {
                    appState.setLocale(locale);
                    Navigator.of(context).pop();
                  },
                );
              }).toList(),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final localizations = AppLocalizations.of(context)!;

    if (screenWidth < 500) {
      return IconButton(
        icon: const Icon(Icons.language),
        onPressed: () => _showLanguageDialog(context),
      );
    } else {
      final appState = Provider.of<MyAppState>(context, listen: false);

      return DropdownButton<String>(
        underline: Container(),
        value: localizations.localeName,
        onChanged: (String? newValue) {
          if (newValue != null) {
            appState.setLocale(Locale(newValue));
          }
        },
        items: AppLocalizations.supportedLocales.map((locale) {
          final languageCode = locale.languageCode;
          final languageName = {
                'en': 'English',
                'es': 'Español',
                'de': 'Deutsch',
                'fr': 'Français',
                'it': 'Italiano',
              }[languageCode] ??
              languageCode;

          return DropdownMenuItem(
              value: languageCode, child: Text(languageName));
        }).toList(),
      );
    }
  }
}
