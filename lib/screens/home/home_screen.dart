import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/utils/markdown_loader.dart';
import 'package:ukuvota/widgets/layout/main_scaffold.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return MainScaffold(
      body: Center(
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              children: [
                const SizedBox(height: 20),
                Image.asset(
                  'assets/images/logo.png',
                  width: 220,
                ),
                const SizedBox(height: 10),
                Text(
                  localizations.homeSubheader,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 20),
                MarkdownLoader(
                    localeName: localizations.localeName,
                    fileName: 'Introduction'),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    context.go('/create');
                  },
                  child: Text(localizations.webAppCardButton),
                ),
                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<String> loadMarkdown(BuildContext context, String localeName) async {
    return await DefaultAssetBundle.of(context).loadString(
      'assets/content/$localeName/Introduction.md',
    );
  }
}
