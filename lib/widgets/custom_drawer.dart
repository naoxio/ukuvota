import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/main.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final isSmallScreen = MediaQuery.of(context).size.width < 600;

    return isSmallScreen
        ? Drawer(
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                DrawerHeader(
                  decoration: BoxDecoration(
                    color: Theme.of(context).primaryColor,
                  ),
                  child: const Text(
                    'Ukuvota',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                    ),
                  ),
                ),
                ListTile(
                  leading: Icon(Icons.dashboard),
                  title: Text(localizations.buttonDashboard),
                  onTap: () {
                    context.go('/dashboard');
                    Navigator.pop(context);
                  },
                ),
                if (isSmallScreen)
                  ListTile(
                    leading: Icon(Icons.language),
                    title: Text('Language'),
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: Text('Select Language'),
                          content: DropdownButton<String>(
                            value: localizations.localeName,
                            onChanged: (String? newValue) {
                              if (newValue != null) {
                                MyApp.setLocale(context, Locale(newValue));
                                Navigator.pop(context);
                              }
                            },
                            items:
                                AppLocalizations.supportedLocales.map((locale) {
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
                        ),
                      );
                    },
                  ),
              ],
            ),
          )
        : Container();
  }
}
