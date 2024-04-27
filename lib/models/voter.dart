class Voter {
  final String id;
  final String name;
  final List<Vote> votes;

  Voter({
    required this.id,
    required this.name,
    required this.votes,
  });

  factory Voter.fromMap(Map<String, dynamic> map) {
    return Voter(
      id: map['id'] as String,
      name: map['name'] as String,
      votes: List<Vote>.from(
        map['votes'].map((vote) => Vote.fromMap(vote)),
      ),
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

  factory Vote.fromMap(Map<String, dynamic> map) {
    return Vote(
      proposalId: map['proposalId'] as String,
      vote: map['vote'] as int,
    );
  }
}
