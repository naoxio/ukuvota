class Proposal {
  final String id;
  String title;
  String description;
  bool editing;
  double? total;

  Proposal({
    required this.id,
    required this.title,
    required this.description,
    this.editing = false,
    this.total,
  });

  factory Proposal.fromJson(Map<String, dynamic> json) {
    return Proposal(
        id: json['id'],
        title: json['title'],
        description: json['description'],
        editing: json['editing'] ?? false,
        total: json['total']);
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'editing': editing,
      'total': total
    };
  }
}
