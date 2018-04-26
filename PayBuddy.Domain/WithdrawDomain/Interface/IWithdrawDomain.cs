using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.WithdrawDomain.Interface
{
	public interface IWithdrawDomain
	{
		IEnumerable<Withdrawal> Get();
		string Post(Withdrawal withdrawal);
		Withdrawal GetbyId(int id);

	}
}
