#!/bin/sh

# replace all occurences of placeholders with environment variables
# see https://blog.codecentric.de/en/2019/03/docker-angular-dockerize-app-easily/

for mainFileName in /usr/share/nginx/html/main*.js
do
  envsubst "\$KEYCLOAK_REALM \$API_MGMT_UI_REST_URL \$KEYCLOAK_AUTH_URL"  < "$mainFileName" > main.tmp
  mv main.tmp "${mainFileName}"
done

# Check if a prefix is set
if [ -z "$SYSTEM_PREFIX" ]
then
      # If no prefix start nginx
      nginx -g 'daemon off;'
else
      # If a prefix is set we will replace the base path in index.html before starting tomcat
      # Replace '/' with e.g. '/pas/devportal/'
      sed -i "s/'\/'/'\/$SYSTEM_PREFIX\/devportal\/'/g" "/usr/share/nginx/html/index.html"
      nginx -g 'daemon off;'
fi
