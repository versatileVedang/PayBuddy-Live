using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.CardDomain.Interface
{
	public interface ICardDomain
	{
		IEnumerable<Card> GetItem();
		string Post(Card card);
		string Delete(Card card);
		string Put(Card card);
		Card GetBy(int id);
	}
}
