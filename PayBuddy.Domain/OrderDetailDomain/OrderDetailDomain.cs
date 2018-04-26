using PayBuddy.Domain.OrderDetailsDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;

namespace PayBuddy.Domain.OrderDetailsDomain
{
	public class OrderDetailDomain : BaseDomain, IOrderDetailDomain
	{
		public OrderDetailDomain(IUow uow)
		{
			Uow = uow;
		}

		public IEnumerable<OrderDetail> Get()
		{
			return Uow.Repository<OrderDetail>().All();
		}

		public OrderDetail Getby(int id)
		{
			var orderDetail = Uow.Repository<OrderDetail>().FirstOrDefault(o => o.OrderId == id);
			return orderDetail;
		}

		public string Post(List<OrderDetail> orderDetail)
		{
			try
			{
				if (orderDetail != null)
				{
					Uow.Repository<OrderDetail>().AddRange(orderDetail);
					Uow.Save();
					return "Order Placed!!";
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
