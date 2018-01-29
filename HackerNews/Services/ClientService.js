Global.ClientService = {

    aasService: 'ClientService',
    MainData: 'MainData',
    aasCommandAttributes: {
        DisplayUser: { CanExecuteOnStart: true },
        DisplayItem: { CanExecuteOnStart: true },
        ActivatePage: { CanExecuteOnStart: true }
    },

    DisplayUser: function (id) {
        var cmd = Aspectize.Host.PrepareCommand();

        cmd.Attributes.aasAsynchronousCall = true;
        cmd.Attributes.aasShowWaiting = true;
        cmd.Attributes.aasDataName = this.MainData;
        cmd.Attributes.aasMergeData = true;

        cmd.OnComplete = function (result) {
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.SetCurrent('MainData.user', id));
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.ShowView(aas.ViewName.user));
        };

        cmd.Call('Server/LoadDataService.GetItem', 'user', id);
    },

    DisplayItem: function (type, id) {
        var em = Aspectize.EntityManagerFromContextDataName(this.MainData);

        var pages = em.GetAllInstances('page');

        var pageTypes = pages.Filter('type == \'' + type + '\' && previous');

        var activePage = pageTypes[0];

        var cmd = Aspectize.Host.PrepareCommand();

        cmd.Attributes.aasAsynchronousCall = true;
        cmd.Attributes.aasShowWaiting = true;
        cmd.Attributes.aasDataName = this.MainData;
        cmd.Attributes.aasMergeData = true;

        cmd.OnComplete = function (result) {
            var item = em.GetInstance('item', id);
            item.SetField('page', activePage.number);

            Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.SetCurrent('MainData.item', id));
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.ShowView(aas.ViewName.item));
        };

        cmd.Call('Server/LoadDataService.GetItem', 'item', id);
    },

    ActivatePage: function (type, number) {
        var em = Aspectize.EntityManagerFromContextDataName(this.MainData);

        var pages = em.GetAllInstances('page');

        var pageTypes = pages.Filter('type == \'' + type + '\' && previous');

        var previousPage = (pageTypes.length > 0) ? pageTypes[0] : null;

        var viewIsVisible = $('#' + type).is(":visible");

        function navigate(page) {
            page.SetField('previous', true);
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.ShowView(type));
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.SetCurrent(aas.Path.MainData.page, page.id));
            var url = (page.id == 'news-1') ? 'app.ashx' : type + '?page=' + page.number;
            Aspectize.Host.ExecuteCommand(aas.Services.Browser.History.PushState(type, aas.Path.MainData.page, page.id, '', url));
        }

        if (!number) {
            if (previousPage) {
                var activePage = Aspectize.Host.ExecuteCommand(aas.Services.Browser.UIService.GetCurrent(aas.Path.MainData.page));
                if (previousPage.id !== activePage.id || !viewIsVisible) {
                    navigate(previousPage);
                }
                return;
            }
            number = 1;
        }

        if (previousPage) previousPage.SetField('previous', false);

        var page = em.GetInstance('page', { id: type + '-' + (+number) });

        if (!page) {
            var cmd = Aspectize.Host.PrepareCommand();

            cmd.Attributes.aasAsynchronousCall = true;
            cmd.Attributes.aasShowWaiting = true;
            cmd.Attributes.aasDataName = this.MainData;
            cmd.Attributes.aasMergeData = true;

            cmd.OnComplete = function (result) {
                page = em.GetInstance('page', { id: type + '-' + (+number) });
                navigate(page);
            };

            cmd.Call('Server/LoadDataService.GetItemPage', type, (+number));
        } else {
            navigate(page);
        }
    },

    SetHtmlComment: function (aasEventArg, content) {
        var element = $(aasEventArg.HtmlItem).find('.content');
        element.html(content);
    },

    SetHtmlAbout: function (content) {
        var element = $('#user').find('.about');
        element.html(content);
    },

    ActiveMenuBar: function (menuSelector, activeMenuSelector) {
        $(menuSelector + ' > ul > li').removeClass('active');
        $(menuSelector + ' > ul > li ' + activeMenuSelector).parent().addClass('active');
    }
};

