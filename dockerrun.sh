./gradlew prepareDocker
docker build --tag="gsword/nov242020:0.1" build/docker/
docker run -p 8080:8080 gsword/nov242020:0.1

#docker container list
#docker container stop 3e05a87fdf2a
docker cp ~/Downloads/crosswire/expanded/ 49f66cc2af55:/app

#explore file system
docker container list 
docker ps -a
# find the container id
docker export -o hello.tar 55c21772f0dd
tar -tvf hello.tar

