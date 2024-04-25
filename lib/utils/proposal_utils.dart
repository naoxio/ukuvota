import 'package:ukuvota/models/proposal.dart';

bool isProposalEmpty(Proposal proposal) {
  return proposal.title.trim().isEmpty && proposal.description.trim().isEmpty;
}

String truncateDescription(String description, int maxLength) {
  if (description.length <= maxLength) {
    return description;
  } else {
    return '${description.substring(0, maxLength)}...';
  }
}

String truncateString(String title, int maxLength, [bool dotdot = true]) {
  if (title.length <= maxLength) {
    return title;
  } else {
    return '${title.substring(0, maxLength)}${dotdot ? '...' : ''}';
  }
}
