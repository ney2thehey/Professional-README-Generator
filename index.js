const inquirer = require('inquirer');
const fs = require('fs');
const path = require("path");

function renderLicenseBadge (license) {
  if (license !== "None"){
 return `![Github License](https://img.shields.io/badge/license-${license}-blue.svg)`
  }
  return "";
}

const generateHTML = ({ github, email, title, description, license, installation, test, usage, contributing }) =>{ 
  return `
  # ${title}

  ## Description

  ${description}


  ## Table of Contents 
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Test](#test)
  - [Additional links](#additional-links)


  ## Installation
  ${installation}

  ## Usage
  ${usage}


  ## Liscense 
  ${renderLicenseBadge(license)}

  ## Contributing
  ${contributing}

  ## Test
  ${test}

  --
  ## Additional Links
  * Github: [${github}](https://github.com/${github})
  * Email:${github}
  `
}
  
// Description, Table of Contents, Installation, Usage, License(options), Contributing, Tests, and Questions
inquirer
  .prompt([
    {
      type: 'input',
      name: 'github',
      message: 'What is your GitHub username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
    },
    {
      type: 'input',
      name: 'title',
      message: "What is your project's name?",
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please write a short description of your project',
    },
    {
      type: 'list',
      name: 'license',
      message: 'What kind of license should your project have?',
      choices: ['MIT', 'APACHE2.0', 'GPL3.0', 'BSD3', 'None'],
    },
    {
      type: 'input',
      name: 'installation',
      message: 'What command should be run to install dependencies?',
      default: 'npm i',
    },
    {
      type: 'input',
      name: 'test',
      message: 'What command should be run to run tests?',
      default: 'npm test',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'What does the user need to know about using the repo?',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'What does the user need to know about contributing to the repo?',
    },
  ])
  .then((answers) => {
    const htmlPageContent = generateHTML(answers);    //opens a promise object 
console.log(answers);

    fs.writeFile('readme.md', htmlPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
  });
