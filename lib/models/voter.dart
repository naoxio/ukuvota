/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

class Voter {
  final String id;
  final String name;
  final List<Vote> votes;

  Voter({
    required this.id,
    required this.name,
    required this.votes,
  });

  factory Voter.fromMap(Map<dynamic, dynamic> map) {
    final dynamic votesData = map['votes'];
    List<Vote> votes;

    if (votesData != null) {
      if (votesData is List<dynamic>) {
        votes = votesData
            .map((vote) => vote is Map ? Vote.fromMap(vote) : null)
            .whereType<Vote>()
            .toList();
      } else {
        votes = [Vote.fromMap(votesData)];
      }
    } else {
      votes = [];
    }

    return Voter(
      id: map['id'] as String,
      name: map['name'] as String,
      votes: votes,
    );
  }
}

class Vote {
  final String proposalId;
  final int vote;

  Vote({
    required this.proposalId,
    required this.vote,
  });

  factory Vote.fromMap(Map<dynamic, dynamic> map) {
    return Vote(
      proposalId: map['proposalId'] as String,
      vote: map['vote'] as int,
    );
  }
}
