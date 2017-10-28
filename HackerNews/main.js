function Main() {
    Aspectize.Host.InitApplication();

    Aspectize.Host.ExecuteCommand('UIService.ShowView', 'news');

    Aspectize.InitializeHistoryManager({ ViewName: 'news', SchemaPath: 'MainData.page', Id: 'news-1', Url: 'app.ashx' });
}
