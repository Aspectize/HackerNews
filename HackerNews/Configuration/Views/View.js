
var home = Aspectize.CreateView("Home", aas.Controls.Home);
home.jobs.click.BindCommand(aas.Services.Browser.ClientService.ActivatePage('jobs'));
home.news.click.BindCommand(aas.Services.Browser.ClientService.ActivatePage('news'));
home.ask.click.BindCommand(aas.Services.Browser.ClientService.ActivatePage('ask'));
home.show.click.BindCommand(aas.Services.Browser.ClientService.ActivatePage('show'));

var listheader = Aspectize.CreateView('listheader', aas.Controls.listheader, aas.Zones.Home.ZoneInfo, false, aas.Data.MainData.page);
listheader.displayNext.BindData(aas.Expression(IIF(listheader.ParentData.last, 'hidden', '')));
listheader.displayPrevious.BindData(aas.Expression(IIF(listheader.ParentData.number > 1, '', 'hidden')));
listheader.number.BindData(listheader.ParentData.number);
listheader.previous.click.BindCommand(aas.Services.Browser.ClientService.ActivatePage(listheader.ParentData.type, aas.Expression(listheader.ParentData.number - 1)));
listheader.next.click.BindCommand(aas.Services.Browser.ClientService.ActivatePage(listheader.ParentData.type, aas.Expression(listheader.ParentData.number + 1)));

var news = Aspectize.CreateView('news', aas.Controls.items, aas.Zones.listheader.ZoneInfo, true);
news.OnActivated.BindCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-news'));

var itemElement = Aspectize.CreateRepeatedView('itemElement', aas.Controls.itemElement, aas.Zones.news.RepeaterPanelitem, aas.Data.MainData.item, 'points DESC', aas.Expression('type == \'link\' && page == ' + aas.Data.MainData.page.number));
itemElement.points.BindData(itemElement.ParentData.points);
itemElement.timeago.BindData(itemElement.ParentData.timeago);
itemElement.title.BindData(itemElement.ParentData.title);
itemElement.user.BindData(itemElement.ParentData.user);
itemElement.commentscount.BindData(itemElement.ParentData.commentscount);
itemElement.showArticle.href.BindData(itemElement.ParentData.url);
itemElement.showComments.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('item', itemElement.ParentData.id));
itemElement.showUser.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('user', itemElement.ParentData.user));

var jobs = Aspectize.CreateView('jobs', aas.Controls.items, aas.Zones.listheader.ZoneInfo);
jobs.OnActivated.BindCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-jobs'));

var jobElement = Aspectize.CreateRepeatedView('jobElement', aas.Controls.jobElement, aas.Zones.jobs.RepeaterPanelitem, aas.Data.MainData.item, 'time DESC', aas.Expression('type == \'job\' && page == ' + aas.Data.MainData.page.number));
jobElement.timeago.BindData(jobElement.ParentData.timeago);
jobElement.jobtitle.BindData(jobElement.ParentData.title);
jobElement.domain.BindData(jobElement.ParentData.domain);
jobElement.showJob.href.BindData(jobElement.ParentData.url);
jobElement.displayDomain.BindData(aas.Expression(IIF(jobElement.ParentData.domain, '', 'hidden')));

var ask = Aspectize.CreateView('ask', aas.Controls.items, aas.Zones.listheader.ZoneInfo);
ask.OnActivated.BindCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-ask'));

var askElement = Aspectize.CreateRepeatedView('askElement', aas.Controls.askElement, aas.Zones.ask.RepeaterPanelitem, aas.Data.MainData.item, 'time DESC', aas.Expression('type == \'ask\' && page == ' + aas.Data.MainData.page.number));
askElement.timeago.BindData(askElement.ParentData.timeago);
askElement.title.BindData(askElement.ParentData.title);
askElement.points.BindData(askElement.ParentData.points);
askElement.commentscount.BindData(askElement.ParentData.commentscount);
askElement.user.BindData(askElement.ParentData.user);
askElement.showAsk.href.BindData(askElement.ParentData.url);
askElement.showComments.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('item', askElement.ParentData.id));
askElement.showUser.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('user', askElement.ParentData.user));

var show = Aspectize.CreateView('show', aas.Controls.items, aas.Zones.listheader.ZoneInfo, false, aas.Data.MainData.item);
show.OnActivated.BindCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-show'));

var showElement = Aspectize.CreateRepeatedView('showElement', aas.Controls.itemElement, aas.Zones.show.RepeaterPanelitem, aas.Data.MainData.item, 'time DESC', aas.Expression('type == \'show\' && page == ' + aas.Data.MainData.page.number));
showElement.points.BindData(showElement.ParentData.points);
showElement.timeago.BindData(showElement.ParentData.timeago);
showElement.title.BindData(showElement.ParentData.title);
showElement.user.BindData(showElement.ParentData.user);
showElement.commentscount.BindData(showElement.ParentData.commentscount);
showElement.showArticle.href.BindData(showElement.ParentData.url);
showElement.showComments.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('item', showElement.ParentData.id));
showElement.showUser.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('user', showElement.ParentData.user));
