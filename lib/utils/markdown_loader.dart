import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

class MarkdownLoader extends StatelessWidget {
  final String localeName;
  final String fileName;

  const MarkdownLoader(
      {Key? key, required this.localeName, required this.fileName})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String>(
      future: _loadMarkdown(context, localeName, fileName),
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
    );
  }

  Future<String> _loadMarkdown(
      BuildContext context, String localeName, String fileName) async {
    return await DefaultAssetBundle.of(context).loadString(
      'assets/content/$localeName/$fileName.md',
    );
  }
}
