sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/comp/smartvariants/PersonalizableInfo'
], function(Controller, JSONModel, Label, Filter, FilterOperator, PersonalizableInfo) {
	"use strict";

	return Controller.extend("com.tushar.project2.controller.TABLE", {
		onInit: function() {
			this.oFilterBar = this.getView().byId("filterbar");
            let oModel1 = this.getOwnerComponent().getModel();
			let that=this
            oModel1.read("/Products", {
                success : function(oPRODUCTDETAIL, response) {

                   console.log('SUPPLIER DATA IS', oPRODUCTDETAIL)
			       let oJSONMOdel1 = new JSONModel()
			       oJSONMOdel1.setData(oPRODUCTDETAIL)
		           that.getView().setModel(that.oModel,"P")},
			error: function(oError) {
				console.log(oError)
			}
		});
		
		},
		getFiltersWithValues: function () {
			var aFiltersWithValue = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl();

				if (oControl && oControl.getSelectedKeys && oControl.getSelectedKeys().length > 0) {
					aResult.push(oFilterGroupItem);
				}

				return aResult;
			}, []);

			return aFiltersWithValue;
		},

		onSearch: function () {
			var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl(),
					aSelectedKeys = oControl.getSelectedKeys(),
					aFilters = aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: 'ProductID', //oFilterGroupItem.getName(),
							operator: FilterOperator.EQ,
							value1: sSelectedKey
						});
					});

				if (aSelectedKeys.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}

				return aResult;
			}, []);
            
			this.getView().byId("table").getBinding("items").filter(aTableFilters);
			this.getView().byId("table").setShowOverlay(false);
		},
	
		onSearchSimple: function(oEvent) {
			let aFilter = []
            let aName0 =  this.getView().byId('filterbar').getFilterGroupItems()[0].getControl().getSelectedKeys();
			let aName1 =  this.getView().byId('filterbar').getFilterGroupItems()[1].getControl().getSelectedKeys();
			let aName2 =  this.getView().byId('filterbar').getFilterGroupItems()[2].getControl().getSelectedKeys();
			let aName3 =  this.getView().byId('filterbar').getFilterGroupItems()[3].getControl().getSelectedKeys();
			for(var a=0;a<aName0.length;a++){
				aFilter.push( new Filter("ProductID", FilterOperator.EQ, aName0[a]))
			}
			for(var a=0;a<aName1.length;a++){
				aFilter.push( new Filter("ProductID", FilterOperator.EQ, aName1[a]))
			}
			for(var a=0;a<aName2.length;a++){
				aFilter.push( new Filter("ProductID", FilterOperator.EQ, aName2[a]))
			}
			if (aName3=="GRATER THAN 10"){
			aFilter.push( new Filter("UnitsInStock", FilterOperator.GE, 10))};
		     if(aName3=="LESS THAN 10")
				{
			aFilter.push( new Filter("UnitsInStock", FilterOperator.LE, 10))}
			
			this.getView().byId("table").getBinding("items").filter(aFilter);
			// var oFilter = new Filter("CategoryID", FilterOperator.EQ, sName[1]);
			// this.getView().byId("table").getBinding("items").filter([oFilter]);
			// var oFilter = new Filter("SupplierID", FilterOperator.EQ, sName[2]);
			// this.getView().byId("table").getBinding("items").filter([oFilter]);
		},
		
		OnPress:function(oEvent)
		{ 
			let pId = oEvent.getSource().getBindingContext().getProperty("ProductID");
			const oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("RouteViewProductdetail", {pId:pId});

		}

			
			

			
		

		
		
	});
});
