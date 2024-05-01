import re
import os

# Read the changelog file line by line
changelog_file = "CHANGELOG.md"
output_dir = "metadata/en-US/changelogs"
os.makedirs(output_dir, exist_ok=True)

version_number = 0
inside_version = False
output = []

with open(changelog_file, "r") as f:
    lines = f.readlines()

for line in lines:
    match = re.match(r'^##\s\[(.*)\]\s-\s(.*)$', line)
    if match:
        if inside_version:
            version_number += 1
            with open(os.path.join(output_dir, f"{version_number}.txt"), "w") as outfile:
                outfile.write("\n".join(output))
            output = []
        inside_version = True
        version, date = match.groups()
    elif inside_version:
        if line.startswith("- "):
            list_item = line[2:].strip()
            output.append(f"* {list_item}")

if output:
    version_number += 1
    with open(os.path.join(output_dir, f"{version_number}.txt"), "w") as outfile:
        outfile.write("\n".join(output))

latest_version = None
for line in lines:
    match = re.match(r'^##\s\[(.*)\]\s-\s(.*)$', line)
    if match:
        latest_version = match.group(1)
        break

if latest_version is None:
    print("No version found in the changelog file")
else:
    # Update version in pubspec.yaml
    pubspec_file = "pubspec.yaml"
    if os.path.exists(pubspec_file):
        with open(pubspec_file, "r") as f:
            content = f.read()
        content = re.sub(r'^(version:).*$', fr'\1 {latest_version}+{version_number}', content, flags=re.MULTILINE)
        with open(pubspec_file, "w") as f:
            f.write(content)
        print(f"Updated version in {pubspec_file} to {latest_version}+{version_number}")
    else:
        print(f"{pubspec_file} does not exist")