import 'package:go_router/go_router.dart';
import 'package:ukuvota/screens/home_screen.dart';
import 'package:ukuvota/screens/create_process_screen.dart';
import 'package:ukuvota/screens/dashboard_screen.dart';

final GoRouter router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/create',
      builder: (context, state) => const CreateProcessScreen(),
    ),
    GoRoute(
      path: '/dashboard',
      builder: (context, state) => const DashboardScreen(),
    ),
  ],
);
