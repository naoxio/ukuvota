// file: lib/models/proposal.dart
class Proposal {
  final String id;
  String title;
  String description;
  bool editing;

  Proposal({
    required this.id,
    required this.title,
    required this.description,
    this.editing = false,
  });
}
