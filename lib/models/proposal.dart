class Proposal {
  final String id;
  String title;
  String description;
  bool editing;
  String? descriptionHtml;

  Proposal({
    required this.id,
    required this.title,
    required this.description,
    this.editing = false,
    this.descriptionHtml,
  });

  factory Proposal.fromJson(Map<String, dynamic> json) {
    return Proposal(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      editing: json['editing'] ?? false,
    );
  }
}
