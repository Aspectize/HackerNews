function Main() {

    Aspectize.App.CanWorkOffline = true;
    Aspectize.App.CookieLess = true;

    Aspectize.App.Initialize(function () {

        if (!Aspectize.Host.UrlArgs.StartingViewOrCommandName) {
            Aspectize.Host.ExecuteCommand('ClientService.ActivatePage', 'news', 1);
            Aspectize.InitializeHistoryManager({ ViewName: 'news', SchemaPath: 'MainData.page', Id: 'news-1', Url: 'app.ashx' });
        } else {
            Aspectize.InitializeHistoryManager();
        }

    });
}
