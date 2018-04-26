using PayBuddy.Domain.AccountDetailsDomain;
using PayBuddy.Domain.AccountDetailsDomain.Interface;
using PayBuddy.Domain.BalanceDomain;
using PayBuddy.Domain.Models;
using PayBuddy.Domain.WithdrawDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PayBuddy.Web.Controllers.api
{
	public class WithdrawController : ApiBaseController
	{
		public WithdrawController(IWithdrawDomain withdrawal, IUow uow, IBalanceDomain balanceDomain, IAccountDetailsDomain accountDomain)
		{
			Uow = uow;
			WithdrawDomain = withdrawal;
			BalanceDomain = balanceDomain;
			AccountDetailsDomain = accountDomain;
		}

		[HttpGet]
		public IHttpActionResult Get()
		{
			return Ok(WithdrawDomain.Get());
		}

		[HttpPost]
		public IHttpActionResult Post(WithdrawModel withdraw)
		{
			Withdrawal withdrawTemp = new Withdrawal();
			var balance = Uow.Repository<Balance>().FirstOrDefault(a => a.UserId == withdraw.UserId);
			if (withdraw.Amount <= balance.BalanceAmount)
			{
				var account = Uow.Repository<AccountDetail>().FirstOrDefault(a => a.AccountNumber == withdraw.AccountNumber);
				var branch = Uow.Repository<BankBranch>().FirstOrDefault(a => (a.IFSC_Code == withdraw.IFSC) && (a.Bank.BankId == withdraw.BankId));
				if (account != null && branch != null)
				{
					if (account.BankBranchId == branch.BankBranchId)
					{
						withdrawTemp.AccountId = account.AccountId;
						withdrawTemp.WithdrawalAmount = withdraw.Amount;
						withdrawTemp.UserId = withdraw.UserId;
						withdrawTemp.BankId = withdraw.BankId;
						var date = DateTime.Now;
						withdrawTemp.WithdrawDate = date;
						withdrawTemp.WithdrawStatus = true;
						withdrawTemp.BalanceId = balance.BalanceId;
						withdrawTemp.Comment = withdraw.Comment;

						var withdrawMessage = WithdrawDomain.Post(withdrawTemp);
						if (withdrawMessage == "Withdrawal Successfull!!")
						{
							var tempBalance = BalanceDomain.GetBy(withdraw.UserId);
							tempBalance.BalanceAmount = tempBalance.BalanceAmount - withdraw.Amount;
							var accountDetail = AccountDetailsDomain.Getby(account.AccountId);
							accountDetail.AccountBalance = accountDetail.AccountBalance + withdraw.Amount;
							BalanceDomain.Put(tempBalance);
							AccountDetailsDomain.Put(accountDetail);
							return Ok("successfull");
						}
						return Ok("not successfull");
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
			return Ok(WithdrawDomain.GetbyId(id));
		}
	}
}
