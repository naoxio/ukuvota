import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text('Ukuvota'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: [
              const SizedBox(height: 20),
              Image.asset(
                'assets/images/logo.png',
                width: 220,
              ),
              const SizedBox(height: 10),
              Text(
                localizations.home_subheader,
                style: Theme.of(context).textTheme.subtitle1,
              ),
              const SizedBox(height: 20),
              FutureBuilder<String>(
                future: loadMarkdown(context, localizations.localeName),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    print("Loading markdown...");
                    return const CircularProgressIndicator();
                  } else if (snapshot.hasError) {
                    print("Error loading markdown: ${snapshot.error}");
                    return Text('Error: ${snapshot.error}');
                  } else if (snapshot.hasData) {
                    print("Markdown loaded successfully.");
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
                  // Handle button press
                },
                child: Text(localizations.home_webAppCardButton),
              ),
              const SizedBox(height: 40),
              // Add your footer widget here
            ],
          ),
        ),
      ),
    );
  }

  Future<String> loadMarkdown(BuildContext context, String localeName) async {
    print("Attempting to load markdown for locale: $localeName");
    return await DefaultAssetBundle.of(context).loadString(
      'assets/content/$localeName/Introduction.md',
    );
  }
}
