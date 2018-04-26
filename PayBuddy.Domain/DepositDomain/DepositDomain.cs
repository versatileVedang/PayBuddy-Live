using PayBuddy.Domain.DepositDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;

namespace PayBuddy.Domain.DepositDomain
{
	public class DepositDomain : BaseDomain, IDepositDomain
	{
		public DepositDomain(IUow uow)
		{
			Uow = uow;
		}

		public IEnumerable<Deposit> Get()
		{
			return Uow.Repository<Deposit>().All();
		}

		public Deposit GetBy(int id)
		{
			var deposit = Uow.Repository<Deposit>().FirstOrDefault(d => d.DepositId == id);
			return deposit;
		}

		public string Post(Deposit deposit)
		{
			try
			{
				if (deposit != null)
				{
					Uow.Repository<Deposit>().Add(deposit);
					Uow.Save();
					return "Deposit Successful!";
				}
				else
				{
					return "Deposit Failed!";
				}

			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}
	}
}
