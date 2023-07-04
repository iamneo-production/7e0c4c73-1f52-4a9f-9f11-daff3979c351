#!/bin/bash
if [ -d "/home/coder/project/workspace/springapp/" ]
then
    echo "project folder present"
    # checking for src folder
    if [ -d "/home/coder/project/workspace/springapp/src/" ]
    then
        cp -r /home/coder/project/workspace/junit/test /home/coder/project/workspace/springapp/src/;
    cd /home/coder/project/workspace/springapp/ || exit;
    mvn clean test;
    else
        echo "testGetMovieAll FAILED";
        echo "testGetMovieById FAILED";
        echo "testGetReviewAll FAILED";
        echo "testGetReviewById FAILED";
        echo "test_case1 FAILED";
   
    fi
else   
   
        echo "testGetMovieAll FAILED";
        echo "testGetMovieById FAILED";
        echo "testGetReviewAll FAILED";
        echo "testGetReviewById FAILED";
        echo "test_case1 FAILED";
fi