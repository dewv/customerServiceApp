# Workflow

- User can use web form to create/submit new Issue. (May or may not be logged in.)
- Submitting form creates record in `issue` table, record in `comment` table (with status "Request received"), and corresponding GitHub Issue with comment. Body of GitHub Issue should include link to (server)/customerIssue/:id/edit, where :id is pk of `issue` table record.
- Customer users can see list of their Issues. Staff users can see all Issues.
- User can create new comment for an Issue. IFF user is staff member (rather than customer), this can include setting a new status value. Status value must be immediate successor of current status or an earlier status. There is no "comment" service, so in terms of REST API, this is an edit to the Issue (`POST customerIssue/:id`). Submission will create new record in `comment` table, and corresponding GitHub comment. Also set label of GitHub Issue to reflect any new status value.
