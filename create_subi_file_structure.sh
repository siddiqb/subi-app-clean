# Get the directory structure of subi-app-clean, excluding certain folders
tree -I '.git|.next|node_modules|public|dist|build' > subi_app_clean_structure.txt

# Create a combined file structure overview and critical file content
(
  cat subi_app_clean_structure.txt
  echo -e "\n\n====== CONTENT OF CRITICAL FILES ======\n"

  # next.config.js
  echo -e "\nFile: next.config.js\n"
  cat next.config.js

  # scrapingbee-client.ts
  echo -e "\n\nFile: src/lib/scrapingbee-client.ts\n"
  cat src/lib/scrapingbee-client.ts

  # supabase.ts
  echo -e "\n\nFile: src/lib/supabase.ts\n"
  cat src/lib/supabase.ts

  # BusinessDataForm.tsx
  echo -e "\n\nFile: src/components/BusinessDataForm.tsx\n"
  cat src/components/BusinessDataForm.tsx

  # UrlInput.tsx
  echo -e "\n\nFile: src/components/UrlInput.tsx\n"
  cat src/components/UrlInput.tsx

  # Optional files for more context

  # dashboard/page.tsx
  echo -e "\n\nFile: src/app/dashboard/page.tsx\n"
  cat src/app/dashboard/page.tsx

  # login/page.tsx
  echo -e "\n\nFile: src/app/login/page.tsx\n"
  cat src/app/login/page.tsx

  # register/page.tsx
  echo -e "\n\nFile: src/app/register/page.tsx\n"
  cat src/app/register/page.tsx

  # utils.ts
  echo -e "\n\nFile: src/lib/utils.ts\n"
  cat src/lib/utils.ts

) > combined_subi_app_clean.txt

