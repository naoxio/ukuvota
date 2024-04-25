import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';
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
    final isSmallScreen = MediaQuery.of(context).size.width < 600;

    return AppBar(
      leading: isSmallScreen
          ? IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
            )
          : null,
      title: isSmallScreen
          ? InkWell(
              onTap: () => context.go('/'),
              child: const Text(
                'Ukuvota',
                style: TextStyle(color: Colors.white),
              ),
            )
          : Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                InkWell(
                  onTap: () => context.go('/'),
                  child: const Text(
                    'Ukuvota',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                const SizedBox(width: 16),
                TextButton(
                  onPressed: () => context.go('/dashboard'),
                  child: Text(
                    localizations.buttonDashboard,
                    style: const TextStyle(color: Colors.white),
                  ),
                ),
              ],
            ),
      actions: !isSmallScreen
          ? [
              DropdownButton<String>(
                underline: Container(),
                dropdownColor: Theme.of(context).primaryColor,
                icon: const Icon(Icons.language, color: Colors.white),
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
                    child: Text(languageName,
                        style: const TextStyle(color: Colors.white)),
                  );
                }).toList(),
              ),
              const SizedBox(width: 16),
            ]
          : null,
    );
  }
}
