#!/bin/bash
file="./gorgory.jar"
if [ -f "$file" ]
then
	sudo java -jar ./gorgory.jar
else
	./deploy.sh
    sudo java -jar ./gorgory.jar
fi