/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import 'dart:convert';

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
      id: json['id'].toString(),
      title: json['title'].toString(),
      description: json['description'].toString(),
      editing: json['editing'] ?? false,
      total: json['total']?.toDouble(),
    );
  }

  factory Proposal.fromMap(Map<dynamic, dynamic> map) {
    final String id = map['id']?.toString() ?? '';
    final String title = map['title']?.toString() ?? '';
    final String description = map['description'] is Map
        ? json.encode(map['description'])
        : map['description']?.toString() ?? '';
    final bool editing = map['editing'] ?? false;
    final double? total = map['total'] is num ? map['total'].toDouble() : null;

    return Proposal(
      id: id,
      title: title,
      description: description,
      editing: editing,
      total: total,
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
