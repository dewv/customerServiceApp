# Design Rev. 1
## Model  
### Issue Database
#### Issue Table
| Issue requirements  |   expected input   |        Thoughts on implementation        |
| :-----------------: | :----------------: | :--------------------------------------: |
|          pk         |   AUTOINCREMENT    |                                          |
|    urgency flag     |check box from user | issue label for urgency for service interrupts |
|       subject       |  string from user  | short description to user to add clarity |
|  Issue comment FK   | Comment Table value| does a GET request from the Comment DB   |
|     contactName     |  string from user  |                                          |
|    dateSubmitted    |    SQL- generate   |                                          |
|     issueStatus     | Pulled from github |  Says github, but really reference table |
| github issue number | Pulled from github |                                          |
|  github repository  | pulled from github |                                          |
       
 #### Reference Codes  
  |  statusCode  |      StatusLabel      |  
  | :----------: |  :------------------: |  
  |      10      |  "Request Received"   |  
  |      20      |  "Problem Confirmed"  |  
  |      30      |  "Fix Defined"        |  
  |      40      |  "Fix Implemented"    |  
  |      50      |  "Fix Confirmed"      |  
    
      
#### Comment Table
| Database Column |     Expected input     | Thoughts on implementation |
| :-------------: | :--------------------: | :------------------------: |
|        pk       |     AUTOINCREMENT      |                            |
|     issueFK     |    Issue Table value   |                            |
| date commented  |     auto-genereted     |                            |
|     comment     | passed from controller |                            |
    
## Controller
- Student/Staff submit new issue
  - login is optional, login with D&E info else anonymous
    - If anonymous then ask for contact details?
  - Restful API to database 
- Users should be able to view/add comments to their own issues (DEWV login).  CAN NOT update original issue, just add comments.
    - Means we need a way to verify anonymous users if we can let them view their issues.
    - Official names on view will be: "Submit Bug/improvement" and "View submitted Bug/improvment"
      - For our intents and purposes, they will be referred to as "Issues" in our code and documentation.
- CAN NOT Delete issue
- Whenever information is updated, triggers github webhook to update on github.
- have the mysql server update every few minutes from github IF github commits won't trigger the webhook


## View
- All uses base view from submodule
- "Open", "Closed", and maybe "All" as filterable flags for the issues they can view.
- Does a github webhook request to sync their view
