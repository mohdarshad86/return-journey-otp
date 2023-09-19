This is Backend for mobile Registration System.

To register user needs to validate his phone nember through OTP.

To run this backend as on your local development environment, follow these steps:

Clone the repository: To clone the repository run below command in the terminal

```bash 
git clone https://github.com/mohdarshad86/return-journey-otp.git
```

Install dependencies: npm install. It will install all the necessary dependencies

Configure environment variables by creating a .env file and adding the required configuration.

Start the server: run command npm start The server will be running on http://localhost:3000 by default.

## API Endpoints
The backend server provides the following API endpoints:

### User Registraion

- POST /register: Register a new user.

Postman Request should look like this: 
{
  "phoneNumber":"9123456789"
}

### Success Scenario
{
  "status": "true",
  "message": "OTP Sent Successfully"
}


### OTP Verification

- POST /verifyOTP:

Postman Request should look like this: 
{
  "otp":"123456" //Enter the 6 digit otp
}

### Success Scenario
{
  "status": "true",
  "message": "OTP Verification Successfully"
}