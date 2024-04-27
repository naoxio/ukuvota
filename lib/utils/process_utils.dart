String getProcessUrl(Map<String, dynamic> process) {
  if (process.isEmpty) {
    return '/';
  }

  final currentTime = DateTime.now();
  final proposalStartTime =
      DateTime.fromMillisecondsSinceEpoch(process['proposalDates'][0]);
  final proposalEndTime =
      DateTime.fromMillisecondsSinceEpoch(process['proposalDates'][1]);
  final votingStartTime =
      DateTime.fromMillisecondsSinceEpoch(process['votingDates'][0]);
  final votingEndTime =
      DateTime.fromMillisecondsSinceEpoch(process['votingDates'][1]);

  if (currentTime.isAfter(proposalStartTime) &&
      currentTime.isBefore(proposalEndTime)) {
    return '/process/${process['_id']}/proposals';
  } else if (currentTime.isAfter(votingStartTime) &&
      currentTime.isBefore(votingEndTime)) {
    final proposals = process['proposals'];
    if (proposals == null || proposals.isEmpty) {
      return '/process/${process['_id']}/results';
    }
    return '/process/${process['_id']}/voting';
  } else if (currentTime.isAfter(votingEndTime)) {
    return '/process/${process['_id']}/results';
  } else {
    return '/process/${process['_id']}';
  }
}
