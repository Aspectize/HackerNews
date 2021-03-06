﻿
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.ComponentModel;

using Aspectize.Core;

[assembly:AspectizeDALAssemblyAttribute]

namespace HackerNews
{
	public static partial class SchemaNames
	{
		public static partial class Entities
		{
			public const string item = "item";
			public const string user = "user";
			public const string page = "page";
		}

		public static partial class Relations
		{
			public const string comments = "comments";
		}
	}

	[SchemaNamespace]
	public class DomainProvider : INamespace
	{
		public string Name { get { return GetType().Namespace; } }
		public static string DomainName { get { return new DomainProvider().Name; } }
	}

	namespace Roles
	{
		public interface Child { }
		public interface Parent { }
	}

	[DataDefinition(MustPersist = false)]
	public class item : Entity, IDataWrapper
	{
		public static partial class Fields
		{
			public const string id = "id";
			public const string title = "title";
			public const string points = "points";
			public const string user = "user";
			public const string time = "time";
			public const string timeago = "timeago";
			public const string content = "content";
			public const string commentscount = "commentscount";
			public const string type = "type";
			public const string url = "url";
			public const string domain = "domain";
			public const string deleted = "deleted";
			public const string dead = "dead";
			public const string level = "level";
			public const string page = "page";
		}

		void IDataWrapper.InitData(DataRow data, string namePrefix)
		{
			base.InitData(data, null);
		}

		[Data(IsPrimaryKey = true)]
		public string id
		{
			get { return getValue<string>("id"); }
			set { setValue<string>("id", value); }
		}

		[Data]
		public string title
		{
			get { return getValue<string>("title"); }
			set { setValue<string>("title", value); }
		}

		[Data(IsNullable = true)]
		public int? points
		{
			get { return getValue<int?>("points"); }
			set { setValue<int?>("points", value); }
		}

		[Data(IsNullable = true)]
		public string user
		{
			get { return getValue<string>("user"); }
			set { setValue<string>("user", value); }
		}

		[Data(IsNullable = true)]
		public DateTime? time
		{
			get { return getValue<DateTime?>("time"); }
			set { setValue<DateTime?>("time", value); }
		}

		[Data(PhysicalName = "time_ago")]
		public string timeago
		{
			get { return getValue<string>("timeago"); }
			set { setValue<string>("timeago", value); }
		}

		[Data]
		public string content
		{
			get { return getValue<string>("content"); }
			set { setValue<string>("content", value); }
		}

		[Data(PhysicalName = "comments_count")]
		public int commentscount
		{
			get { return getValue<int>("commentscount"); }
			set { setValue<int>("commentscount", value); }
		}

		[Data]
		public string type
		{
			get { return getValue<string>("type"); }
			set { setValue<string>("type", value); }
		}

		[Data]
		public string url
		{
			get { return getValue<string>("url"); }
			set { setValue<string>("url", value); }
		}

		[Data]
		public string domain
		{
			get { return getValue<string>("domain"); }
			set { setValue<string>("domain", value); }
		}

		[Data(IsNullable = true)]
		public bool? deleted
		{
			get { return getValue<bool?>("deleted"); }
			set { setValue<bool?>("deleted", value); }
		}

		[Data(IsNullable = true)]
		public bool? dead
		{
			get { return getValue<bool?>("dead"); }
			set { setValue<bool?>("dead", value); }
		}

		[Data(IsNullable = true)]
		public int? level
		{
			get { return getValue<int?>("level"); }
			set { setValue<int?>("level", value); }
		}

		[Data]
		public int page
		{
			get { return getValue<int>("page"); }
			set { setValue<int>("page", value); }
		}

	}

	[DataDefinition]
	public class user : Entity, IDataWrapper
	{
		public static partial class Fields
		{
			public const string id = "id";
			public const string about = "about";
			public const string createdtime = "createdtime";
			public const string created = "created";
			public const string karma = "karma";
		}

		void IDataWrapper.InitData(DataRow data, string namePrefix)
		{
			base.InitData(data, null);
		}

		[Data(IsPrimaryKey = true)]
		public string id
		{
			get { return getValue<string>("id"); }
			set { setValue<string>("id", value); }
		}

		[Data(IsNullable = true)]
		public string about
		{
			get { return getValue<string>("about"); }
			set { setValue<string>("about", value); }
		}

		[Data(PhysicalName = "created_time")]
		public string createdtime
		{
			get { return getValue<string>("createdtime"); }
			set { setValue<string>("createdtime", value); }
		}

		[Data]
		public string created
		{
			get { return getValue<string>("created"); }
			set { setValue<string>("created", value); }
		}

		[Data]
		public int karma
		{
			get { return getValue<int>("karma"); }
			set { setValue<int>("karma", value); }
		}

	}

	[DataDefinition(MustPersist = false)]
	public class page : Entity, IDataWrapper
	{
		public static partial class Fields
		{
			public const string id = "id";
			public const string type = "type";
			public const string number = "number";
			public const string last = "last";
			public const string previous = "previous";
		}

		void IDataWrapper.InitData(DataRow data, string namePrefix)
		{
			base.InitData(data, null);
		}

		[Data(IsPrimaryKey = true)]
		public string id
		{
			get { return getValue<string>("id"); }
			set { setValue<string>("id", value); }
		}

		[Data]
		public string type
		{
			get { return getValue<string>("type"); }
			set { setValue<string>("type", value); }
		}

		[Data]
		public int number
		{
			get { return getValue<int>("number"); }
			set { setValue<int>("number", value); }
		}

		[Data(DefaultValue = false)]
		public bool last
		{
			get { return getValue<bool>("last"); }
			set { setValue<bool>("last", value); }
		}

		[Data(DefaultValue = true)]
		public bool previous
		{
			get { return getValue<bool>("previous"); }
			set { setValue<bool>("previous", value); }
		}

	}

	[DataDefinition]
	[RelationPersistenceMode(SeparateTable = false)]
	public class comments : DataWrapper, IDataWrapper, IRelation
	{
		void IDataWrapper.InitData(DataRow data, string namePrefix)
		{
			base.InitData(data, null);
		}

		[RelationEnd(Type = typeof(item), Role = typeof(Roles.Child), Multiplicity = Multiplicity.ZeroOrMany)]
		public IEntity Child;

		[RelationEnd(Type = typeof(item), Role = typeof(Roles.Parent), Multiplicity = Multiplicity.One, FkNames = "ItemId")]
		public IEntity Parent;

	}

}


  
