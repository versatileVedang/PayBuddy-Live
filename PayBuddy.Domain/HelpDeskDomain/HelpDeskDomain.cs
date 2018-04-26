using PayBuddy.Domain.HelpDeskDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;

namespace PayBuddy.Domain.HelpDeskDomain
{
	public class HelpDeskDomain : BaseDomain, IHelpDeskDomain
	{
		public HelpDeskDomain(IUow uow)
		{
			Uow = uow;
		}

		public IEnumerable<HelpDesk> Get()
		{
			return Uow.Repository<HelpDesk>().All();
		}

		public string Post(HelpDesk desk)
		{
			try
			{
				if (desk != null)
				{
					Uow.Repository<HelpDesk>().Add(desk);
					Uow.Save();
					return "Query Submitted!!";
				}
				else
				{
					return "Error!!";
				}

			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}
	}
}
