#!/bin/bash

# Script to reorder Storybook story files alphabetically

# Create array of component names and their paths
declare -a components

# Find all story files and extract component names
while IFS= read -r file; do
    # Extract component name from path
    component_name=$(echo "$file" | sed -E 's/.*\/components\/([^\/]+)\/.*/\1/')
    # Skip CardComponents subdirectories
    if [[ "$file" == *"/CardComponents/"* ]]; then
        # Get the full path after CardComponents
        component_name="CardComponents/$(echo "$file" | sed -E 's/.*\/CardComponents\/([^\/]+)\/.*/\1/')"
    fi
    components+=("$component_name|$file")
done < <(find /Users/amiralles/Documents/GitHub/ODL/src/components -name "*.stories.tsx" | sort)

# Sort components alphabetically
IFS=$'\n' sorted=($(sort <<<"${components[*]}"))
unset IFS

# Rename files with new numbers
counter=1
for item in "${sorted[@]}"; do
    component_name="${item%%|*}"
    file_path="${item##*|}"
    
    # Format counter with leading zero if needed
    if [ $counter -lt 10 ]; then
        new_number="0${counter}"
    else
        new_number="${counter}"
    fi
    
    # Extract directory and old filename
    dir_path=$(dirname "$file_path")
    old_filename=$(basename "$file_path")
    
    # Create new filename
    new_filename="${new_number}-$(echo "$old_filename" | sed -E 's/^[0-9]+-//')"
    
    # Only rename if different
    if [ "$old_filename" != "$new_filename" ]; then
        echo "Renaming: $old_filename -> $new_filename"
        mv "$file_path" "$dir_path/$new_filename"
    fi
    
    counter=$((counter + 1))
done

echo "Reordering complete!"