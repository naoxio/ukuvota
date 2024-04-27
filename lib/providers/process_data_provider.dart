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
