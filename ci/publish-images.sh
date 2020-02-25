#!/usr/bin/env bash

# ./publishImage.sh VERSION TAG

if [[ $2 = "release" ]]; then
    docker tag api-mgmt/devportal:$1 gitlab.scheer-group.com:8080/api-mgmt/devportal:$1
    docker push gitlab.scheer-group.com:8080/api-mgmt/devportal:$1
    docker image rm -f gitlab.scheer-group.com:8080/api-mgmt/devportal:$1
else
    docker tag api-mgmt/devportal:$1 gitlab.scheer-group.com:8080/api-mgmt/devportal:$2
    docker push gitlab.scheer-group.com:8080/api-mgmt/devportal:$2
fi
