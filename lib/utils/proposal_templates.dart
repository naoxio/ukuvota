import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:ukuvota/models/proposal.dart';

List<Proposal> exampleProposals(AppLocalizations localizations) {
  return [
    Proposal(
      id: '1',
      title: localizations.proposalZeroTitle,
      description: '${localizations.proposalZeroDescription}\n',
    ),
    Proposal(
      id: '2',
      title: localizations.proposalOneTitle,
      description: '${localizations.proposalOneDescription}\n',
    ),
  ];
}
