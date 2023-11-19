# PDF Editing Web Application

Welcome to the Zyle Application documentation. 

# visit the live website:
[Visit Zyle](https://zyle.vercel.app/)

# Backend Link:
[zyle_backend](https://github.com/SARATHKUMAR-T/zyle_backend)

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Authentication](#authentication)
5. [File Upload and Storage](#file-upload-and-storage)
6. [Database Structure](#database-structure)
7. [Newgen CRM](#newgen-crm)
8. [Deployment](#deployment)
9. [Backend](#backend)

  


## Features<a name="features"></a>

- you can add leads with necessasary details
- you can change the status of the client as you want
- mail option with upload is available
- unwanted leads can be removed
  


## Technologies Used<a name="technologies-used"></a>

- Front-End: Next.js, Tailwind CSS, Shadcn UI libraries.
- Back-End: Node.js, Express, MongoDB.
- Authentication: JWT tokens.
- File Upload: Uploadthing.
- Database: MongoDB.

## Getting Started<a name="getting-started"></a>

### Prerequisites<a name="prerequisites"></a>

- Node.js and npm (Node Package Manager).
- MongoDB installed and running.
- add .env.local file and add env variables for uploadthing.
- you can get your Uploadthing Id and Secret Key On their websites.

### Installation<a name="installation"></a>

1. Clone this repository.
2. Install dependencies: `npm install`.
3. Set environment variables.
4. Start the application: `npm run dev`.

## Authentication<a name="authentication"></a>

- Login with admin email and Password.


## File Upload and Storage<a name="file-upload-and-storage"></a>

- files are uploaded and securely stored in the cloud.
- Files are Stored using uploadthing.

## Database Structure<a name="database-structure"></a>

- MongoDB is used to store lead details .
- Two Routes are used one for admin and another one for LeadDetails.

## New gen CRM<a name="newgen-crm"></a>

-Landing page
![landing page img](https://i.imgur.com/VRPTslW.png)
- login with admin email and password
- After successful login admin can add leads.
  ![uploadForm](https://i.imgur.com/AnrXVLy.png)
- on successfull updation the leads willbe showed.
  ![homepage](https://i.imgur.com/sG3dBdS.png)
- admin can select file and delete by clicking the more options on the right top corner of the card.
  ![deleteOption](https://i.imgur.com/t6r5ulC.png)
- admin can change the status fo the lead instantly
  ![Imgur](https://i.imgur.com/Ff9ezEg.png)
- Onclick on the email will open the form to send mails to the respective clients.
  ![Imgur](https://i.imgur.com/pr8ng1N.png)
- With or Without the mail canbe send.
##IMPORTANT-only one files is allowed per mail and anyfile type canbe send maxsize of 64mb
  ![Imgur](https://i.imgur.com/pqFDxSy.png)

## Deployment<a name="deployment"></a>

- For deployment i used Vercel.

## Backend <a name="backend"></a>

-Express is used on the top of Nodejs.

[Backend github link](https://github.com/SARATHKUMAR-T/zyle_backend)



