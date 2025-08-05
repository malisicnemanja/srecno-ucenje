#!/bin/bash
# Screenshot capture script using Chrome headless mode

SCREENSHOT_DIR="screenshots-backup"
mkdir -p "$SCREENSHOT_DIR"

# URLs to capture
urls=(
  "http://localhost:3000/3d-ucionica"
  "http://localhost:3000/blog/example"
  "http://localhost:3000/blog"
  "http://localhost:3000/faq"
  "http://localhost:3000/franchise-models"
  "http://localhost:3000/fransiza-modeli"
  "http://localhost:3000/iskustva/example"
  "http://localhost:3000/iskustva"
  "http://localhost:3000/kako-se-pridruziti"
  "http://localhost:3000/kalkulatori"
  "http://localhost:3000/knjige/example"
  "http://localhost:3000/knjige"
  "http://localhost:3000/kontakt"
  "http://localhost:3000/kvizovi"
  "http://localhost:3000/legal/privatnost"
  "http://localhost:3000/legal/uslovi-koriscenja"
  "http://localhost:3000/lokacije"
  "http://localhost:3000/methodology"
  "http://localhost:3000/metodologija"
  "http://localhost:3000/o-autorki"
  "http://localhost:3000/obuka-mentorstvo"
  "http://localhost:3000"
  "http://localhost:3000/resursi"
  "http://localhost:3000/ucionica"
  "http://localhost:3000/uspeh"
  "http://localhost:3000/zakazivanje"
)

# Check if Chrome is available
if command -v google-chrome &> /dev/null; then
  CHROME_CMD="google-chrome"
elif command -v chromium &> /dev/null; then
  CHROME_CMD="chromium"
else
  echo "Chrome/Chromium not found. Please install Chrome or use the manual method."
  exit 1
fi

echo "📸 Starting screenshot capture with $CHROME_CMD..."

# Capture each URL
for i in "${!urls[@]}"; do
  url="${urls[$i]}"
  filename="$SCREENSHOT_DIR/page-$i.png"
  
  echo "Capturing: $url"
  $CHROME_CMD --headless --disable-gpu --window-size=1920,1080 --screenshot="$filename" "$url"
  
  if [ $? -eq 0 ]; then
    echo "✅ Saved: $filename"
  else
    echo "❌ Failed: $url"
  fi
done

echo "✅ Screenshot capture complete!"
