using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.OrderDetailsDomain.Interface
{
	public interface IOrderDetailDomain
	{
		IEnumerable<OrderDetail> Get();
		string Post(List<OrderDetail> details);
		OrderDetail Getby(int id);
	}
}
