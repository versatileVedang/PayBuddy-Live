using PayBuddy.Domain.BalanceDomain;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace PayBuddy.Web.Controllers.api
{
	public class BalanceController : ApiBaseController
	{
		public BalanceController(IBalanceDomain balanceDomain, IUow uow)
		{
			BalanceDomain = balanceDomain;
			Uow = uow;
		}

		[HttpGet]
		public IHttpActionResult Get()
		{
			return Ok(ShippingDomain.Get());

		}

		[HttpPost]
		public IHttpActionResult Post(Balance balance)
		{
			return Ok(BalanceDomain.Post(balance));
		}

		[HttpGet]
		[ActionName("getBalance")]
		public IHttpActionResult Get(int id)
		{
			var balance = Uow.Repository<Balance>().FirstOrDefault(s => s.UserId == id);

			if (balance != null)
			{
				return Ok(balance);
			}

			else
			{
				return Ok(false);
			}
		}
	}
}