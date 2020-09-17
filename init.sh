#!/bin/bash
sudo gpasswd -a $USER docker
sudo dockerd
cd /home/ec2-user/majorproject-8-mon-17-30-6/BackEnd/agme
docker build . -t agme
docker run -p 8080:8080 agme