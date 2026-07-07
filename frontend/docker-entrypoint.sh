#!/bin/sh
set -eu

api_base_url="${VITE_API_BASE_URL:-http://localhost:8000}"
port="${PORT:-10000}"
escaped_api_base_url=$(printf '%s' "$api_base_url" | sed 's/\\/\\\\/g; s/"/\\"/g')

cat > /usr/share/nginx/html/env.js <<EOF
window.__APP_CONFIG__ = {
  API_BASE_URL: "$escaped_api_base_url"
};
EOF

cat > /etc/nginx/conf.d/default.conf <<EOF
server {
  listen ${port};
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files \$uri \$uri/ /index.html;
  }
}
EOF

exec nginx -g "daemon off;"
