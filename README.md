# DevOps Engineer Test

Purpose of this test is to deploy an application using couple of scenarios and technologies.

Usage of GIT is required. **Create a repository for this task, solution for each STEP should be in a separate branch in your repository**

### Considerations

- The documentation starting on the README.md file need to be clear
- We want to see not only the solution but also how you think and your working process, so please keep all your commits accessible and use proper naming standard for them
- All steps are required so do not skip any. If you don't know, or don't feel comfortable in required technology, just try your best and commit what you can

### Application

You can find application that we will be handling in `/app` catalog. 

### Before we start

1. Choose git repository hosting service (Bitbucket / Gitlab / Github) and push our Application there 
2. Choose cloud provider of Your liking, but please keep in mind that we use AWS and GCP here

### STEP 1 

Deploy application as serverless function (aws lambda, gcp function)

Create a CI/CD pipeline that will be deploying our application to chosed cloud. We should have 3 instances of our app: develop, staging and production

Consider using terragrunt / terraform to create and maintain infrastructure in the cloud
Consider removing secrets / confng hardcoded in the application and propose a way to handle them properly

### STEP 2

Deploy application as a server (ec2, compute engine)

Create a CI/CD pipeline that will be deploying our application to chosed cloud. We should have 3 instances of our app: develop, staging and production

Consider using terragrunt / terraform to create and maintain infrastructure in the cloud
Consider removing secrets / confng hardcoded in the application and propose a way to handle them properly
Consider setuping of scaling of the application

### STEP 3

Deploy application as a kubernetes

Create a CI/CD pipeline that will be deploying our application to chosed cloud. We should have 3 instances of our app: develop, staging and production

Consider using terragrunt / terraform to create and maintain infrastructure in the cloud
Consider removing secrets / confng hardcoded in the application and propose a way to handle them properly
Consider setuping of scaling of the application
Consider using templating system do manage k8s, for example HELM

### STEP 4

Logs and monitoring

Make sure application logs are available and that a proper monitoring and alerting is in place.
Make sure we will be able to distinguish cost of all services.
Consider using budget alerting and monitoring.

### Wrapping up

In the README file, we should be able to find all the information necessary to run the project and the different challenges. Documentation is highly important for the resolution of this test.


### Delivery

We will need access to Your repository and to the cloud provider.
If they are private please share it with daniel.rosiak@chalhoub.com

