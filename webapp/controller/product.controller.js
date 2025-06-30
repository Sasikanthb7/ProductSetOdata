sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], 
(Controller,JSONModel,Fragment) => {
    "use strict";

    return Controller.extend("com.training.project1.controller.product", {
        onInit() {
            //local model for edit
            var lModel = {isEditable:false};
          let editModel = new JSONModel({
                    isEditable:false
          })
          this.getView().setModel(editModel,"editInputModel")
        },
       onChange(oEvent) {
        let Selected = this.getView().byId("productInput").getValue();
        //get model
        let oModel = this.getOwnerComponent().getModel();
        let sPath = "/productSet('"+Selected+"')";
        oModel.read(sPath,{
            success:function(oData,Response){
                let Jmodel=new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(Jmodel,"readModel");
                }.bind(this),
            error:function(){

            }

        }
        )},
        onEdit: function(){
          //let setEdit =   this.getView().byId("productInput2").setEditable(true);
            let setEdit = this.getView().getModel("editInputModel");
            setEdit.setProperty("/isEditable", true)
        },
        onSave:function(){
            let oCategory= this.getView().getModel("readModel").getProperty("/Category");
            let oSuppliername = this.getView().getModel("readModel").getProperty("/Suppliername");
            let oPrice = this.getView().getModel("readModel").getProperty("/Price");
            let oCreatedat = this.getView().getModel("readModel").getProperty("/Createdat");

            //payload for odata record update
            let oPayload= { 
               Mandt:"",
               "Category":this.getView().getModel("readModel").getProperty("/Category"),
               "Suppliername":oSuppliername,
               "Price":oPrice,
               "Createdat":oCreatedat
              }
        },
        onValueHelp:function(oEvent){
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();
    
                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "com.training.project1.view.ValueHelpDialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pValueHelpDialog.then(function(oDialog) {
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
        }
    });
});