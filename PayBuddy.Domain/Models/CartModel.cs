using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.Models
{
	public class CartListModel
	{
		public List<CartModel> cartModel { get; set; }
	}

	public class CartModel
	{
		public int CartId { get; set; }

		public int ProductId { get; set; }

		public int discountId { get; set; }

		public int expr1 { get; set; }

		public string ProductName { get; set; }

		public string ProductImageBaseString { get; set; }

		public string ProductDescription { get; set; }

		public int Quantity { get; set; }

		public decimal Discount { get; set; }

		public decimal Cost { get; set; }

		public decimal SubTotal { get; set; }

		public int UserId { get; set; }
	}
}
