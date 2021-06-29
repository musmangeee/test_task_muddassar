#!/bin/bash

echo "Project Deploy start."
livePath=/var/www/html/nbthub.com/public_html/awais/restaurants-management
gitPath=/var/www/html/nbthub.com/public_html/awais/restaurants-management
frontendPath=/var/www/html/nbthub.com/public_html/awais/restaurants-management/dist
# backendPath=/var/www/html/nbthub.com/public_html/awais/restaurants-management/backend

cd ${gitPath}/ && sudo git stash;
cd ${gitPath}/ && sudo git clean -fx;
cd ${gitPath}/ && sudo git add --all;
cd ${gitPath}/ && sudo git reset --hard HEAD;
cd ${gitPath}/ && sudo git pull;

cd ${gitPath}/ && sudo yarn clean-build-nbthub;
# mQibfCyuxgPSCKsD7F9n



# echo "Restarting Pm2 Job start."
cd ${gitPath}/ && pm2 delete restaurants-management;
cd ${gitPath}/ && pm2 start;
# echo "Restarting Pm2 Job end."


# echo "Deleting files and folders start."
# rm ${livePath}/_nuxt -R
# rm ${livePath}/src -R
# rm ${livePath}/index.html
# echo "Deleting files and folders done."


# echo "Copping New Build files and folders start."
# 'cp' ${frontendPath}/* ${livePath}/ -rfv;
# 'cp' ${frontendPath}/.htaccess ${livePath}/.htaccess -rfv;
# echo "Copping New Build files and folders end."


# echo "Copying .env start"
# 'cp' ${gitPath}/.env.server ${frontendPath}/.env -rfv;
# echo "Copying .env done"

# cd ${backendPath}/ && php artisan optimize:clear;

chmod 0777 . -R

echo "Project Deploy done."

# cd /var/www/html/nbthub.com/public_html/awais/restaurants-management/
# sudo bash deploy.sh
