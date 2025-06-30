/*global QUnit*/

sap.ui.define([
	"com/training/project1/controller/product.controller"
], function (Controller) {
	"use strict";

	QUnit.module("product Controller");

	QUnit.test("I should test the product controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
