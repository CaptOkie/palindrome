FROM maven:3-openjdk-11

RUN mkdir -p /tmp/build/src
COPY ./src/ /tmp/build/src/
COPY ./pom.xml /tmp/build
RUN mkdir /opt/palindrome \
  && mvn clean package -f /tmp/build/pom.xml \
  && cp /tmp/build/target/palindrome-2.0.0.jar /opt/palindrome/ \
  && rm -rf /tmp/build/
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/opt/palindrome/palindrome-2.0.0.jar" ]