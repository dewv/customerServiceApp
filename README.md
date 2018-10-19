# Customer Service Application

[![Build Status](https://travis-ci.org/dewv/customerServiceApp.svg?branch=master)](https://travis-ci.org/dewv/customerServiceApp)
[![Coverage Status](https://coveralls.io/repos/github/dewv/customerServiceApp/badge.svg?branch=master)](https://coveralls.io/github/dewv/customerServiceApp?branch=master)

# Design (Subject to updates)
- All uses base view from submodule
- Student/Staff submit new issue
  - login is optional, login with D&E info else anonymous
    - If anonymous then ask for contact details?
  - Restful API to database 
    - Database will have: 
      - pk
      - subject
      - Issue content
      - contactName
      - dateSubmitted
      - issue status (reference codes)  
      
        |  statusCode  |      StatusLabel      |  
        |     -----    |         -----         |  
        |      10      |  "Request Received"   |  
        |      20      |  "Problem Confirmed"  |  
        |      30      |  "Fix Defined"        |  
        |      40      |  "Fix Implemented"    |  
        |      50      |  "Fix Confirmed"      |  
      - Github issue number
      - Github repository (probably don't need)
- Should be able to view/add comments to it.  CAN NOT update original issue.
    - Adding or viewing old Issues means goign back into the repository, should only students or whoever has a legitimate login be able to view their old Issues?  Just asking the database for issues associated to a certain email or contact credential seems like poor usage/confidentiality of a persons credentials.
    - we should call them something else to make it clear to them what the purpose is when this rolls out.  "Submit      Bug/improvement"? "View submitted Bug/improvment"?  
      - For our intents and purposes, they will be referred to as "Issues".
    - Separate comment database will have:
      - pk
      - issueFK
      - date commented
      - Comment
 - Does a github webhook request to sync their view
- CAN NOT Delete issue
- Have two views or three views for which issues are shown.  "Open", "Closed", and maybe "All", with "Open" being default view.  

