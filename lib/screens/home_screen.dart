import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/widgets/ui/custom_scaffold.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return CustomScaffold(
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
                  style: Theme.of(context).textTheme.subtitle1,
                ),
                const SizedBox(height: 20),
                FutureBuilder<String>(
                  future: loadMarkdown(context, localizations.localeName),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const CircularProgressIndicator();
                    } else if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}');
                    } else if (snapshot.hasData) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: MarkdownBody(data: snapshot.data!),
                      );
                    } else {
                      return const Text('Failed to load markdown.');
                    }
                  },
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    context.go('/create');
                  },
                  child: Text(localizations.webAppCardButton),
                ),

                const SizedBox(height: 40),
                // Add your footer widget here
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
