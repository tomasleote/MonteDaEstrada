#!/usr/bin/env python3

import os
import re
import glob

print("Starting SCSS migration to modern @use syntax...\n")

# Find all .module.scss files
pattern = os.path.join(os.path.dirname(__file__), '../monte-da-estrada/src/**/*.module.scss')
scss_files = glob.glob(pattern, recursive=True)

print(f"Found {len(scss_files)} SCSS module files\n")

migrated_count = 0

for file_path in scss_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Skip if already migrated
    if "@use '@/styles' as *;" in content:
        print(f"-  Skipped (already migrated): {os.path.basename(file_path)}")
        continue

    # Check if file has old imports
    if "@import '@/styles/variables';" in content or "@import '@/styles/mixins';" in content:
        # Remove both old import lines
        content = re.sub(r"@import\s+['\"]@/styles/variables['\"];\s*\n?", '', content)
        content = re.sub(r"@import\s+['\"]@/styles/mixins['\"];\s*\n?", '', content)

        # Find the position to insert @use (after comments)
        lines = content.split('\n')
        insert_index = 0

        # Find end of comment block
        in_comment = False
        for i, line in enumerate(lines):
            stripped = line.strip()
            if stripped.startswith('//') or stripped.startswith('/*'):
                insert_index = i + 1
            elif stripped == '' and insert_index > 0:
                insert_index = i + 1
            elif stripped != '' and not stripped.startswith('//'):
                break

        # Insert @use statement
        lines.insert(insert_index, "@use '@/styles' as *;")
        if insert_index < len(lines) - 1 and lines[insert_index + 1].strip() != '':
            lines.insert(insert_index + 1, '')

        content = '\n'.join(lines)

        # Clean up multiple blank lines
        content = re.sub(r'\n\n\n+', '\n\n', content)

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        migrated_count += 1
        print(f"+ Migrated: {os.path.basename(file_path)}")

print(f"\n* Migration complete! Updated {migrated_count} files.")
print("\n- Next steps:")
print("1. Run: cd monte-da-estrada && npm run dev")
print("2. Verify no SCSS errors in console")
