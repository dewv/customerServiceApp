# Customer Service Application

[![Build Status](https://travis-ci.org/dewv/customerServiceApp.svg?branch=master)](https://travis-ci.org/dewv/customerServiceApp)
[![Coverage Status](https://coveralls.io/repos/github/dewv/customerServiceApp/badge.svg?branch=master)](https://coveralls.io/github/dewv/customerServiceApp?branch=master)

# Design (Subject to updates)
- All uses base view from submodule
- Student/Staff submit new issue
  - they get here through the nlc portal (makes most sense to me)
  - anonymous was suggested, I suggest being logged in to help avoid random spam.
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
  - get to this through student page
    - this suggests that students can logout of nlc and create/view issues (we should call them something else to make it clear to them what the purpose is.  "Submit Bug/improvement"? "View submitted Bug/improvment"?  
    - Separate comment database will have:
      - pk
      - issueFK
      - date commented
      - Comment
 - Does a github webhook request to sync their view
- CAN NOT Delete issue, but maybe hide them from user after closure?
