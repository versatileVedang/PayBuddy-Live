using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Infrastructure.Security.Encryption
{
	public class EncryptionResult
	{
	
		public byte[] PasswordHash { get; set; }

		/// <summary>
		/// Gets or sets the generated salt for password encryption
		/// </summary>
		public Int32 Salt { get; set; }
	}
}
