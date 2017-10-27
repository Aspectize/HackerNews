/// <reference path="S:\Delivery\Aspectize.core\AspectizeIntellisense.js" />

Global.ClientService = {

   aasService:'ClientService',
   MainData: 'MainData',
   aasCommandAttributes: {
       DisplayItem: { CanExecuteOnStart: true }
   },

   DisplayItem: function(type, id) {
       var cmd = Aspectize.Host.PrepareCommand();

       cmd.Attributes.aasAsynchronousCall = true;
       cmd.Attributes.aasShowWaiting = true;
       cmd.Attributes.aasDataName = this.MainData;
       cmd.Attributes.aasMergeData = true;

       cmd.OnComplete = function (result) {
           Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.ShowView(type));
       };

       cmd.Call('Server/LoadDataService.GetItem', type, id);
   },
      
   //InitItemType: function (itemType) {
   //    var em = Aspectize.EntityManagerFromContextDataName(this.MainData);

   //    var currentPages = em.GetAllInstances('CurrentPage');

   //    var found = false;
   //    for (var i = 0; i < currentPages.length; i++) {
   //        var currentPage = currentPages[i];

   //        if (currentPage.itemType == itemType) {
   //            found = true;
   //            break
   //        }
   //    }

   //    if (!found) {
   //        var currentPage = em.CreateInstance('CurrentPage');

   //        currentPage.SetField('itemType', itemType);
   //    }


   //},

   SetHtml: function (id, content) {
       var elementId = '#comment-TreeViewComments-' + id;

       var jqId = elementId.replace(/(:|;|\.|\[|\])/g, "\\$1");

       var element = $(jqId + ' .content');

       element.html(content);
   },

   ActiveMenuBar: function (menuSelector, activeMenuSelector) {
       $(menuSelector + ' > ul > li').removeClass('active');
       $(menuSelector + ' > ul > li ' + activeMenuSelector).parent().addClass('active');
   }

};

