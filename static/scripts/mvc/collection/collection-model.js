define(["mvc/dataset/dataset-model","mvc/base-mvc","utils/localization"],function(a,b){"use strict";var c={defaults:{model_class:"DatasetCollectionElement",element_identifier:null,element_index:null,element_type:null},_mergeObject:function(a){return _.extend(a,a.object,{element_id:a.id}),delete a.object,a},constructor:function(a){a=this._mergeObject(a),this.idAttribute="element_id",Backbone.Model.apply(this,arguments)},parse:function(a){var b=a;return b=this._mergeObject(b)}},d=Backbone.Model.extend(b.LoggableMixin).extend(c).extend({_logNamespace:"collections"}),e=Backbone.Collection.extend(b.LoggableMixin).extend({_logNamespace:"collections",model:d,toString:function(){return["DatasetCollectionElementCollection(",this.length,")"].join("")}}),f=a.DatasetAssociation.extend(b.mixin(c,{url:function(){return this.has("history_id")?Galaxy.root+"api/histories/"+this.get("history_id")+"/contents/"+this.get("id"):(console.warn("no endpoint for non-hdas within a collection yet"),Galaxy.root+"api/datasets")},defaults:_.extend({},a.DatasetAssociation.prototype.defaults,c.defaults),constructor:function(a,b){this.debug("	 DatasetDCE.constructor:",a,b),c.constructor.call(this,a,b)},hasDetails:function(){return _.has(this.attributes,"annotation")},toString:function(){var a=this.get("element_identifier");return["DatasetDCE(",a,")"].join("")}})),g=e.extend({model:f,toString:function(){return["DatasetDCECollection(",this.length,")"].join("")}}),h=Backbone.Model.extend(b.LoggableMixin).extend(b.SearchableModelMixin).extend({_logNamespace:"collections",defaults:{collection_type:null,deleted:!1},collectionClass:e,initialize:function(a,b){this.debug(this+"(DatasetCollection).initialize:",a,b,this),this.elements=this._createElementsModel(),this.on("change:elements",function(){this.log("change:elements"),this.elements=this._createElementsModel()})},_createElementsModel:function(){this.debug(this+"._createElementsModel",this.collectionClass,this.get("elements"),this.elements);var a=this.get("elements")||[];return this.unset("elements",{silent:!0}),this.elements=new this.collectionClass(a),this.elements},toJSON:function(){var a=Backbone.Model.prototype.toJSON.call(this);return this.elements&&(a.elements=this.elements.toJSON()),a},inReadyState:function(){var a=this.get("populated");return this.isDeletedOrPurged()||a},hasDetails:function(){return this.debug("hasDetails:",this.elements.length),0!==this.elements.length},getVisibleContents:function(){return this.elements},parse:function(a,b){var c=Backbone.Model.prototype.parse.call(this,a,b);return c.create_time&&(c.create_time=new Date(c.create_time)),c.update_time&&(c.update_time=new Date(c.update_time)),c},"delete":function(a){return this.get("deleted")?jQuery.when():this.save({deleted:!0},a)},undelete:function(a){return!this.get("deleted")||this.get("purged")?jQuery.when():this.save({deleted:!1},a)},isDeletedOrPurged:function(){return this.get("deleted")||this.get("purged")},searchAttributes:["name"],toString:function(){var a=[this.get("id"),this.get("name")||this.get("element_identifier")];return"DatasetCollection("+a.join(",")+")"}}),i=h.extend({collectionClass:g,toString:function(){return"List"+h.prototype.toString.call(this)}}),j=i.extend({toString:function(){return"Pair"+h.prototype.toString.call(this)}}),k=h.extend(b.mixin(c,{constructor:function(a,b){this.debug("	 NestedDCDCE.constructor:",a,b),c.constructor.call(this,a,b)},toString:function(){var a=this.object?""+this.object:this.get("element_identifier");return["NestedDCDCE(",a,")"].join("")}})),l=e.extend({model:k,toString:function(){return["NestedDCDCECollection(",this.length,")"].join("")}}),m=j.extend(b.mixin(c,{constructor:function(a,b){this.debug("	 NestedPairDCDCE.constructor:",a,b),c.constructor.call(this,a,b)},toString:function(){var a=this.object?""+this.object:this.get("element_identifier");return["NestedPairDCDCE(",a,")"].join("")}})),n=l.extend({model:m,toString:function(){return["NestedPairDCDCECollection(",this.length,")"].join("")}}),o=h.extend({collectionClass:n,toString:function(){return["ListPairedDatasetCollection(",this.get("name"),")"].join("")}});return{ListDatasetCollection:i,PairDatasetCollection:j,ListPairedDatasetCollection:o}});
//# sourceMappingURL=../../../maps/mvc/collection/collection-model.js.map