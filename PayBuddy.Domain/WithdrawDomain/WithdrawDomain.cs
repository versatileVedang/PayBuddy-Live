using PayBuddy.Domain.WithdrawDomain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;
using PayBuddy.Infrastructure.UnitofWork.Interface;

namespace PayBuddy.Domain.WithdrawDomain
{
	public class WithdrawDomain : BaseDomain, IWithdrawDomain
	{
		public WithdrawDomain(IUow uow)
		{
			Uow = uow;
		}

		public IEnumerable<Withdrawal> Get()
		{
			return Uow.Repository<Withdrawal>().All();
		}



		public Withdrawal GetbyId(int id)
		{
			var transaction = Uow.Repository<Withdrawal>().FirstOrDefault(t => t.WithdrawalId == id);
			return transaction;

		}

		public string Post(Withdrawal withdrawal)
		{
			try
			{
				if (withdrawal != null)
				{
					Uow.Repository<Withdrawal>().Add(withdrawal);
					Uow.Save();
					return "Withdrawal Successfull!!";
				}
				else
				{
					return "Withdrawal Unsuccessful!!";
				}
			}
			catch (Exception x)
			{
				return x.Message;
			}
		}
	}

}
