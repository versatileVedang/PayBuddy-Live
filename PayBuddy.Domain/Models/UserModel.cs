using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.Models
{
	public class UserModel
	{
		public int UserId { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public string Password { get; set; }

		public long Contact { get; set; }

		public string Address { get; set; }

        public decimal Balance { get; set; }

        public int RoleId { get; set; }

		public int GenderId { get; set; }

        public int Salt { get; set; }
	}
}
