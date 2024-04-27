import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:ukuvota/widgets/language_switcher.dart';
import 'package:ukuvota/widgets/search_delegate.dart';

class CustomAppBar extends StatefulWidget implements PreferredSizeWidget {
  const CustomAppBar({Key? key}) : super(key: key);

  @override
  CustomAppBarState createState() => CustomAppBarState();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class CustomAppBarState extends State<CustomAppBar> {
  @override
  Widget build(BuildContext context) {
    final isSmallScreen = MediaQuery.of(context).size.width < 600;

    return AppBar(
      automaticallyImplyLeading: false,
      leading: isSmallScreen
          ? IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
            )
          : IconButton(
              icon: const Icon(Icons.search),
              onPressed: () {
                showSearch(
                  context: context,
                  delegate: CustomSearchDelegate(),
                );
              },
            ),
      title: InkWell(
        onTap: () => context.go('/'),
        child: const Text(
          'Ukuvota',
          style: TextStyle(color: Colors.white),
        ),
      ),
      actions: [
        if (!isSmallScreen)
          const Row(
            children: [
              LanguageSwitcher(),
              SizedBox(width: 16),
            ],
          ),
      ],
    );
  }
}
