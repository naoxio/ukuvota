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

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<MyAppState>(context, listen: false);
    final localizations = AppLocalizations.of(context)!;

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
        return DropdownMenuItem(value: languageCode, child: Text(languageName));
      }).toList(),
    );
  }
}
