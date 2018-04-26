using PayBuddy.Domain.HelpDeskDomain.Interface;
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
	public class HelpDeskController : ApiBaseController
	{
		public HelpDeskController(IUow uow, IHelpDeskDomain helpdeskDomain)
		{
			Uow = uow;
			HelpDeskDomain = helpdeskDomain;
		}

		[HttpGet]
		public IHttpActionResult Get()
		{
			return Ok(HelpDeskDomain.Get());
		}

		public IHttpActionResult Post(HelpDesk desk)
		{
			return Ok(HelpDeskDomain.Post(desk));
		}
	}
}
