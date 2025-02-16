sap.ui.define([
    "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   	"sap/ui/core/Fragment"
], (Controller, JSONModel,Fragment) => {
    "use strict";

    return Controller.extend("com.tushar.project2.controller.Productdetail", {
        onInit() {
            //UIComponent.getRouterFor(this).getRoute("RouteViewProductdetail").attachPatternMatched(this.onObjectMatched, this);
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteViewProductdetail").attachMatched(this.onObjectMatched, this);
        },
       
            
            onObjectMatched : function (oEvent) {
                const that = this
                var sPID =  oEvent.getParameter("arguments").pId;
                this.sPID = sPID;

                const oModel = that.getOwnerComponent().getModel();
                oModel.read("/Products("+ sPID +")", {
                    success : function(oPRODUCTDETAIL, response) {
                       console.log('PRODUCT DATA IS', oPRODUCTDETAIL)
                       let oJSONMOdel1 = new JSONModel()
                       oJSONMOdel1.setData(oPRODUCTDETAIL)
                       that.getView().setModel(oJSONMOdel1, "S")    
                    },
                    
                    error: function(oError) {
                       console.log(oError)
                   },
                  
                
                });
        },

        //Write a new method

        onObjectMatched1 : function (oEvent) {
           let sPID = this.sPID;
           let that = this;

            let oModel1 = this.getOwnerComponent().getModel();
            oModel1.read("/Products("+ sPID +")/Supplier", {
                success : function(oSUPPLIERTDETAIL, response) {
                   console.log('SUPPLIER DATA IS', oSUPPLIERTDETAIL)
                   let oJSONMOdel2 = new JSONModel()
                   oJSONMOdel2.setData(oSUPPLIERTDETAIL)
                   that.getView().setModel(oJSONMOdel2, "M")    
                },
                
                error: function(oError) {
                   console.log(oError)
               },
              
              
            });
    },
    openQuickView: function (oEvent, oModel) {
        var oButton = oEvent.getSource(),
            oView = this.getView();

        if (!this._pQuickView) {
            this._pQuickView = Fragment.load({
                id: oView.getId(),
                name: "com.tushar.project2.view.TABLEEDIT",
                controller: this
            }).then(function (oQuickView) {
                oView.addDependent(oQuickView);
                return oQuickView;
            });
        }
        this._pQuickView.then(function (oQuickView){
            oQuickView.setModel(oModel);
            oQuickView.openBy(oButton);
        });
    },
    handleProductQuickViewPress: function (oEvent) {
        var oModel = this.getOwnerComponent().getModel();
        this.openQuickView(oEvent, oModel);
    },

        
    });
});