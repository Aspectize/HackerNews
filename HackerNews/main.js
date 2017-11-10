function Main() {

    Aspectize.Host.CanWorkOffline = true;

    Aspectize.Host.InitApplication(function () {

        Aspectize.Host.ExecuteCommand('UIService.ShowView', 'news');

        Aspectize.InitializeHistoryManager({ ViewName: 'news', SchemaPath: 'MainData.page', Id: 'news-1', Url: 'app.ashx' });
    });

}
