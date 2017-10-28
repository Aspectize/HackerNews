/// <reference path="S:\Delivery\Aspectize.core\AspectizeIntellisense.js" />

Global.ClientService = {

    aasService: 'ClientService',
    MainData: 'MainData',
    aasCommandAttributes: {
        DisplayItem: { CanExecuteOnStart: true }
    },

    DisplayItem: function (type, id) {
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

    SetHtml: function (id, content) {
        var elementId = '#comment-TreeViewComments-' + id;

        var jqId = elementId.replace(/(:|;|\.|\[|\])/g, "\\$1");

        var element = $('.' + id + ' .content');

        element.html(content);
    },

    ActiveMenuBar: function (menuSelector, activeMenuSelector) {
        $(menuSelector + ' > ul > li').removeClass('active');
        $(menuSelector + ' > ul > li ' + activeMenuSelector).parent().addClass('active');
    },

    ActivatePage: function(type) {
        Aspectize.Host.ExecuteCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-' + type));

        var em = Aspectize.EntityManagerFromContextDataName(this.MainData);

        var pages = em.GetAllInstances('page');
        
        var pageTypes = pages.Filter('type == \'' + type + '\' && previous');

        if (pageTypes.length > 0) {
            var page = pageTypes[0];
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.SetCurrent(aas.Path.MainData.page, page.id));

            var url = (page.id == 'news-1') ? 'app.ashx' : 'news?page=' + page.number;
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.History.PushState(type, aas.Path.MainData.page, page.type + '-' + page.number, '', url));
        }
    },

    PreviousPage: function (type, number) {
        var em = Aspectize.EntityManagerFromContextDataName(this.MainData);

        var pages = em.GetAllInstances('page').Filter('type == \'' + type + '\'');

        for (var i = 0; i < pages.length; i++) {
            pages[i].SetField('previous', false);
        }

        var page = em.GetInstance('page', { id: type + '-' + (number - 1) });
        page.SetField('previous', true);

        Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.SetCurrent(aas.Path.MainData.page, type + '-' + page.number));

        Aspectize.Host.ExecuteCommand(aas.Services.Browser.History.PushState(type, aas.Path.MainData.page, type + '-' + page.number, '', type + '?page=' + page.number));
    },

    NextPage: function (type, number, pushstate) {
        var em = Aspectize.EntityManagerFromContextDataName(this.MainData);

        var pages = em.GetAllInstances('page').Filter('type == \'' + type +'\'');

        for (var i = 0; i < pages.length; i++) {
            pages[i].SetField('previous', false);
        }

        var page = em.GetInstance('page', { id: type + '-' + (number + 1) });

        function navigate(page) {
            page.SetField('previous', true);
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.SetCurrent(aas.Path.MainData.page, type + '-' + page.number));
            if (pushstate) {
                Aspectize.Host.ExecuteCommand(aas.Services.Browser.History.PushState(type, aas.Path.MainData.page, type + '-' + page.number, '', type + '?page=' + page.number));
            }
        }

        if (!page) {
            var cmd = Aspectize.Host.PrepareCommand();

            cmd.Attributes.aasAsynchronousCall = true;
            cmd.Attributes.aasShowWaiting = true;
            cmd.Attributes.aasDataName = this.MainData;
            cmd.Attributes.aasMergeData = true;

            cmd.OnComplete = function (result) {
                page = em.GetInstance('page', { id: type + '-' + (number + 1) });
                navigate(page);
            };

            cmd.Call('Server/LoadDataService.GetItemPage', type, (number + 1));
        } else {
            navigate(page);
        }
    }

};

