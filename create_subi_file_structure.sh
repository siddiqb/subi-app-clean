# Get the directory structure of subi-app-clean, excluding certain folders
tree -I '.git|.next|node_modules|public|dist|build' > subi_app_clean_structure.txt

# Create a combined file structure overview and critical file content
(
  # Append the directory structure to the output file
  cat subi_app_clean_structure.txt
  echo -e "\n\n====== CONTENT OF CRITICAL FILES ======\n"

  # Files to be included, starting with next.config.js if present
  if [ -f next.config.js ]; then
    echo -e "\nFile: next.config.js\n"
    cat next.config.js
  else
    echo -e "\nFile: next.config.js not found\n"
  fi

  # src/pages/api/scrape.ts
  echo -e "\n\nFile: src/pages/api/scrape.ts\n"
  cat src/pages/api/scrape.ts

  # src/components/EnhancedDashboard.tsx
  echo -e "\n\nFile: src/components/EnhancedDashboard.tsx\n"
  cat src/components/EnhancedDashboard.tsx

  # src/components/UrlInput.tsx
  echo -e "\n\nFile: src/components/UrlInput.tsx\n"
  cat src/components/UrlInput.tsx

  # src/components/BusinessDataForm.tsx
  echo -e "\n\nFile: src/components/BusinessDataForm.tsx\n"
  cat src/components/BusinessDataForm.tsx

  # src/lib/scrapingbee-client.ts
  echo -e "\n\nFile: src/lib/scrapingbee-client.ts\n"
  cat src/lib/scrapingbee-client.ts

  # src/lib/scraping-utils.ts
  echo -e "\n\nFile: src/lib/scraping-utils.ts\n"
  cat src/lib/scraping-utils.ts

  # src/types/index.ts
  echo -e "\n\nFile: src/types/index.ts\n"
  cat src/types/index.ts

  # package.json
  echo -e "\n\nFile: package.json\n"
  cat package.json

  # .eslintrc.json
  echo -e "\n\nFile: .eslintrc.json\n"
  cat .eslintrc.json

  # Optional files for more context

  # src/app/dashboard/page.tsx
  if [ -f src/app/dashboard/page.tsx ]; then
    echo -e "\n\nFile: src/app/dashboard/page.tsx\n"
    cat src/app/dashboard/page.tsx
  else
    echo -e "\n\nFile: src/app/dashboard/page.tsx not found\n"
  fi

  # src/app/login/page.tsx
  if [ -f src/app/login/page.tsx ]; then
    echo -e "\n\nFile: src/app/login/page.tsx\n"
    cat src/app/login/page.tsx
  else
    echo -e "\n\nFile: src/app/login/page.tsx not found\n"
  fi

  # src/app/register/page.tsx
  if [ -f src/app/register/page.tsx ]; then
    echo -e "\n\nFile: src/app/register/page.tsx\n"
    cat src/app/register/page.tsx
  else
    echo -e "\n\nFile: src/app/register/page.tsx not found\n"
  fi

  # src/lib/utils.ts
  if [ -f src/lib/utils.ts ]; then
    echo -e "\n\nFile: src/lib/utils.ts\n"
    cat src/lib/utils.ts
  else
    echo -e "\n\nFile: src/lib/utils.ts not found\n"
  fi

) > combined_subi_app_clean.txt
