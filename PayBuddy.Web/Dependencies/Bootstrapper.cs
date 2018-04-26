using Rx.Repository;
using StructureMap;
using PayBuddy.Infrastructure.UnitofWork;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Domain.UserDomain;
using PayBuddy.Domain.UserDomain.Interface;
using System.Web.Http;
using PayBuddy.Domain.AppUow;
using PayBuddy.Domain.AppUow.Interface;
using PayBuddy.Infrastructure.Security.Encryption;
using PayBuddy.Domain.AdminDomain.Interface;
using PayBuddy.Domain.AdminDomain;
using PayBuddy.Domain.CartDomain.Interface;
using PayBuddy.Domain.OrderDomain.Interface;
using PayBuddy.Domain.OrderDomain;
using PayBuddy.Domain.ShippingDomain.Interface;
using PayBuddy.Domain.ShippingDomain;
using PayBuddy.Domain.BalanceDomain;
using PayBuddy.Domain.WithdrawDomain.Interface;
using PayBuddy.Domain.WithdrawDomain;
using PayBuddy.Domain.DepositDomain.Interface;
using PayBuddy.Domain.DepositDomain;
using PayBuddy.Domain.AccountDetailsDomain;
using PayBuddy.Domain.AccountDetailsDomain.Interface;
using PayBuddy.Domain.CardDomain;
using PayBuddy.Domain.CardDomain.Interface;
using PayBuddy.Domain.HelpDeskDomain;
using PayBuddy.Domain.HelpDeskDomain.Interface;
using PayBuddy.Domain.OrderDetailsDomain.Interface;
using PayBuddy.Domain.OrderDetailsDomain;

namespace PayBuddy.Web.Dependencies
{
	public class Bootstrapper
	{
		public static void SetUp()
		{
			IContainer container = new Container(
							x =>
							{
								x.For<IRepositoryProvider>().Use<RepositoryProvider>();
								x.For<IUow>().Use<Uow>();
								x.For<IUserDomain>().Use<UserDomain>();
								x.For<IAppUow>().Use<AppUow>();
								x.For<IPasswordEncryption>().Use<PasswordEncryption>();
								x.For<IAdminDomain>().Use<AdminDomain>();
								x.For<ICartDomain>().Use<CartDomain>();
								x.For<IOrderDomain>().Use<OrderDomain>();
								x.For<IOrderDetailDomain>().Use<OrderDetailDomain>();
								x.For<IShippingDomain>().Use<ShippingDomain>();
								x.For<IBalanceDomain>().Use<BalanceDomain>();
								x.For<IWithdrawDomain>().Use<WithdrawDomain>();
								x.For<IDepositDomain>().Use<DepositDomain>();
								x.For<IAccountDetailsDomain>().Use<AccountDetailsDomain>();
								x.For<ICardDomain>().Use<CardDomain>();
								x.For<IHelpDeskDomain>().Use<HelpDeskDomain>();
							});

			GlobalConfiguration.Configuration.DependencyResolver = new ApplicationDependencyResolver(container);
		}
	}
}