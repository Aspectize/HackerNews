using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using Aspectize.Web;
using System.Text.RegularExpressions;

namespace HackerNews.Services
{
    [Service(Name = "UrlRewritingService")]
    public class UrlRewritingService : IURLRewritingService //, IInitializable, ISingleton
    {
        List<RewriteOrRedirect> IURLRewritingService.GetTranslators()
        {
            var translators = new List<RewriteOrRedirect>();

            var regItemOrUser = new Regex(@"/hackernews/(?<type>item|user)\?(id=)?(?<id>\w{1,10})$", RegexOptions.IgnoreCase);

            var regCategory = new Regex(@"/hackernews/(?<type>news|jobs|ask|show)\?page=(?<page>\d{1,10})$", RegexOptions.IgnoreCase);

            translators.Add((Uri url, ref bool redirect) =>
            {
                redirect = false;

                var m = regItemOrUser.Match(url.AbsoluteUri);

                if (m.Success)
                {
                    var type = m.Groups["type"].Value.ToLower();
                    var id = m.Groups["id"].Value;

                    var redirectUrl = string.Format("/HackerNews/app.ashx?@ClientService.DisplayItem&type={0}&id={1}", type, id);

                    var returnUrl = regItemOrUser.Replace(url.AbsoluteUri, redirectUrl);

                    return returnUrl;
                }

                var mCategory = regCategory.Match(url.AbsoluteUri);

                if (mCategory.Success)
                {
                    var type = mCategory.Groups["type"].Value.ToLower();
                    var page = mCategory.Groups["page"].Value.ToLower();

                    var pageInt = int.Parse(page);

                    var redirectUrl = string.Format("/HackerNews/app.ashx?@ClientService.ActivatePage&type={0}&number={1}", type, pageInt - 1);

                    var returnUrl = regCategory.Replace(url.AbsoluteUri, redirectUrl);

                    return returnUrl;
                }

                return null;
            });

            return translators;
        }
    }

}
