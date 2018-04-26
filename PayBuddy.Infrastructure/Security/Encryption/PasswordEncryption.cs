using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Infrastructure.Security.Encryption
{
	public class PasswordEncryption : IPasswordEncryption
	{
		/// <summary>
		/// Encrypts a password and returns its hash and the salt (number)
		/// that was used to generate the hash.
		/// </summary>
		/// <param name="password"></param>
		/// <returns></returns>
		public virtual EncryptionResult Encrypt(string password)
		{
			EncryptionResult result = new EncryptionResult();

			// generate salt - 32-bit number
			Random rndm = new Random();
			result.Salt = rndm.Next();

			// combine the passwsssord and salt
			byte[] combinedPasswordAndSalt = CombinePasswordAndSalt(password, result.Salt);

			// generate hash
			SHA1CryptoServiceProvider crypto = new SHA1CryptoServiceProvider();
			result.PasswordHash = crypto.ComputeHash(combinedPasswordAndSalt);

			return result;
		}

		/// <summary>
		/// Encrypts the password using the provided salt and returns the hash.
		/// </summary>
		/// <param name="password"></param>
		/// <param name="salt"></param>
		/// <returns></returns>
		public virtual byte[] Encrypt(string password, Int32 salt)
		{
			byte[] combinedPasswordAndSalt = CombinePasswordAndSalt(password, salt);

			SHA1CryptoServiceProvider crypto = new SHA1CryptoServiceProvider();
			byte[] result = crypto.ComputeHash(combinedPasswordAndSalt);

			return result;
		}

		private byte[] CombinePasswordAndSalt(string password, Int32 salt)
		{
			byte[] byteSalt = BitConverter.GetBytes(salt);
			byte[] bytePassword = Encoding.Unicode.GetBytes(password);

			byte[] result = new byte[bytePassword.Length + byteSalt.Length];

			Array.Copy(bytePassword, 0, result, 0, bytePassword.Length);
			Array.Copy(byteSalt, 0, result, bytePassword.Length, byteSalt.Length);

			return result;
		}

		public bool VerifyPassword(byte[] storedPassword, byte[] userPassword)
		{
			for (var i = 0; i < storedPassword.Length; i++)
			{
				if (userPassword[i] != storedPassword[i])
				{
					return false;
				}
			}
			return true;
		}
	}
}
