FROM openjdk:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ./target/fullstack-backend-0.0.1-SNAPSHOT.jar.original app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
