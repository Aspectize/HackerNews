function Main() {

    Aspectize.Host.CanWorkOffline = true;

    Aspectize.Host.InitApplication();

    if (!Aspectize.Host.UrlArgs.StartingViewOrCommandName) {
        Aspectize.Host.ExecuteCommand('ClientService.ActivatePage', 'news', 1);
        Aspectize.InitializeHistoryManager({ ViewName: 'news', SchemaPath: 'MainData.page', Id: 'news-1', Url: 'app.ashx' });
    } else {
        Aspectize.InitializeHistoryManager();
    }


}
