import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/widgets/language_switcher.dart';

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
                  leading: const Icon(Icons.dashboard),
                  title: Text(localizations.buttonDashboard),
                  onTap: () {
                    context.go('/dashboard');
                    Navigator.pop(context);
                  },
                ),
                if (isSmallScreen)
                  ListTile(
                    leading: const Icon(Icons.language),
                    title: const Text('Language'),
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (context) => const AlertDialog(
                          title: Text('Select Language'),
                          content: LanguageSwitcher(),
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
