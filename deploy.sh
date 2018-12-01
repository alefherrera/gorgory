cd ./client && npm run build
cd ../api/src/src/main/resources/static && (rm -r || true )
cp -r ../../../../../../client/build/* ./
cd ../../../../../../api/src && (rm ./build/libs/*.jar || true) 
./gradlew bootJar
rm ../../gorgory.jar || true
cp ./build/libs/*.jar ../../gorgory.jar