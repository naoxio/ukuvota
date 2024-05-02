// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import 'dart:convert';
import 'package:ukuvota/models/voter.dart';
import 'package:ukuvota/models/proposal.dart';

class Process {
  final String id;
  final String title;
  final String? description;
  final List<int>? proposalDates;
  final List<int> votingDates;
  final String? timezone;
  final String? weighting;
  final List<Proposal>? proposals;
  final List<Voter>? voters;

  Process({
    required this.id,
    required this.title,
    this.description,
    this.proposalDates,
    required this.votingDates,
    this.timezone,
    this.weighting,
    this.proposals,
    this.voters,
  });

  factory Process.fromMap(Map<String, dynamic> map) {
    List<Voter>? voters;
    final dynamic votersData = map['voters'];
    if (votersData != null) {
      if (votersData is List<dynamic>) {
        voters = votersData
            .map((voter) => voter is Map ? Voter.fromMap(voter) : null)
            .whereType<Voter>()
            .toList();
      } else {
        voters = [Voter.fromMap(votersData)];
      }
    }

    final dynamic proposalsData = map['proposals'];
    List<Proposal>? proposals;

    if (proposalsData != null) {
      if (proposalsData is Map<dynamic, dynamic>) {
        proposals = proposalsData.entries
            .map((entry) => Proposal.fromMap({
                  'id': entry.key.toString(),
                  ...Map<String, dynamic>.from(entry.value),
                }))
            .toList();
      } else if (proposalsData is List<dynamic>) {
        proposals = proposalsData
            .map((proposalData) => Proposal.fromMap(
                  Map<String, dynamic>.from(proposalData),
                ))
            .toList();
      }
    }

    return Process(
      id: map['_id'] as String,
      title: map['title'] as String,
      description: map['description'] is Map
          ? json.encode(map['description'])
          : map['description']?.toString(),
      proposalDates: map['proposalDates'] != null
          ? List<int>.from(map['proposalDates'])
          : null,
      votingDates: List<int>.from(map['votingDates']),
      timezone: map['timezone'] as String?,
      weighting: map['weighting'] as String?,
      proposals: proposals,
      voters: voters,
    );
  }
}
