using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.DepositDomain.Interface
{
	public interface IDepositDomain
	{
		IEnumerable<Deposit> Get();
		string Post(Deposit deposit);
		Deposit GetBy(int id);
	}
}
