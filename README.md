## **USER GRAPHQL SERVER**

**Version:** 1.0.0
**Date:** January 13, 2026

---

![GraphQL Logo](https://everyday.codes/wp-content/uploads/2019/12/og_image.png)


## Description

This is a beginner friendly backend application (typescript) to utilize graphql for data retrieval or modification and typeorm for mapping class to database table.

## Authors

- [@jadogeri](https://www.github.com/jadogeri)

## Acknowledgements

- Design and template inspired by [FreeCodeCamp / Net Ninja](https://www.youtube.com/watch?v=5199E50O7SI)


## Repository

- [source code ](https://github.com/jadogeri/User_GraphQL_Server.git)

## Screenshots

---

| ![Screenshot 1](assets/images/screenshot1.png) | ![Screenshot 1](assets/images/screenshot2.png) |
| -------------------------------------------- | -------------------------------------------- |
| ![Screenshot 1](assets/images/screenshot3.png) | ![Screenshot 1](assets/images/screenshot4.png) |

## Table of Contents

<ul>
      <li><a href="#1-introduction">1. Introduction</a>
        <ul>
          <li><a href="#11-purpose">1.1 Purpose</a> </li>
        </ul>
      </li>
    </ul>
     <ul>
      <li><a href="#2-installation">2. Installation</a>
      </li>
    </ul> 
     <ul>
      <li><a href="#3-installation">3. Technology stack</a>
      </li>
    </ul> 
    <ul>
        <li><a href="#4-usage">4. Usage</a>
        <ul>
            <li><a href="#41-run-application">4.1 Run Application</a> </li>
            <ul>
              <li><a href="#411-run-locally">4.1.1 Run Locally</a> </li>
              <li><a href="#412-run-docker-container">4.1.2 Run Docker Container</a> </li>
            </ul>
        </ul>
        </li>
    </ul> 
    <ul> 
        <li><a href="#5-references">5. References</a>
        </li>
    <ul>
</ul>

## **1. Introduction**

### **1.1 Purpose**

This document outlines the components, and design considerations for retrieving data using graphql from an express app.

Note: Mutations performed during session will not persist once server restarts. This app is for learning purpose.

## **2. Installation**

* [Download and install NodeJS](https://nodejs.org/en/download)

---

## **3. Technology Stack**

- **Programming Languages**: Typescript, GraphQL
- **IDE**: Visual Studio Code (VSCode)
- **Backend Frameworks**: Apollo Server
- **Database**: SQLite
- **Container**: Docker
- **Test**: JUnit 
- **Plugins**: Early AI
- **Version Control**: Git and GitHub
- **CI/CD**: GitHub Actions
- **Code Analsis**: SonarQube

---

## **4. Usage**

**Prerequisites** :installation of NodeJS.

### **4.1 Run Application**

1 Open command prompt or terminal.

2 Type command git clone https://github.com/jadogeri/User_GraphQL_Server.git then press enter.

```bash
  git clone https://github.com/jadogeri/User_GraphQL_Server.git
```

3 Enter command cd graphql-tutorial-ts/server then press enter.

```bash
  cd User_GraphQL_Server/server
```

#### **4.1.1 Run Locally**

1 Type npm install --force to install dependencies.

```bash
  npm install --force
```

2 Type npm run dev to run application

```bash
  npm run dev
```

3 type or copy `http://localhost:4000` to address bar to open apollo server and run querries.

![Screenshot 1](assets/images/usage.png)

---

#### **4.1.2 Run Docker container**

1 Type docker build -t server-image . in command line to build docker image.

```bash
  docker build -t server-image .
```

![dockerbuild](assets/images/dockerimage.png)

2 Type docker run --name server-container -d -it -p 4000:4000 server-image to create and start container immediately.

```bash
  docker run --name server-container -d -it -p 4000:4000 server-image
```

![dockerbuild](assets/images/dockerrun.png)

4 Type docker stop server-container to stop container.

```bash
  docker stop server-container
```

5 Type docker start server-container to start container.

```bash
  docker start server-container
```

## **5. References**

* FreeCodeCamp : [Frontend Web Development: (HTML, CSS, JavaScript, TypeScript, React)](https://www.youtube.com/watch?v=MsnQ5uepIa).
* AweSome Open Source : [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
* Readme.so : [The easiest way to create a README](https://readme.so/)
* FreeCodeCamp : [GraphQL Course for Beginners](https://www.youtube.com/watch?v=5199E50O7SI)
* Apollo Server : [GraphQL Tutorial in Typescript](https://www.apollographql.com/docs/apollo-server/getting-started)
* Easy Devv: [TypeGrapQL Tutorial with Code Examples](https://easydevv.com/type-graphql-tutorial-with-code-examples/)
* FreeCodeCamp: [How to use Typescript with GraphQL](https://www.freecodecamp.org/news/how-to-use-typescript-with-graphql/)