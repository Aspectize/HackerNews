function Main() {
    Aspectize.Host.InitApplication();

    Aspectize.Host.ExecuteCommand('UIService.ShowView', 'items');

    Aspectize.InitializeHistoryManager('items');
}
