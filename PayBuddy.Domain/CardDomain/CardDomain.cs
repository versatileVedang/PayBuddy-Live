using PayBuddy.Domain.CardDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;

namespace PayBuddy.Domain.CardDomain
{
	public class CardDomain : BaseDomain, ICardDomain
	{
		public CardDomain(IUow uow)
		{
			Uow = uow;
		}

		public IEnumerable<Card> GetItem()
		{
			return Uow.Repository<Card>().All();
		}

		public Card GetBy(int id)
		{
			var data = Uow.Repository<Card>().FirstOrDefault(a => a.CardId == id);
			return data;
		}

		public string Post(Card card)        //Post
		{
			try
			{
				if (card != null)
				{
					Uow.Repository<Card>().Add(card);
					Uow.Save();
					return "Item Added";
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

		public string Delete(Card card)       //Delete
		{
			try
			{
				if (card != null)
				{
					Uow.Repository<Card>().Delete(card);
					Uow.Save();
					return "Item Deleted.";
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

		public string Put(Card card)
		{
			try
			{
				if (card != null)
				{
					Uow.Repository<Card>().Update(card);
					Uow.Save();
					return "Item Updated.";
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
