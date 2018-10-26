# Design (Subject to updates)
## Model  
### Database  
|   Database column   |   expected input   |        Thoughts on implementation        |
| ------------------- | ------------------ | ---------------------------------------- |
|          pk         |    auto-generate   |                                          |
|       subject       |  string from user  | short description to user to add clarity |
|  Issue comment FK   |  string from user  | long description to user to add clarity  |
|     contactName     |  string from user  |                                          |
|    dateSubmitted    |    auto-generate   |                                          |
|     issueStatus     | Pulled from github |                                          |
| github issue number | Pulled from github |                                          |
|  github repository  | pulled from github |           probably don't need            |
       
 ### Reference Codes  
  |  statusCode  |      StatusLabel      |  
  | ------------ |  -------------------- |  
  |      10      |  "Request Received"   |  
  |      20      |  "Problem Confirmed"  |  
  |      30      |  "Fix Defined"        |  
  |      40      |  "Fix Implemented"    |  
  |      50      |  "Fix Confirmed"      |  
    
    
- Separate comment database will have:  (hard to tell if we need this)
      - pk
      - issueFK
      - date commented
      - Comment
      
### Comment database
| Database Column |     Expected input     | Thoughts on implementation |
| --------------- | ---------------------- | -------------------------- |
|        pk       |     auto-generated     |                            |
|     issueFK     |     auto-generated     |                            |
| date commented  |     auto-genereted     |                            |
|     comment     | passed from controller |                            |
    
## Controller
- Student/Staff submit new issue
  - login is optional, login with D&E info else anonymous
    - If anonymous then ask for contact details?
  - Restful API to database 
- Should be able to view/add comments to it.  CAN NOT update original issue.
    - Adding or viewing old Issues means going back into the repository, only students or whoever has a legitimate login be able to view their old Issues.  If anonymous user, update issue process via automated email (if provided)
    - we should call them something else to make it clear to them what the purpose is when this rolls out.  "Submit Bug/improvement"? "View submitted Bug/improvment"?
      - For our intents and purposes, they will be referred to as "Issues".
- CAN NOT Delete issue


## View
- All uses base view from submodule
- "Open", "Closed", and maybe "All" as filterable flags for the issues they can view.
- Does a github webhook request to sync their view
