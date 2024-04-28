// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'package:ukuvota/models/process.dart';

String getProcessUrl(Process process) {
  final currentTime = DateTime.now();
  final proposalStartTime =
      DateTime.fromMillisecondsSinceEpoch(process.proposalDates![0]);
  final proposalEndTime =
      DateTime.fromMillisecondsSinceEpoch(process.proposalDates![1]);
  final votingStartTime =
      DateTime.fromMillisecondsSinceEpoch(process.votingDates[0]);
  final votingEndTime =
      DateTime.fromMillisecondsSinceEpoch(process.votingDates[1]);

  if (currentTime.isAfter(proposalStartTime) &&
      currentTime.isBefore(proposalEndTime)) {
    return '/process/${process.id}/proposals';
  } else if (currentTime.isAfter(votingStartTime) &&
      currentTime.isBefore(votingEndTime)) {
    final proposals = process.proposals;
    if (proposals == null || proposals.isEmpty) {
      return '/process/${process.id}/results';
    }
    return '/process/${process.id}/voting';
  } else if (currentTime.isAfter(votingEndTime)) {
    return '/process/${process.id}/results';
  } else {
    return '/process/${process.id}';
  }
}
