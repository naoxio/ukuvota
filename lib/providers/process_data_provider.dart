// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

import 'package:flutter/foundation.dart';
import 'package:ukuvota/models/process.dart';
import 'package:ukuvota/services/process_data_service.dart';

class ProcessDataProvider with ChangeNotifier {
  final ProcessDataService _processDataService = ProcessDataService();
  Process? _processData;

  Process? get processData => _processData;

  Future<Process?> fetchProcessData(String processId) async {
    _processData = await _processDataService.fetchProcessData(processId);
    notifyListeners();
    return _processData;
  }
}
