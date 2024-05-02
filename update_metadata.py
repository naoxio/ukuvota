import re
import os

# Read the changelog file line by line
changelog_file = "CHANGELOG.md"
output_dir = "metadata/en-US/changelogs"
os.makedirs(output_dir, exist_ok=True)

version_number = 0
inside_version = False
output = []
versions = []

with open(changelog_file, "r") as f:
    lines = f.readlines()
    for line in lines:
        match = re.match(r'^##\s\[(.*)\]\s-\s(.*)$', line)
        if match:
            if inside_version:
                versions.append((version, date, output))
                output = []
            inside_version = True
            version, date = match.groups()
        elif inside_version:
            if line.startswith("- "):
                list_item = line[2:].strip()
                output.append(f"* {list_item}")

    if output:
        versions.append((version, date, output))

versions.reverse()

for i, (version, date, output) in enumerate(versions, start=1):
    with open(os.path.join(output_dir, f"{i}.txt"), "w") as outfile:
        outfile.write("\n".join(output))

latest_version = versions[0][0] if versions else None

if latest_version is None:
    print("No version found in the changelog file")
else:
    # Update version in pubspec.yaml
    pubspec_file = "pubspec.yaml"
    if os.path.exists(pubspec_file):
        with open(pubspec_file, "r") as f:
            content = f.read()
        content = re.sub(r'^(version:).*$', fr'\1 {latest_version}+{len(versions)}', content, flags=re.MULTILINE)
        with open(pubspec_file, "w") as f:
            f.write(content)
        print(f"Updated version in {pubspec_file} to {latest_version}+{len(versions)}")
    else:
        print(f"{pubspec_file} does not exist")