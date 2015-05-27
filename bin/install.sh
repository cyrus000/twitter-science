#!/bin/bash
wget -O ./liblinear_download.tar.gz http://www.csie.ntu.edu.tw/~cjlin/cgi-bin/liblinear.cgi?+http://www.csie.ntu.edu.tw/~cjlin/liblinear+tar+gz
mkdir ./liblinear_download
tar -xvf ./liblinear_download.tar.gz -C ./liblinear_download
cd ./liblinear_download/*/
make all
mv train ../../liblinear_train
cd ..
cd ..
rm -rf ./liblinear_download
rm liblinear_download.tar.gz
