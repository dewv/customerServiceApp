"use strict";

require("should");
const MockExpressRequest = require("mock-express-request");
const MockExpressResponse = require("mock-express-response");
const jquery = require("cheerio");
const baseUrl = "/baseUrlForTesting";

function runViewsTests(viewsUnderTest, testData, selectLists, formControls, expectedFeatures) {
    if (typeof testData === "undefined" || !Array.isArray(testData) || testData.length < 2) {
        throw "Test error: testData must be an array of at least two elements";
    }
    selectLists = selectLists || {};
    formControls = formControls || {};
    expectedFeatures = expectedFeatures || {};
    
    describe(viewsUnderTest.constructor.name, function() {
        if (viewsUnderTest.displayList) {
            context("a view listing elements", function() {
                let request = new MockExpressRequest({
                    baseUrl: baseUrl
                });
                let response = new MockExpressResponse();
                viewsUnderTest.displayList(request, response, testData);

                it("should render without error", function(done) {
                    checkRendering(response);
                    done();
                });

                const $ = jquery.load(response._getString());

                it("should include a link to each element", function(done) {
                    for (let i = 0; i < testData.length; i++) {
                        $("a[href=\"" + request.baseUrl + "/" + testData[i].id + "\"]").length.should.equal(1);
                    }
                    done();
                });

                it("should include all properties of each element", function(done) {
                    for (let i = 0; i < testData.length; i++) {
                        for (let property in testData[i]) {
                            if (property !== "id") {
                                $("span#id" + testData[i].id + property).length.should.equal(1);
                            }
                        }
                    }
                    done();
                });

                if (expectedFeatures.indexEditLinks) {
                    it("should include a link to edit each element", function(done) {
                        for (let i = 0; i < testData.length; i++) {
                            $("a[href=\"" + request.baseUrl + "/" + testData[i].id + "/edit\"]").length.should.equal(1);
                        }
                        done();
                    });
                }

                if (expectedFeatures.indexDeleteButtons) {
                    it("should include a button to delete each element", function(done) {
                        for (let i = 0; i < testData.length; i++) {
                            $("button[onclick=\"deleteById(" + testData[i].id + ");\"]").length.should.equal(1);
                        }
                        done();
                    });

                }

                if (expectedFeatures.indexAddLink) {
                    it("should include a link to add a new element", function(done) {
                        $("a[href=\"" + request.baseUrl + "/new\"]").length.should.equal(1);
                        done();
                    });
                }
            });
        }

        if (viewsUnderTest.displayCreateForm) {
            context("a view for a create form", function() {
                let request = new MockExpressRequest({
                    baseUrl: baseUrl
                });
                let response = new MockExpressResponse();
                viewsUnderTest.displayCreateForm(request, response, selectLists);

                it("should render without error", function(done) {
                    checkRendering(response);
                    done();
                });

                const $ = jquery.load(response._getString());
                for (let i = 0; i < formControls.length; i++) {
                    it("should include a(n) " + formControls[i].type + " control for the " + formControls[i].name, function(done) {
                        $(formControls[i].type + "[name=\"" + formControls[i].name + "\"]").length.should.equal(1);
                        done();
                    });
                }

                it("should include a submit button", function(done) {
                    $(":submit").length.should.equal(1);
                    done();
                });
            });
        }

        if (viewsUnderTest.displayEditForm) {
            context("a view for an edit form", function() {
                let request = new MockExpressRequest({
                    baseUrl: baseUrl
                });
                let response = new MockExpressResponse();

                viewsUnderTest.displayEditForm(request, response, testData[0], selectLists);

                it("should render without error", function(done) {
                    checkRendering(response);
                    done();
                });

                const $ = jquery.load(response._getString());
                for (let i = 0; i < formControls.length; i++) {
                    it("should include a(n) " + formControls[i].type + " control containing the " + formControls[i].name + " value", function(done) {
                        let query = formControls[i].type + "[name=\"" + formControls[i].name + "\"]";
                        if (formControls[i].type === "input") {
                            query += "[value=\"" + testData[0][formControls[i].name] + "\"]";
                        }
                        else if (formControls[i].type === "select") {
                            query += " option[selected][value=\"" + testData[0][formControls[i].name] + "\"]";
                        }
                        $(query).length.should.equal(1);
                        done();
                    });
                }

                it("should include a submit button", function(done) {
                    $(":submit").length.should.equal(1);
                    done();
                });
            });
        }

        if (viewsUnderTest.displayDetails) {
            context("a view displaying one element's details", function() {
                let request = new MockExpressRequest({
                    baseUrl: baseUrl
                });
                let response = new MockExpressResponse();
                viewsUnderTest.displayDetails(request, response, testData[0]);

                it("should render without error", function(done) {
                    checkRendering(response);
                    done();
                });

                const $ = jquery.load(response._getString());

                it("should include all properties of the element", function(done) {
                    for (let property in testData[0]) {
                        if (property !== "id") {
                            $("span#" + property + ":contains('" + testData[0][property] + "')").length.should.equal(1, "No span found for " + property);
                        }
                    }
                    done();
                });
            });
        }
    });
}

function checkRendering(response) {
    const templateErrorString = "A template error occurred at the end of the preceding line.";
    let s = response._getString();
    s.includes(templateErrorString).should.be.false("Unable to render tag: " + s.substring(s.lastIndexOf("<"), s.lastIndexOf(templateErrorString)));
}

module.exports = runViewsTests;