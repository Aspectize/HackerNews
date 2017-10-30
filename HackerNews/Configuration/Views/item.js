var item = Aspectize.CreateView('item', aas.Controls.item, aas.Zones.Home.ZoneInfo, false, aas.Data.MainData.item);
item.OnActivated.BindCommand(aas.Services.Browser.History.PushState(aas.ViewName.item, aas.Path.MainData.item, item.ParentData.id, '', aas.Expression('item/' + item.ParentData.id)));
item.header.commentscount.BindData(item.ParentData.commentscount);
item.header.points.BindData(item.ParentData.points);
item.header.timeago.BindData(item.ParentData.timeago);
item.header.title.BindData(item.ParentData.title);
item.header.user.BindData(item.ParentData.user);

var commentRoot = item.TreeViewComments.AddNodeBinding('CommentNode', aas.Data.MainData.item.comments_ROLE_Parent.item, false, false, 'time DESC', '!deleted');
commentRoot.AutoExpand.BindData(true);
commentRoot.timeago.BindData(commentRoot.DataSource.timeago);
commentRoot.user.BindData(commentRoot.DataSource.user);
commentRoot.commentscount.BindData(commentRoot.DataSource.commentscount);
commentRoot.displayCommentsCount.BindData(aas.Expression(IIF(commentRoot.DataSource.commentscount, '', 'hidden')));
commentRoot.OnNodeLoad.BindCommand(aas.Services.Browser.ClientService.SetHtml('', "ContextualData:[Current].content"));

var commentChild = commentRoot.AddNodeBinding('CommentNode', commentRoot.ParentData.comments_ROLE_Parent.item, true, true, "time DESC", '!deleted');
commentChild.AutoExpand.BindData(true);
commentChild.timeago.BindData(commentChild.DataSource.timeago);
commentChild.user.BindData(commentChild.DataSource.user);
commentChild.commentscount.BindData(commentChild.DataSource.commentscount);
commentChild.displayCommentsCount.BindData(aas.Expression(IIF(commentChild.DataSource.commentscount, '', 'hidden')));
commentChild.OnNodeLoad.BindCommand(aas.Services.Browser.ClientService.SetHtml('', "ContextualData:[Current].content"));

var user = Aspectize.CreateView('user', aas.Controls.user, aas.Zones.Home.ZoneInfo, false, aas.Data.MainData.user);
user.OnActivated.BindCommand(aas.Services.Browser.History.PushState(aas.ViewName.user, aas.Path.MainData.user, user.ParentData.id, '', aas.Expression('user/' + user.ParentData.id)));
user.userid.BindData(user.ParentData.id);
user.karma.BindData(user.ParentData.karma);
user.timeago.BindData(user.ParentData.createdtime);
user.about.BindData(user.ParentData.about);

