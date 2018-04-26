using PayBuddy.Domain.AccountDetailsDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;

namespace PayBuddy.Domain.AccountDetailsDomain
{
	public class AccountDetailsDomain : BaseDomain, IAccountDetailsDomain
	{
		public AccountDetailsDomain(IUow uow)
		{
			Uow = uow;
		}

		public IEnumerable<AccountDetail> Get()
		{
			return Uow.Repository<AccountDetail>().All();
		}

		public string Post(AccountDetail detail)
		{
			try
			{
				if (detail != null)
				{
					Uow.Repository<AccountDetail>().Add(detail);
					Uow.Save();
					return "Account Updated!!";
				}
				else
				{
					return "Account not Updated!!";
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public AccountDetail Getby(int id)
		{
			var transaction = Uow.Repository<AccountDetail>().FirstOrDefault(t => t.AccountId == id);
			return transaction;

		}

		public string Put(AccountDetail detail)
		{
			try
			{
				if (detail != null)
				{
					Uow.Repository<AccountDetail>().Update(detail);
					Uow.Save();
					return "Account Updated!!";
				}
				else
				{
					return "Account not Updated!!";
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}

		}
	}
}
