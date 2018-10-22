# This file houses the contents of the project management repo that is being archived  

## WWWWWHH  
### Why:
To allow interactions (service issues, requests, ideas, etc.) from users

### What: 
An entry form for user interactions that will allow users to submit issues, requests, ideas, etc. and be able to see what they have sent in and any discussion we have within the comments of their issue

### When: 
During this semester, faster is preferable

### Who: 
Success critical stakeholders include: the customer (NLC staff), the users, the project manager(s), and the developers

### Where: 
Issues will be created in the operations repo

### How:
Start by researching into GitHub Apps and REST API v3 or, most likely, creating our own database to hold these and creating our own user interface to interact with these service requests and allow the users to see their own requests

### How much:
Our only cost will be time

## Possible Work
Issue 1:

Create a MySQL table called `issue` that includes the following:
- pk (autonumber)
- contactName
- anonymous [Y/N]
- datetime
- subject
- emergency
- ghRepoName
- ghIssueNumber

Issue 2:

Create a MySQL table called `comment` that includes the following:
- pk (autonumber)
- issueFK (foreign key: the PK of the associated `issue` record)
- datetime
- body

When an issue is created, an associated `comment` record will also be created

Issue 3:

Create a MySQL table called `statusHistory` that includes the following:
- pk (autonumber)
- issueFK (foreign key: the PK of the associated `issue` record)
- datetime
- newStatus (Valid values are values of refStatus.statusCode)

This table is to record the history of status changes. When an `issue` is created, a `statusHistory` record is created with `newStatus` set to the minimum value of the `refStatus` table.

Issue 4:

Create a MySQL table called `refStatus` - which is a "reference" or lookup table - that includes the following:

statusCode | StatusLabel

10 | 'Request Received'

20 | 'Problem confirmed'

30 | 'Fix defined'

40 | 'Fix implemented'

50 | 'Fix confirmed'


Issue 5: 

Creation of the model class `CustomerIssue`:

  * `CustomerIssue` is the class structure and it will mirror the `issue` database table
    * Will have additional properties for `comments` and `status`
      * `comments` will be an array of all associated `comment` records from the DB
      * `status` is the value from the most recent `statusHistory` record
  
  * the `save()` method:
    * When an `issue` record is created, the Github API must create an issue with the appropriate status label via the webhook
    
  * A new method: `sync()`
    * The webhook will activate the method
    * Reference the psuedocode for more info:
      * // Ignore webhook calls for GH Issues that are not Customer Issues
      
          if the GH Issue is not in the mysql `issue` table then 
	  
	          stop

          // Record new comments on Customer Issues
	  
          	if there is a new GH Issue comment that is not in the mysql `comment` table then
	  
          		if the commment contains a status label then
		
	          		if the label is invalid then
			
			          log it
				  
			          stop
				  
		          	else
			  
			          create a statusHistory record
				  
	          	add a record to the `comment` table`
			
    * For additional info, go [here](https://github.com/dewv/customerService/blob/master/dev/customerIssueService.md)
    
Issue 6:

Create a web form that includes:
  - contactName
  - Emergency (yes or no)
  - Subject
  - Body
  - Submit button


`POST /customerIssue/sync`
This is triggered by a GitHub webhook. GitHub will make this request to our app when any Issue comment is created, updated, or deleted in any repo(s) that we choose. This allows our app to synchronize MySQL data with the new changes.

- [ ] Change the controller's `defineCommands()` function to include a new command for sync. 
- [ ] Write `sync()`. When an Issue comment is created, updated, or deleted, 
- [ ] Write the associated test code.

## productRequirements
1. Entry form for all users to be able to access
2. Special flag for service interruptions
3. Creation of an issue (with or without flag) in a specific repo
4. Database to capture:
    - username (of who submitted it)
    - the issue #
    - the date the "request" was created
    - the "request" itself
5. Allow users to see their submitted issues through their own UI
    - Possibly through webpage that can load from the created database
    - Allow them to sort their "requests"
    - Allow them to see the comments we have on their issues
    - Allow them to see where we are at with their "request" in our process

## Stakeholders
The following is an approximate* list of the success-critical stakeholders in this project:

- Users/Customer
  - NLC Staff
  - Students
- Developers
  - Professor Mattingly (CEO)
  - David Magda (project manager)
  - Any other developers
  
\*  This can be altered at any time as seen fit

## User Requests
We want to alter [this](https://www.usenix.org/legacy/publications/library/proceedings/lisa99/full_papers/limoncelli/limoncelli_html/index.html) document to fit our needs. We may or may not need all of the steps depending on how the customer service application is going to be executed.
We will want to follow a strict guideline on how to handle the requests from the start rather than trying to catch up later.

Currently, there are 9 steps in 4 phases: 

    Phase A: The Greeting ("Hello")
        Step 1: The Greeting 
    Phase B: Problem Identification ("What's wrong?")
        Step 2: Problem Classification
        Step 3: Problem Statement
        Step 4: Problem Verification 
    Phase C: Planning and Execution ("Fix it")
        Step 5: Solution Proposals
        Step 6: Solution Selection
        Step 7: Execution 
    Phase D: Verification ("Verify it")
        Step 8: Craft verification
        Step 9: User Verification/Closing. 

## Win Conditions

### Professor Mattingly (CEO)
- The customer service process is structured. "Requests" are tracked according to status as follows.
1. Request received
2. Problem confirmed
3. Fix defined
4. Fix implemented
5. Fix confirmed

Each request should move through these statuses in order, without any skipping steps. It will be necessary at times to jump back to an earlier step. We need to keep a full history of status changes with date, new status, who changed it, and comments.

### David Magda (Project Manager)
- The product is ready for use by customers during the window of opportunity

### Developers
- Easy for continuous upkeep (operations)
