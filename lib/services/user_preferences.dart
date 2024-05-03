import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UserPreferences {
  static const String _localeKey = 'locale';
  static const String _themeModeKey = 'themeMode';

  static late SharedPreferences _preferences;

  static Future<void> initialize() async {
    _preferences = await SharedPreferences.getInstance();
  }

  static Future<void> setLocale(Locale locale) async {
    await _preferences.setString(_localeKey, locale.languageCode);
  }

  static Locale getLocale() {
    final languageCode = _preferences.getString(_localeKey);
    return languageCode != null ? Locale(languageCode) : const Locale('en');
  }

  static Future<void> setThemeMode(ThemeMode themeMode) async {
    await _preferences.setString(_themeModeKey, themeMode.name);
  }

  static ThemeMode getThemeMode() {
    final themeModeString = _preferences.getString(_themeModeKey);
    return ThemeMode.values.firstWhere(
      (mode) => mode.name == themeModeString,
      orElse: () => ThemeMode.system,
    );
  }
}
