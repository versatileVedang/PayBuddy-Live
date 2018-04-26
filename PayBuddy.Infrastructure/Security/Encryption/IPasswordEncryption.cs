using System;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Infrastructure.Security.Encryption
{
	public interface IPasswordEncryption
	{
		EncryptionResult Encrypt(string password);
		byte[] Encrypt(string password, Int32 salt);
		bool VerifyPassword(byte[] storedPassword, byte[] userPassword);
	}
}
