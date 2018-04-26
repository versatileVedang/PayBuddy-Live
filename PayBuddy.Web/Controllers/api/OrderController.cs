using PayBuddy.Domain.Models;
using PayBuddy.Domain.OrderDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using PayBuddy.Web.Controllers.MVC;
using Rx.Infrastructure.Extentions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;


namespace PayBuddy.Web.Controllers.api
{
	public class OrderController : ApiBaseController
	{
		public OrderController(IOrderDomain orderDomain, IUow uow)
		{
			Uow = uow;
			OrderDomain = orderDomain;
		}


		[HttpPost]
		public IHttpActionResult Post(Order order)
		{
			var date = DateTime.Now;
			order.OrderDate = date;
			var message = OrderDomain.Post(order);
			if (message == "Order Placed")
			{
				var orderList = Uow.Repository<Order>().All();
				foreach (var item in orderList)
				{
					if (item.UserId == order.UserId)
					{
						var dateDatabase = (item.OrderDate).ToString("hh:mm:ss tt");
						var dateController = date.ToString("hh:mm:ss tt");

						if (dateDatabase == dateController)
						{
							return Ok(new { message = message, data = item.OrderId });
						}
					}
				}
				return Ok("error");
			}
			else
			{
				return Ok(new { message = "order not placed" });
			}
		}
	}
}

