import 'package:flutter/foundation.dart';
import 'package:ukuvota/services/process_data_service.dart';

class ProcessDataProvider with ChangeNotifier {
  final ProcessDataService _processDataService = ProcessDataService();
  Map<String, dynamic>? _processData;

  Map<String, dynamic>? get processData => _processData;

  Future<Map<String, dynamic>?> fetchProcessData(String processId) async {
    _processData = await _processDataService.fetchProcessData(processId);
    notifyListeners();
    return _processData;
  }
}
