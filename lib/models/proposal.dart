// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

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
      total: json['total'],
    );
  }

  factory Proposal.fromMap(Map<dynamic, dynamic> map) {
    return Proposal(
      id: map['id'] ?? '',
      title: map['title'] ?? '',
      description: map['description'] ?? '',
      editing: map['editing'] ?? false,
      total: map['total']?.toDouble(),
    );
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
