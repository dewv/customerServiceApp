# Database design

## Table: `issue`

- pk (autonumber)
- contactName
- anonymous (was this created by anonymous user (not logged in))
- datetime (auto capture)
- subject
- description
- emergency (is this an emergency; may refine this to severity levels)
- ghRepoName (name of the github repo where there is corresponding Issue)
- ghIssueNumber (Issue number in github)

## Table: `comment`

- pk
- issueFK
- datetime (auto capture)
- body
- newStatus (default: NULL)

---

One model class will handle both tables. The JS `Issue` class structure will mirror the `issue` table structure, with additional properties for:
- comments (array)
- status (most recent non-NULL newStatus value)
