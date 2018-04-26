using PayBuddy.Domain.AppUow.Interface;
using PayBuddy.Infrastructure.Security.Encryption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.AppUow
{
	public class AppUow  : IAppUow
	{
        public AppUow(IPasswordEncryption passwordEncryption)
        {
            PasswordEncryption = passwordEncryption;
        }
		public IPasswordEncryption PasswordEncryption
		{
            get;set;
		}
	}
}
