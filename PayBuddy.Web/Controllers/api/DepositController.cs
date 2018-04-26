using PayBuddy.Domain.AccountDetailsDomain;
using PayBuddy.Domain.AccountDetailsDomain.Interface;
using PayBuddy.Domain.BalanceDomain;
using PayBuddy.Domain.CardDomain.Interface;
using PayBuddy.Domain.DepositDomain;
using PayBuddy.Domain.DepositDomain.Interface;
using PayBuddy.Domain.Models;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using System;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace PayBuddy.Web.Controllers.api
{
	public class DepositController : ApiBaseController
	{
		public DepositController(IUow uow, IDepositDomain depositDomain, IBalanceDomain balanceDomain, IAccountDetailsDomain accountDomain, ICardDomain cardDomain)
		{
			Uow = uow;
			DepositDomain = depositDomain;
			BalanceDomain = balanceDomain;
			AccountDetailsDomain = accountDomain;
			CardDomain = cardDomain;
		}

		public static string Encrypt(string toEncrypt, bool useHashing)
		{
			byte[] keyArray;
			byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);

			System.Configuration.AppSettingsReader settingsReader = new AppSettingsReader();

			// Get the key from config file

			string key = (string)settingsReader.GetValue("SecurityKey",
															 typeof(String));
			//System.Windows.Forms.MessageBox.Show(key);
			//If hashing use get hashcode regards to your key
			if (useHashing)
			{
				MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
				keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
				//Always release the resources and flush data
				// of the Cryptographic service provide. Best Practice

				hashmd5.Clear();
			}
			else
				keyArray = UTF8Encoding.UTF8.GetBytes(key);

			TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
			//set the secret key for the tripleDES algorithm
			tdes.Key = keyArray;
			//mode of operation. there are other 4 modes.
			//We choose ECB(Electronic code Book)
			tdes.Mode = CipherMode.ECB;
			//padding mode(if any extra byte added)

			tdes.Padding = PaddingMode.PKCS7;

			ICryptoTransform cTransform = tdes.CreateEncryptor();
			//transform the specified region of bytes array to resultArray
			byte[] resultArray =
			  cTransform.TransformFinalBlock(toEncryptArray, 0,
			  toEncryptArray.Length);
			//Release resources held by TripleDes Encryptor
			tdes.Clear();
			//Return the encrypted data into unreadable string format
			return Convert.ToBase64String(resultArray, 0, resultArray.Length);
		}

		[HttpGet]
		public IHttpActionResult Get()
		{
			return Ok(DepositDomain.Get());
		}

		[HttpPost]
		public IHttpActionResult Post(DepositModel deposit)
		{
			//while (true)
			//{
			//	Card card = new Card();
			//	card.CardTypeId = 7;
			//	card.CardCompanyId = 9;
			//	card.CardHolderName = "shail";
			//	card.CardNumber = Encrypt("1212121212121212", true);
			//	card.Cvv = 200;
			//	card.ExpiryMonth = 12;
			//	card.ExpiryYear = 24;
			//	card.AccountId = 10;
			//}

			if ((deposit.DepositTypeId == 6) || (deposit.DepositTypeId == 7))
			{
				Card cartObj = new Card();
				var encrypt = Encrypt((deposit.CardNumber).ToString(), true);
				var card = Uow.Repository<Card>().FirstOrDefault(c => (c.CardNumber == encrypt) && (c.Cvv == deposit.CVV));
				var balance = BalanceDomain.GetBy(19);
				if (card != null)
				{
					if (card.Amount >= deposit.DepositAmount)
					{
						Deposit depositObj = new Deposit();
						depositObj.UserId = 19;
						depositObj.DepositStatus = true;
						if (deposit.DepositTypeId == 6)
						{
							depositObj.DepositTypeId = 3;
						}
						else
						{
							depositObj.DepositTypeId = 4;
						}
						var date = DateTime.Now;
						depositObj.DepositDate = date;
						depositObj.AccountId = card.AccountId;
						depositObj.BalanceId = balance.BalanceId;
						depositObj.DepositAmount = deposit.DepositAmount;
						var depositMessage = DepositDomain.Post(depositObj);

						if (depositMessage == "Deposit Successful!")
						{
							balance.BalanceAmount = balance.BalanceAmount + deposit.DepositAmount;
							card.Amount = card.Amount - deposit.DepositAmount;
							BalanceDomain.Put(balance);
							CardDomain.Put(card);
							return Ok("successfull");
						}
						else
						{
							return Ok("error");
						}

					}
					else
					{
						return Ok("error");
					}

				}
				else
				{
					return Ok("error");
				}

			}
			else if (deposit.DepositTypeId == 5)
			{
				var branch = Uow.Repository<BankBranch>().FirstOrDefault(b => b.IFSC_Code == deposit.IFSC);
				var account = Uow.Repository<AccountDetail>().FirstOrDefault(a => (a.AccountNumber == deposit.AccountNumber) && (a.BankBranchId == branch.BankBranchId));
				if (account != null)
				{
					if (account.AccountBalance >= deposit.DepositAmount)
					{
						Deposit depositObj = new Deposit();
						var date = DateTime.Now;
						depositObj.DepositDate = date;
						depositObj.UserId = deposit.UserId;
						depositObj.DepositStatus = true;
						depositObj.DepositTypeId = deposit.DepositTypeId;
						depositObj.AccountId = account.AccountId;
						var balance = BalanceDomain.GetBy(deposit.UserId);
						depositObj.BalanceId = balance.BalanceId;
						depositObj.DepositAmount = deposit.DepositAmount;
						var depositMessage = DepositDomain.Post(depositObj);

						if (depositMessage == "Deposit Successful!")
						{
							account.AccountBalance = account.AccountBalance - deposit.DepositAmount;
							AccountDetailsDomain.Put(account);
							balance.BalanceAmount = balance.BalanceAmount + deposit.DepositAmount;
							BalanceDomain.Put(balance);
							return Ok("successfull");
						}
						else
						{
							return Ok("error");
						}
					}
					else
					{
						return Ok("error");
					}
				}
				else
				{
					return Ok("error");
				}


			}
			else
			{
				return Ok("error");
			}
		}

		[HttpGet]
		public IHttpActionResult Getby(int id)
		{
			var deposit = Uow.Repository<Deposit>().FirstOrDefault(d => d.DepositId == id);
			return Ok(deposit);

		}
	}
}
