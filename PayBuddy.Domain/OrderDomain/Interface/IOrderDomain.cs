using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.OrderDomain.Interface
{
	public interface IOrderDomain
	{
		IEnumerable<Order> GetOrder();
		string Post(Order order);
		string Delete(Order order);
		string Put(Order order);
		Order GetBy(int id);

	}
}
