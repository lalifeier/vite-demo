#!/usr/bin/env bash

docker run -d --privileged=true --restart=always -it -p 80:80 --name vite-demo lalifeier/vite-demo

# docker-compose up web