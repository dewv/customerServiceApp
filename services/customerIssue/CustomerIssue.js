/** MVC model for the "student" service. 
 * @module services/customerIssue/CustomerIssue
 */
 
"use strict";

let Model = require("../../mmvece/Model");

/** Models the data and behavior of a student profile record.
 * @argument {number} id - A unique ID number for this student profile.
 * @argument {Object} properties - An object containing values for this element's properties .
 */

class CustomerIssue extends Model{
    constructor(id, properties) {
        super();
        
        /** @member {number} */
        this.id = id;
        /** @member {string} */
        this.contactName = undefined;
        /** @member {string} */
        this.anonymous = undefined;
        /** @member {string} */
        this.dateTime = undefined;
        /** @member {string} */
        this.subject = undefined;
        /** @member {string} */
        this.emergency = undefined;
        /** @member {string} */
        this.ghRepoName = undefined;
        /** @member {number} */
        this.ghIssueNumber = undefined;
        
        if (typeof properties === "undefined") return;
    }
    
    this.contactName = properties.contactName;
    this.anonymous = properties.anonymous;
    this.dateTime = properties.dateTime;
    this.subject = properties.subject;
    this.emergency = properties.emergency;
    this.ghRepoName = properties.ghRepoName;
    this.ghIssueNumber = properties.ghIssueNumber;
}