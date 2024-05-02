# Ukuvota
Quick tool for collaborative score voting to find consensus in a group.

## Features

- **Weighted Score Voting:** Empowering voters to express their preferences with precision, allowing negative votes to carry more weight than positive ones.
- **Effortless Sharing:** Seamlessly share voting links with anyone, enabling widespread participation and engagement.
- **Consensus-Driven Approach:** Collect diverse proposals from participants, fostering a collaborative decision-making process.
- **User-Friendly Interface:** Intuitive and easy-to-navigate platform, ensuring easy accessibility on all devices.
- **Transparent Results:** After the voting phase ends, all votes are transparently displayed, promoting trust in the process.

## Building the Application

### Prerequisites

- Ensure you have Flutter installed on your system. You can download it from [Flutter's official website](https://flutter.dev).
- A compatible device or emulator to run the app.


### Firebase Setup

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the instructions to create a new Firebase project.

2. **Add Firebase to Your App:**
   - In the Firebase console, add a new application and select Flutter as the platform.
   - Follow the setup steps provided by Firebase to download the `google-services.json` for Android or `GoogleService-Info.plist` for iOS.
   - Place the downloaded file in your project's respective directories (`android/app/` for Android and `ios/Runner/` for iOS).

3. **Generate Firebase Options File Using FlutterFire CLI:**
   - Install FlutterFire CLI by running:
     ### bash
     dart pub global activate flutterfire_cli
     ###
   - Configure your Firebase project with Flutter by running:
     ### bash
     flutterfire configure
     ###
   - This command will generate a `firebase_options.dart` file which contains all the configuration for the Firebase project. Make sure this file is correctly imported in your `main.dart`.


### Steps to Build

1. **Clone the Repository:**
```bash
git clone https://github.com/naoxio/ukuvota.git
cd ukuvota
```

2. **Get Dependencies:**
```bash
flutter pub get
```

3. **Run the App:**
```bash
flutter run
```
- Use the `-d` flag to specify a device if multiple devices or emulators are connected:
```bash
flutter run -d <device_id>
```

4. **Build for Production:**
- To generate a release build, use:
```bash
 flutter build apk --release
 ```
- For iOS, use:
 ```bash
 flutter build ios --release
 ```

## Contributing

Contributions to the project are welcome! Please refer to the project's issues page for areas where you can help.

## License

This project is licensed under the MPL2.0 License - see the [LICENSE.md](LICENSE.md) file for details.

