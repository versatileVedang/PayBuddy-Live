using PayBuddy.Domain.OrderDomain.Interface;
using System;
using System.Collections.Generic;
using PayBuddy.Models;
using PayBuddy.Infrastructure.UnitofWork.Interface;


namespace PayBuddy.Domain.OrderDomain
{
	public class OrderDomain : BaseDomain, IOrderDomain
	{
		public OrderDomain(IUow uow)
		{
			Uow = uow;
		}

		public IEnumerable<Order> GetOrder()
		{
			return Uow.Repository<Order>().All();
		}

		public string Delete(Order order)
		{
			throw new NotImplementedException();
		}

		public Order GetBy(int id)
		{
			var data = Uow.Repository<Order>().FirstOrDefault(a => a.OrderId == id);
			return data;
		}

		public string Post(Order order)
		{
			try
			{
				if (order != null)
				{
					Uow.Repository<Order>().Add(order);
					Uow.Save();
					return "Order Placed";
				}
				else
				{
					return "Oops! Order failed!!";
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public string Put(Order order)
		{
			try
			{
				if (order != null)
				{
					Uow.Repository<Order>().Update(order);
					Uow.Save();
					return "order confirmed";
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
