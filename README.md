# NOTE:
TM1 IDE has been replaced by [vscode-tm1](https://github.com/bgregs514/vscode-tm1), a Visual Studio Code extension for TM1.  While many of the ideas from this project have been carried forward into vscode-tm1, this project has been deprecated and will be left here for reference.

# Description
Still pending official name - for now TM1 IDE will be used.  The goal of TM1 IDE is to implement a development environment with a desktop feel for both rules and processes.  With the onset of the IBM provided Rest API, there has been a proliferation of web-based editors, but nothing that provides a true native experience for the more traditional developer.  This project aims to cut through the feature overload that has become increasingly popular, and provide the average developer with a simple, clean interface that stays out of their way.

# How to use
Ensure NodeJS/npm is installed.  
Open a shell (Powershell in this example) and run the following after cloning to install project dependencies:
```
npm install
```
Then run the following to start the applicaton:
```
npm start
```


# Architecture
- Electron for desktop experience
- NodeJS for core logic and integration
- Monaco for the development area

# Features
- Rule browsing
- Rule saving
- Desktop push notifications
- Intellisense
- Syntax highlighting
- CAM and Native authentication

# Pending Features
- TI browsing
- TI saving
- Alternate hierarchy browser
- Integration into the OpenCubes Linux project
