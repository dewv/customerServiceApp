/** MVC model for the "customerIssue" service. 
 * @module services/customerIssue/CustomerIssue
 */

"use strict";

let Model = require("../../mmvece/Model");

/** Models the data and behavior of a customerIssue record.
 * @argument {number} id - A unique ID number for this customerIssue profile.
 * @argument {Object} properties - An object containing values for this element's properties.
 */
class CustomerIssue extends Model {
    constructor(id, properties) {
        super();

        /** @member {number} */
        this.id = id;

        if (typeof properties === "undefined") return;
    }

    /** Reads all customerIssues that the current user can access. 
     * @argument {Function} callback A function to be called when this async operation completes.
     */
    static readAll(callback) {
        Model.readAll(CustomerIssue, callback);
    }
}

CustomerIssue.dbBinding = {
    mainTable: {
        db: "customerService", //name of database where table is located
        name: "issue", // name of main table that stores data for this class
        key: { // we assume there is a single column primary key
            property: "id", // name of the JS object property
            column: "pk" // name of the db table column
        },
        data: [ // set of non-key fields
            {
                property: "", // name of the JS object property
                column: "", // name of the db table column
                columnType: "", // MySQL column definition
                lookup: { // the value for this internal ID sorta field is determined by user-friendly value in a different property of this JS object
                    table: "", // name of the table that defines valid values for this property 
                    sql: "", // query to get internal id for user-friendly property value 
                    column: "", // the db column that contains the internal id 
                    xref: "" // name of the property with user-friendly value
                }
            }
        ]
    },
    otherTables: [ // set of other tables that store data for this class
        {
            db: "customerService", //name of database where table is located
            name: "", // table name
            key: { // we assume there is a single column primary key
                column: "pk" // name of the db table column
            },
            data: [ // set of non-key fields
                {
                    property: "", // name of the JS object property
                    column: "", // name of the db table column
                    columnType: "", // MySQL column definition
                    domain: "" // query to get all possible lookup values from table; used for form selection lists
                }
            ],
            joinColumn: "" // name of the foreign key column in the main table
        }
    ]
};

Model._createTables(CustomerIssue.dbBinding);

CustomerIssue.serviceConfig = {
    baseUrl: "customerIssue",
    modelClass: CustomerIssue 
};
Model.setupService(CustomerIssue.serviceConfig);

module.exports = CustomerIssue;
