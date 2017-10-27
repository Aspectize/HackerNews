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

            return getDataFromHNAPI(url, em, "item", type);
        }

        DataSet ILoadDataService.GetItem(string type, string id)
        {
            IEntityManager em = EntityManager.FromDataSet(new DataSet());

            var url = rootUrl + $"{type}/{id}.json";

            return getDataFromHNAPI(url, em, type, type);
        }

        private DataSet getDataFromHNAPI(string url, IEntityManager em, string type, string specificType)
        {
            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;

            var json = AspectizeHttpClient.Get(url, new Dictionary<string, object>(), new Dictionary<string, string>());

            em.CreateInstanceFromJson(type, json);

            // Must add a specificType to distinguish news and show type (both have type link) !
            foreach (item item in em.GetAllInstances<item>())
            {
                item.specificType = specificType;
            }

            em.Data.AcceptChanges();

            return em.Data;
        }

    }


}
