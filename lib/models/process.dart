import 'package:ukuvota/models/voter.dart';
import 'package:ukuvota/models/proposal.dart';

class Process {
  final String id;
  final String title;
  final String? description;
  final List<int> proposalDates;
  final List<int> votingDates;
  final String? timezone;
  final String? weighting;
  final List<Proposal>? proposals;
  final List<Voter>? voters;

  Process({
    required this.id,
    required this.title,
    this.description,
    required this.proposalDates,
    required this.votingDates,
    this.timezone,
    this.weighting,
    this.proposals,
    this.voters,
  });

  factory Process.fromMap(Map<String, dynamic> map) {
    return Process(
      id: map['_id'] as String,
      title: map['title'] as String,
      description: map['description'] as String?,
      proposalDates: List<int>.from(map['proposalDates']),
      votingDates: List<int>.from(map['votingDates']),
      timezone: map['timezone'] as String?,
      weighting: map['weighting'] as String?,
      proposals: map['proposals'] != null
          ? List<Proposal>.from(
              map['proposals'].map((proposal) => Proposal.fromJson(proposal)),
            )
          : null,
      voters: map['voters'] != null
          ? List<Voter>.from(
              map['voters'].map((voter) => Voter.fromMap(voter)),
            )
          : null,
    );
  }
}
