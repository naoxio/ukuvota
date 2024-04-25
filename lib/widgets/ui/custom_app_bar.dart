import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/main.dart';
import 'package:ukuvota/widgets/language_switcher.dart';

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
                TextButton.icon(
                  icon: const Icon(Icons.dashboard,
                      color: Colors.white), // Icon with specified color
                  label: Text(
                    localizations.buttonDashboard,
                    style: const TextStyle(color: Colors.white),
                  ),
                  onPressed: () => context.go('/dashboard'),
                ),
              ],
            ),
      actions: !isSmallScreen
          ? [
              const LanguageSwitcher(),
              const SizedBox(width: 16),
            ]
          : null,
    );
  }
}
