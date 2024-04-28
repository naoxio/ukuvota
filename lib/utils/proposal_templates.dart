/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
