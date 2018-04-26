using PayBuddy.Domain.Models;
using PayBuddy.Domain.ShippingDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PayBuddy.Web.Controllers.api
{
	public class ShippingDetailController : ApiBaseController
	{
		public ShippingDetailController(IShippingDomain shippingDomain, IUow uow)
		{
			Uow = uow;
			ShippingDomain = shippingDomain;
		}

		[HttpGet]
		public IHttpActionResult GetBy(int id)
		{
			List<ShippingDetail> shippingList = new List<ShippingDetail>();
			var shippingDetails = Uow.Repository<ShippingDetail>().All();
			foreach (var item in shippingDetails)
			{
				if (item.UserId == id)
				{
					shippingList.Add(item);
				}
			}
			return Ok(shippingList);
		}

		[HttpPost]
		public IHttpActionResult Post(ShippingDetail ship)
		{
			return Ok(ShippingDomain.Post(ship));
		}
	}
}