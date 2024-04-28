/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:ukuvota/providers/process_data_provider.dart';
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
          return const HomeScreen();
        }
        final processDataProvider =
            Provider.of<ProcessDataProvider>(context, listen: false);
        final process = processDataProvider.processData;
        if (process == null) {
          return const HomeScreen();
        }
        return ProcessScreen(process: process);
      },
      redirect: (context, state) async {
        final processId = state.pathParameters['processId'];
        if (processId == null) {
          return '/';
        }
        final processDataProvider =
            Provider.of<ProcessDataProvider>(context, listen: false);
        final process = await processDataProvider.fetchProcessData(processId);
        if (process == null) {
          return '/';
        }
        final currentTime = DateTime.now();
        final proposalStartTime =
            DateTime.fromMillisecondsSinceEpoch(process.proposalDates![0]);
        final proposalEndTime =
            DateTime.fromMillisecondsSinceEpoch(process.proposalDates![1]);
        final votingStartTime =
            DateTime.fromMillisecondsSinceEpoch(process.votingDates[0]);
        final votingEndTime =
            DateTime.fromMillisecondsSinceEpoch(process.votingDates[1]);
        if (currentTime.isAfter(proposalStartTime) &&
            currentTime.isBefore(proposalEndTime)) {
          return '/process/$processId/proposals';
        } else if (currentTime.isAfter(votingStartTime) &&
            currentTime.isBefore(votingEndTime)) {
          final proposals = process.proposals;
          if (proposals == null || proposals.isEmpty) {
            return '/process/$processId/results';
          }
          return '/process/$processId/voting';
        } else if (currentTime.isAfter(votingEndTime)) {
          return '/process/$processId/results';
        }
        return null;
      },
      routes: [
        GoRoute(
          path: 'proposals',
          builder: (context, state) {
            final processDataProvider =
                Provider.of<ProcessDataProvider>(context, listen: false);
            final process = processDataProvider.processData;
            if (process == null) {
              return const HomeScreen();
            }
            return ProposalsScreen(process: process);
          },
        ),
        GoRoute(
          path: 'voting',
          builder: (context, state) {
            final processDataProvider =
                Provider.of<ProcessDataProvider>(context, listen: false);
            final process = processDataProvider.processData;
            if (process == null) {
              return const HomeScreen();
            }
            return VotingScreen(process: process);
          },
        ),
        GoRoute(
          path: 'results',
          builder: (context, state) {
            final processDataProvider =
                Provider.of<ProcessDataProvider>(context, listen: false);
            final process = processDataProvider.processData;
            if (process == null) {
              return const HomeScreen();
            }
            return ResultsScreen(process: process);
          },
        ),
      ],
    ),
  ],
);
