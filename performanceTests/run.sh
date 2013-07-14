cd "$(dirname "$0")"

echo "Running performance suite in node..."
node benchMarks.js

for cmd in rhino "rhino -require" narwhal ringo phantomjs; do
  echo ""
  echo "Running performance suite in $cmd..."
  $cmd benchMarks.js
done
