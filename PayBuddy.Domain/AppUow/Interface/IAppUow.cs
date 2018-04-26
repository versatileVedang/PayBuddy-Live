using PayBuddy.Infrastructure.Security.Encryption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.AppUow.Interface
{
	public interface IAppUow
	{
		IPasswordEncryption PasswordEncryption { get; }
	}
}
