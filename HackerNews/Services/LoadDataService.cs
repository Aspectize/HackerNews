using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Data;
using Aspectize.Core;
using HackerNews.Roles;

namespace HackerNews
{
    public interface ILoadDataService
    {
        DataSet GetItemPage(string type, int page);
        DataSet GetItem(string type, string id);
    }

    [Service(Name = "LoadDataService")]
    public class LoadDataService : ILoadDataService 
    {
        const string rootUrl = "https://hnpwa.com/api/v0/";

        DataSet ILoadDataService.GetItemPage(string type, int page)
        {
            IEntityManager em = EntityManager.FromDataSet(new DataSet());

            var url = rootUrl + $"{type}.json?page={page}";

            getDataFromHNAPI(url, em, "item", type);

            var items = em.GetAllInstances<item>();

            items.ForEach(e => e.page = page);

            var newPage = em.CreateInstance<page>(new Dictionary<string, object>() { { "id", type + "-" + page }, { "type", type }, { "number", page } });

            newPage.last = (items.Count < 30);

            em.Data.AcceptChanges();

            return em.Data;
        }

        DataSet ILoadDataService.GetItem(string type, string id)
        {
            IEntityManager em = EntityManager.FromDataSet(new DataSet());

            var url = rootUrl + $"{type}/{id}.json";

            getDataFromHNAPI(url, em, type, type);

            return em.Data;
        }

        private void getDataFromHNAPI(string url, IEntityManager em, string type, string specificType)
        {
            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;

            var json = AspectizeHttpClient.Get(url, new Dictionary<string, object>(), new Dictionary<string, string>());

            em.CreateInstanceFromJson(type, json);

            // Must add a specificType to distinguish news and show type (both have type link) to manage repeater filter
            if (specificType == "show")
            {
                foreach (item item in em.GetAllInstances<item>())
                {
                    item.type = "show";
                }
            }

            em.Data.AcceptChanges();
        }

    }


}
