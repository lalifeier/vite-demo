#!/usr/bin/env bash

docker run -d --privileged=true --restart=always -it -p 80:80 --name admin-pro lalifeier/admin-pro

# docker-compose up web
