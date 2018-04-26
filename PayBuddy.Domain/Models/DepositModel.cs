using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.Models
{
	public class DepositModel
	{
		public int DepositId { get; set; }

		public int UserId { get; set; }

		public int DepositTypeId { get; set; }

		public long CardNumber { get; set; }

		public int CVV { get; set; }

		public decimal DepositAmount { get; set; }

		public DateTime DepositDate { get; set; }

		public string AccountHolderName { get; set; }

		public string AccountNumber { get; set; }

		public string IFSC { get; set; }

		public int BankId { get; set; }

		public int DepositStatus { get; set; }

	}
}
