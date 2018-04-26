using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.Models
{
	public class WithdrawModel
	{
		public string AccountHolderName { get; set; }

		public string IFSC { get; set; }

		public string AccountNumber { get; set; }

		public int BankId { get; set; }

		public decimal Amount { get; set; }

		public int UserId { get; set; }

		public string Comment { get; set; }
	}
}
