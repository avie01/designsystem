#!/bin/bash

# Script to reorder Storybook story files alphabetically

# Create temporary file to store component paths and names
temp_file="/tmp/storybook_components.txt"
> "$temp_file"

# Find all story files and extract component names
find /Users/amiralles/Documents/GitHub/ODL/src/components -name "*.stories.tsx" | while IFS= read -r file; do
    # Get the component path relative to components directory
    relative_path="${file#*/src/components/}"
    
    # Extract component name for sorting
    if [[ "$relative_path" == CardComponents/* ]]; then
        # For CardComponents, include the subdirectory in sorting
        component_name=$(echo "$relative_path" | sed 's/\/[0-9]*-.*\.stories\.tsx$//')
    else
        # For regular components, just get the component name
        component_name=$(echo "$relative_path" | sed 's/\/[0-9]*-.*\.stories\.tsx$//')
    fi
    
    echo "${component_name}|${file}" >> "$temp_file"
done

# Sort the components alphabetically
sort "$temp_file" -o "$temp_file"

# Now rename files with new sequential numbers
counter=1

while IFS='|' read -r component_name file_path; do
    # Format counter with leading zero
    printf -v new_number "%02d" $counter
    
    # Get directory and filename parts
    dir_path=$(dirname "$file_path")
    old_filename=$(basename "$file_path")
    
    # Extract the component name from filename (removing number prefix)
    base_name=$(echo "$old_filename" | sed -E 's/^[0-9]+-//')
    
    # Create new filename
    new_filename="${new_number}-${base_name}"
    
    # Rename if different
    if [ "$old_filename" != "$new_filename" ]; then
        echo "Renaming: ${component_name} -> ${new_number}"
        echo "  From: $old_filename"
        echo "  To:   $new_filename"
        mv "$file_path" "$dir_path/$new_filename"
    else
        echo "Keeping: ${component_name} -> ${new_number} (no change needed)"
    fi
    
    counter=$((counter + 1))
done < "$temp_file"

# Clean up
rm "$temp_file"

echo ""
echo "Reordering complete! Total components: $((counter - 1))"

# Also update the corresponding files in odl-design-system/content
echo ""
echo "Updating odl-design-system/content directory..."

find /Users/amiralles/Documents/GitHub/ODL/odl-design-system/content/src/components -name "*.stories.tsx" | while IFS= read -r content_file; do
    filename=$(basename "$content_file")
    component_dir=$(dirname "$content_file")
    
    # Find the corresponding file in src/components
    src_file=$(find /Users/amiralles/Documents/GitHub/ODL/src/components -name "*-${filename#*-}" | head -1)
    
    if [ -n "$src_file" ]; then
        new_filename=$(basename "$src_file")
        if [ "$filename" != "$new_filename" ]; then
            echo "Syncing: $filename -> $new_filename"
            mv "$content_file" "$component_dir/$new_filename"
        fi
    fi
done

echo "All directories synchronized!"