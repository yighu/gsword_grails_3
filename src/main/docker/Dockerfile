FROM openjdk:8u151-jdk-alpine
MAINTAINER Yiguang Hu "yighu@yahoo.com"

EXPOSE 8080

WORKDIR /app
COPY *.jar application.jar
RUN echo $HOME
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/application.jar"]
