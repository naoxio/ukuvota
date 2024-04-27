import 'package:go_router/go_router.dart';
import 'package:ukuvota/screens/create_process/review_screen.dart';
import 'package:ukuvota/screens/home/home_screen.dart';
import 'package:ukuvota/screens/create_process/create_process_screen.dart';
import 'package:ukuvota/screens/create_process/voting_only_screen.dart';
import 'package:ukuvota/screens/create_process/proposal_voting_screen.dart';
import 'package:ukuvota/screens/dashboard/dashboard_screen.dart';
import 'package:ukuvota/screens/settings/settings_screen.dart';
import 'package:ukuvota/screens/process/process_screen.dart';
import 'package:ukuvota/screens/process/proposals_screen.dart';
import 'package:ukuvota/screens/process/voting_screen.dart';
import 'package:ukuvota/screens/process/results_screen.dart';

final GoRouter router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/create',
      builder: (context, state) => const CreateProcessScreen(),
      routes: [
        GoRoute(
          path: 'voting-only',
          builder: (context, state) => const VotingOnlyScreen(),
        ),
        GoRoute(
          path: 'proposal-voting',
          builder: (context, state) => const ProposalVotingScreen(),
        ),
        GoRoute(
          path: 'review',
          builder: (context, state) => const ReviewScreen(),
        ),
      ],
    ),
    GoRoute(
      path: '/dashboard',
      builder: (context, state) => const DashboardScreen(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const SettingsScreen(),
    ),
    GoRoute(
      path: '/process/:processId',
      builder: (context, state) {
        final processId = state.pathParameters['processId'];
        if (processId == null) {
          return const HomeScreen(); // Redirect to home if processId is not provided
        }
        return ProcessScreen(processId: processId);
      },
      routes: [
        GoRoute(
          path: 'proposals',
          builder: (context, state) {
            final processId = state.pathParameters['processId'];
            if (processId == null) {
              return const HomeScreen(); // Redirect to home if processId is not provided
            }
            return ProposalsScreen(processId: processId);
          },
        ),
        GoRoute(
          path: 'voting',
          builder: (context, state) {
            final processId = state.pathParameters['processId'];
            if (processId == null) {
              return const HomeScreen(); // Redirect to home if processId is not provided
            }
            return VotingScreen(processId: processId);
          },
        ),
        GoRoute(
          path: 'results',
          builder: (context, state) {
            final processId = state.pathParameters['processId'];
            if (processId == null) {
              return const HomeScreen(); // Redirect to home if processId is not provided
            }
            return ResultsScreen(processId: processId);
          },
        ),
      ],
    ),
  ],
);
