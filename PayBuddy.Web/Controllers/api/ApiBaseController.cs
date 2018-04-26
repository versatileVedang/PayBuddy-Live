using PayBuddy.Domain.AccountDetailsDomain.Interface;
using PayBuddy.Domain.AdminDomain.Interface;
using PayBuddy.Domain.AppUow.Interface;
using PayBuddy.Domain.BalanceDomain;
using PayBuddy.Domain.CardDomain.Interface;
using PayBuddy.Domain.CartDomain.Interface;
using PayBuddy.Domain.DepositDomain.Interface;
using PayBuddy.Domain.HelpDeskDomain.Interface;
using PayBuddy.Domain.OrderDetailsDomain.Interface;
using PayBuddy.Domain.OrderDomain.Interface;
using PayBuddy.Domain.ShippingDomain.Interface;
using PayBuddy.Domain.UserDomain.Interface;
using PayBuddy.Domain.WithdrawDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using System;
using System.Web.Http;

namespace PayBuddy.Web.Controllers.api
{
    public class ApiBaseController : ApiController, IDisposable
	{

		public IUow Uow { get; set; }

		public IAppUow AppUow { get; set; }

        public IUserDomain UserDomain { get; set; }

        public IAdminDomain AdminDomain { get;  set; }

        public ICartDomain CartDomain { get; set; }

        public IShippingDomain ShippingDomain { get; set; }

        public IBalanceDomain BalanceDomain { get; set; }

		public ICardDomain CardDomain { get; set; }

		public IDepositDomain DepositDomain { get; set; }

		public IWithdrawDomain WithdrawDomain { get; set; }

		public IOrderDomain OrderDomain { get; set; }

		public IOrderDetailDomain OrderDetailDomain { get; set; }

		public IAccountDetailsDomain AccountDetailsDomain { get; set; }

		public IHelpDeskDomain HelpDeskDomain { get; set; }

		void IDisposable.Dispose()
		{
			this.Dispose(true);
		}
		public static string GetyyyyMMddString()
		{
			return DateTime.UtcNow.ToString("yyyyMMdd");
		}
	}
}
