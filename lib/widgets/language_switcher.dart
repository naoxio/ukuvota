// file: language_switcher.dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/main.dart';

class LanguageSwitcher extends StatelessWidget {
  const LanguageSwitcher({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return DropdownButton<String>(
      underline: Container(),
      dropdownColor: Theme.of(context).primaryColor,
      icon: const Icon(Icons.language, color: Colors.white),
      value: localizations.localeName,
      onChanged: (String? newValue) {
        if (newValue != null) {
          MyApp.setLocale(context, Locale(newValue));
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
          value: languageCode,
          child:
              Text(languageName, style: const TextStyle(color: Colors.white)),
        );
      }).toList(),
    );
  }
}
