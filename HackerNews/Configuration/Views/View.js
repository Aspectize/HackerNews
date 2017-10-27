
var home = Aspectize.CreateView("Home", aas.Controls.Home);
home.jobs.click.BindCommand(aas.Services.Browser.UIService.ShowView(aas.ViewName.jobs));
home.items.click.BindCommand(aas.Services.Browser.UIService.ShowView(aas.ViewName.items));
home.ask.click.BindCommand(aas.Services.Browser.UIService.ShowView(aas.ViewName.ask));
home.show.click.BindCommand(aas.Services.Browser.UIService.ShowView(aas.ViewName.show));

var items = Aspectize.CreateView('items', aas.Controls.items, aas.Zones.Home.ZoneInfo, true);
items.OnLoad.BindCommand(aas.Services.Server.LoadDataService.GetItemPage('news', 1), aas.Data.MainData, true, true);
items.OnActivated.BindCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-items'));

var itemElement = Aspectize.CreateRepeatedView('itemElement', aas.Controls.itemElement, aas.Zones.items.RepeaterPanelitem, aas.Data.MainData.item, 'points DESC', 'specificType == \'news\'');
itemElement.points.BindData(itemElement.ParentData.points);
itemElement.timeago.BindData(itemElement.ParentData.timeago);
itemElement.title.BindData(itemElement.ParentData.title);
itemElement.user.BindData(itemElement.ParentData.user);
itemElement.commentscount.BindData(itemElement.ParentData.commentscount);
itemElement.showArticle.href.BindData(itemElement.ParentData.url);
itemElement.showComments.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('item', itemElement.ParentData.id));
itemElement.showUser.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('user', itemElement.ParentData.user));

var item = Aspectize.CreateView('item', aas.Controls.item, aas.Zones.Home.ZoneInfo, false, aas.Data.MainData.item);
item.OnActivated.BindCommand(aas.Services.Browser.History.PushState(aas.ViewName.item, aas.Path.MainData.item, item.ParentData.id, '', aas.Expression('item/' + item.ParentData.id)));
item.header.commentscount.BindData(item.ParentData.commentscount);
item.header.points.BindData(item.ParentData.points);
item.header.timeago.BindData(item.ParentData.timeago);
item.header.title.BindData(item.ParentData.title);
item.header.user.BindData(item.ParentData.user);

var commentTree = item.TreeViewComments.AddNodeBinding('CommentNode', aas.Data.MainData.item.comments_ROLE_Parent.item, false, false, 'time DESC', '!deleted');
commentTree.AutoExpand.BindData(true);
commentTree.timeago.BindData(commentTree.DataSource.timeago);
commentTree.user.BindData(commentTree.DataSource.user);
commentTree.content.BindData(commentTree.DataSource.content);
//commentTree.content.BindData(aas.Services.Browser.ClientService.SetHtml(commentTree.DataSource.id, commentTree.DataSource.content));
//commentTree.OnFirstExpand.BindCommand(aas.Services.Browser.ClientService.SetHtml(commentTree.DataSource.id, commentTree.DataSource.content));

var commentChild = commentTree.AddNodeBinding('CommentNode', commentTree.ParentData.comments_ROLE_Parent.item, true, true, "time DESC", '!deleted');
commentChild.AutoExpand.BindData(true);
commentChild.content.BindData(commentChild.DataSource.content);
commentChild.timeago.BindData(commentChild.DataSource.timeago);
commentChild.user.BindData(commentChild.DataSource.user);

var user = Aspectize.CreateView('user', aas.Controls.user, aas.Zones.Home.ZoneInfo, false, aas.Data.MainData.user);
user.OnActivated.BindCommand(aas.Services.Browser.History.PushState(aas.ViewName.user, aas.Path.MainData.user, user.ParentData.id, '', aas.Expression('user/' + user.ParentData.id)));
user.userid.BindData(user.ParentData.id);
user.karma.BindData(user.ParentData.karma);
user.timeago.BindData(user.ParentData.createdtime);
user.about.BindData(user.ParentData.about);

var jobs = Aspectize.CreateView('jobs', aas.Controls.items, aas.Zones.Home.ZoneInfo);
jobs.OnActivated.BindCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-jobs'));
jobs.OnActivated.BindCommand(aas.Services.Browser.History.PushState(aas.ViewName.jobs, aas.Path.MainData.item, aas.Data.MainData.item.id, '', 'jobs'));
jobs.OnLoad.BindCommand(aas.Services.Server.LoadDataService.GetItemPage('jobs', 1), aas.Data.MainData, true, true);

var jobElement = Aspectize.CreateRepeatedView('jobElement', aas.Controls.jobElement, aas.Zones.jobs.RepeaterPanelitem, aas.Data.MainData.item, 'time DESC', 'specificType == \'jobs\'');
jobElement.timeago.BindData(jobElement.ParentData.timeago);
jobElement.jobtitle.BindData(jobElement.ParentData.title);
jobElement.domain.BindData(jobElement.ParentData.domain);
jobElement.showJob.href.BindData(jobElement.ParentData.url);
jobElement.displayDomain.BindData(aas.Expression(IIF(jobElement.ParentData.domain, '', 'hidden')));

var job = Aspectize.CreateView('job', aas.Controls.job, aas.Zones.Home.ZoneInfo, false, aas.Data.MainData.item);

var ask = Aspectize.CreateView('ask', aas.Controls.items, aas.Zones.Home.ZoneInfo);
ask.OnActivated.BindCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-ask'));
ask.OnActivated.BindCommand(aas.Services.Browser.History.PushState(aas.ViewName.ask, aas.Path.MainData.item, aas.Data.MainData.item.id, '', 'ask'));
ask.OnLoad.BindCommand(aas.Services.Server.LoadDataService.GetItemPage('ask', 1), aas.Data.MainData, true, true);

var askElement = Aspectize.CreateRepeatedView('askElement', aas.Controls.askElement, aas.Zones.ask.RepeaterPanelitem, aas.Data.MainData.item, 'time DESC', 'specificType == \'ask\'');
askElement.timeago.BindData(askElement.ParentData.timeago);
askElement.title.BindData(askElement.ParentData.title);
askElement.points.BindData(askElement.ParentData.points);
askElement.commentscount.BindData(askElement.ParentData.commentscount);
askElement.user.BindData(askElement.ParentData.user);
askElement.showAsk.href.BindData(askElement.ParentData.url);

var show = Aspectize.CreateView('show', aas.Controls.items, aas.Zones.Home.ZoneInfo, false, aas.Data.MainData.item);
show.OnActivated.BindCommand(aas.Services.Browser.ClientService.ActiveMenuBar('#bs-example-navbar-collapse-1', '#Home-show'));
show.OnActivated.BindCommand(aas.Services.Browser.History.PushState(aas.ViewName.show, aas.Path.MainData.item, aas.Data.MainData.item.id, '', 'show'));
show.OnLoad.BindCommand(aas.Services.Server.LoadDataService.GetItemPage('show', 1), aas.Data.MainData, true, true);

var showElement = Aspectize.CreateRepeatedView('showElement', aas.Controls.itemElement, aas.Zones.show.RepeaterPanelitem, aas.Data.MainData.item, 'time DESC', 'specificType == \'show\'');
showElement.points.BindData(showElement.ParentData.points);
showElement.timeago.BindData(showElement.ParentData.timeago);
showElement.title.BindData(showElement.ParentData.title);
showElement.user.BindData(showElement.ParentData.user);
showElement.commentscount.BindData(showElement.ParentData.commentscount);
showElement.showArticle.href.BindData(showElement.ParentData.url);
showElement.showComments.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('item', showElement.ParentData.id));
showElement.showUser.click.BindCommand(aas.Services.Browser.ClientService.DisplayItem('user', showElement.ParentData.user));
