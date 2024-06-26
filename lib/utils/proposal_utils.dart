/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:ukuvota/models/proposal.dart';

import 'dart:convert';
import 'package:vsc_quill_delta_to_html/vsc_quill_delta_to_html.dart';

bool isProposalEmpty(Proposal proposal) {
  return proposal.title.trim().isEmpty && proposal.description.trim().isEmpty;
}

String truncateString(String title, int maxLength, [bool dotdot = true]) {
  if (title.length <= maxLength) {
    return title;
  } else {
    return '${title.substring(0, maxLength)}${dotdot ? '...' : ''}';
  }
}

String convertToHtml(String description) {
  if (description.isNotEmpty) {
    try {
      final deltaOps = jsonDecode(description);
      if (deltaOps is List<dynamic>) {
        final converter = QuillDeltaToHtmlConverter(
          deltaOps.cast<Map<String, dynamic>>(),
          ConverterOptions.forEmail(),
        );
        return converter.convert();
      }
    } catch (e) {}
  }
  return '';
}
