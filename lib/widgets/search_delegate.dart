import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class CustomSearchDelegate extends SearchDelegate {
  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
        icon: const Icon(Icons.clear),
        onPressed: () {
          query = '';
        },
      ),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.arrow_back),
      onPressed: () {
        close(context, null);
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return Container();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    RegExp uuidRegex =
        RegExp(r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}');

    if (uuidRegex.hasMatch(query)) {
      String uuid = uuidRegex.firstMatch(query)!.group(0)!;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        context.go('/process/$uuid');
      });
    }

    return Container();
  }
}
