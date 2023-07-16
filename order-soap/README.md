# SOAP-OrderingSystem
CS 453/553 Project 2 Summer 2023 - Mad Mike’s Mechanic Shop Expands

Problem Statement**
**Mad Mike is so thrilled with your REST based system for his auto shop, he is looking for new ways to use technology to help his business. He has talked with his parts supplier and they have an online ordering system.
Problem is, their ordering system is not REST based, it’s SOAP/WSDL based. So Mike has once again come to you to help integrate his existing auto inventory system with the parts company’s ordering system.

**Requirements**:
Build a SOAP/WSDL server that takes a part number and returns a price and a delivery date (you can hardcode them or create random numbers).
○ This includes the code and the WSDL file
○ This server should run in a separate docker container from the REST server but it
can be in the same docker-compose file. (see my example at the bottom)
● Add a new endpoint to the REST server that uses a SOAP client that calls the Supplier SOAP Server with a part number and returns the price and delivery date to your client/postman/curl command.
● The web service should be stateless and RESTful (I would recommend using node/express but you do you as long as it runs automatically in the docker container
● You do need to show examples of calling the server using Curl, Wget, Postman, HTTP request, etc...