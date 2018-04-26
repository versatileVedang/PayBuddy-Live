using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.Models
{
	public class OrderDetailsModel
	{
		public int OrderId { get; set; }

		public int UserId { get; set; }

		public string CardNumber { get; set; }

		public int CVV { get; set; }

		public int CardCompanyId { get; set; }

		public decimal Amount { get; set; }

		public int ExpiryMonth { get; set; }

		public int ExpiryYear { get; set; }

		public int PaymentTypeId { get; set; }
	}
}
