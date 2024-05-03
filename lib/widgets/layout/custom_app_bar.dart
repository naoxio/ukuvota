/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/widgets/language_switcher.dart';
import 'package:ukuvota/widgets/search_delegate.dart';
import 'package:provider/provider.dart';
import 'package:ukuvota/app_state.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CustomAppBar({Key? key}) : super(key: key);

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;
    final appState = Provider.of<MyAppState>(context);
    final screenWidth = MediaQuery.of(context).size.width;

    return AppBar(
      automaticallyImplyLeading: false,
      leading: IconButton(
        icon: const Icon(Icons.search),
        onPressed: () {
          showSearch(
            context: context,
            delegate: CustomSearchDelegate(context),
          );
        },
      ),
      title: InkWell(
        onTap: () => context.go('/'),
        child: screenWidth < 500
            ? const Icon(Icons.dashboard)
            : Text(localizations.buttonDashboard),
      ),
      actions: [
        Row(
          children: [
            const LanguageSwitcher(),
            IconButton(
              icon: Icon(
                appState.themeMode == ThemeMode.light
                    ? Icons.dark_mode
                    : Icons.light_mode,
              ),
              onPressed: () {
                final currentThemeMode = appState.themeMode == ThemeMode.light
                    ? ThemeMode.dark
                    : ThemeMode.light;
                appState.setThemeMode(currentThemeMode);
              },
            ),
            SizedBox(width: 16),
          ],
        ),
      ],
    );
  }
}
