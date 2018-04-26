using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.BalanceDomain
{
	public interface IBalanceDomain
	{
		string Post(Balance balance);
		IEnumerable<Balance> Get();
		Balance GetBy(int id);
		string Put(Balance balance);
	}
}
