import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/main.dart';

class CustomAppBar extends StatefulWidget implements PreferredSizeWidget {
  const CustomAppBar({Key? key}) : super(key: key);

  @override
  CustomAppBarState createState() => CustomAppBarState();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class CustomAppBarState extends State<CustomAppBar> {
  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return AppBar(
      title: Row(
        children: [
          const Text('Ukuvota'),
          const SizedBox(width: 16),
          TextButton(
            onPressed: () {
              // Handle dashboard navigation
            },
            child: Text(
              localizations.buttonDashboard,
              style: const TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
      actions: [
        DropdownButton<String>(
          value: localizations.localeName,
          onChanged: (String? newValue) {
            if (newValue != null) {
              setState(() {
                MyApp.setLocale(context, Locale(newValue));
              });
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
              child: Text(languageName),
            );
          }).toList(),
        ),
        const SizedBox(width: 16),
      ],
    );
  }
}
