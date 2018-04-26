using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.AccountDetailsDomain.Interface
{
	public interface IAccountDetailsDomain
	{
		IEnumerable<AccountDetail> Get();
		string Post(AccountDetail detail);
		string Put(AccountDetail detail);
		AccountDetail Getby(int id);
	}
}
