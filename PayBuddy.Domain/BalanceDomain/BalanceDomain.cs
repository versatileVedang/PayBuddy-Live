using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;
using PayBuddy.Infrastructure.UnitofWork.Interface;

namespace PayBuddy.Domain.BalanceDomain
{
	public class BalanceDomain : BaseDomain, IBalanceDomain
	{
		public BalanceDomain(IUow uow)
		{
			Uow = uow;
		}
		public IEnumerable<Balance> Get()
		{
			return Uow.Repository<Balance>().All();
		}

		public Balance GetBy(int id)
		{
			var detail = Uow.Repository<Balance>().FirstOrDefault(s => s.UserId == id);
			return detail;
		}

		public string Post(Balance balance)
		{
			try
			{
				if (balance != null)
				{
					Uow.Repository<Balance>().Add(balance);
					Uow.Save();
					return "Balance is Updated Successfully";
				}
				else
				{
					return "Balance is not Updated Successfully";
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}

		}

		public string Put(Balance balance)
		{
			try
			{
				if (balance != null)
				{
					Uow.Repository<Balance>().Update(balance);
					Uow.Save();
					return "Item Updated.";
				}
				else
				{
					return "error";
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}
	}
}
