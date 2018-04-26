namespace PayBuddy.Models
{
	using System;
	using System.Data.Entity;
	using System.ComponentModel.DataAnnotations.Schema;
	using System.Linq;

	public partial class PayBuddyDbContext : DbContext
	{
		public PayBuddyDbContext()
			: base("name=PayBuddyDbContext")
		{
		}

		public virtual DbSet<AccountDetail> AccountDetails { get; set; }
		public virtual DbSet<ApplicationObject> ApplicationObjects { get; set; }
		public virtual DbSet<ApplicationObjectType> ApplicationObjectTypes { get; set; }
		public virtual DbSet<Balance> Balances { get; set; }
		public virtual DbSet<BankBranch> BankBranches { get; set; }
		public virtual DbSet<Bank> Banks { get; set; }
		public virtual DbSet<Brand> Brands { get; set; }
		public virtual DbSet<Card> Cards { get; set; }
		public virtual DbSet<Cart> Carts { get; set; }
		public virtual DbSet<Category> Categories { get; set; }
		public virtual DbSet<Deposit> Deposits { get; set; }
		public virtual DbSet<Discount> Discounts { get; set; }
		public virtual DbSet<Except> Excepts { get; set; }
		public virtual DbSet<HelpDesk> HelpDesks { get; set; }
		public virtual DbSet<OrderDetail> OrderDetails { get; set; }
		public virtual DbSet<Order> Orders { get; set; }
		public virtual DbSet<Product> Products { get; set; }
		public virtual DbSet<ReceivedLog> ReceivedLogs { get; set; }
		public virtual DbSet<Role> Roles { get; set; }
		public virtual DbSet<ShippingDetail> ShippingDetails { get; set; }
		public virtual DbSet<SubCategory> SubCategories { get; set; }
		public virtual DbSet<Transfer_ReceiveLog> Transfer_ReceiveLog { get; set; }
		public virtual DbSet<TransferLog> TransferLogs { get; set; }
		public virtual DbSet<User> Users { get; set; }
		public virtual DbSet<Withdrawal> Withdrawals { get; set; }
		public virtual DbSet<vCartCount> vCartCounts { get; set; }
		public virtual DbSet<vCartProduct> vCartProducts { get; set; }
		public virtual DbSet<vCategoryProduct> vCategoryProducts { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			modelBuilder.Entity<AccountDetail>()
				.Property(e => e.AccountNumber)
				.IsUnicode(false);

			modelBuilder.Entity<AccountDetail>()
				.Property(e => e.AccountName)
				.IsUnicode(false);

			modelBuilder.Entity<AccountDetail>()
				.Property(e => e.AccountBalance)
				.HasPrecision(9, 2);

			modelBuilder.Entity<AccountDetail>()
				.HasMany(e => e.Cards)
				.WithRequired(e => e.AccountDetail)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<AccountDetail>()
				.HasMany(e => e.Deposits)
				.WithRequired(e => e.AccountDetail)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<AccountDetail>()
				.HasMany(e => e.Withdrawals)
				.WithRequired(e => e.AccountDetail)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<ApplicationObject>()
				.Property(e => e.ApplicationObjectName)
				.IsUnicode(false);

			modelBuilder.Entity<ApplicationObject>()
				.HasMany(e => e.Cards)
				.WithRequired(e => e.ApplicationObject)
				.HasForeignKey(e => e.CardCompanyId)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<ApplicationObject>()
				.HasMany(e => e.Cards1)
				.WithRequired(e => e.ApplicationObject1)
				.HasForeignKey(e => e.CardTypeId)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<ApplicationObject>()
				.HasOptional(e => e.ApplicationObjects1)
				.WithRequired(e => e.ApplicationObject1);

			modelBuilder.Entity<ApplicationObject>()
				.HasMany(e => e.Cards2)
				.WithRequired(e => e.ApplicationObject2)
				.HasForeignKey(e => e.ExpiryYear)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<ApplicationObject>()
				.HasMany(e => e.Cards3)
				.WithRequired(e => e.ApplicationObject3)
				.HasForeignKey(e => e.ExpiryMonth)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<ApplicationObject>()
				.HasMany(e => e.Deposits)
				.WithRequired(e => e.ApplicationObject)
				.HasForeignKey(e => e.DepositTypeId)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<ApplicationObjectType>()
				.Property(e => e.ApplicationObjectTypeName)
				.IsUnicode(false);

			modelBuilder.Entity<ApplicationObjectType>()
				.HasMany(e => e.ApplicationObjects)
				.WithRequired(e => e.ApplicationObjectType)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Balance>()
				.Property(e => e.BalanceAmount)
				.HasPrecision(9, 2);

			modelBuilder.Entity<Balance>()
				.HasMany(e => e.Deposits)
				.WithRequired(e => e.Balance)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Balance>()
				.HasMany(e => e.Withdrawals)
				.WithRequired(e => e.Balance)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<BankBranch>()
				.Property(e => e.BankBranchName)
				.IsUnicode(false);

			modelBuilder.Entity<BankBranch>()
				.HasMany(e => e.AccountDetails)
				.WithRequired(e => e.BankBranch)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Bank>()
				.Property(e => e.BankName)
				.IsUnicode(false);

			modelBuilder.Entity<Bank>()
				.HasMany(e => e.BankBranches)
				.WithRequired(e => e.Bank)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Bank>()
				.HasMany(e => e.Withdrawals)
				.WithRequired(e => e.Bank)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Brand>()
				.Property(e => e.BrandName)
				.IsUnicode(false);

			modelBuilder.Entity<Brand>()
				.HasMany(e => e.Products)
				.WithRequired(e => e.Brand)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Card>()
				.Property(e => e.CardHolderName)
				.IsUnicode(false);

			modelBuilder.Entity<Card>()
				.Property(e => e.CardNumber)
				.IsUnicode(false);

			modelBuilder.Entity<Card>()
				.Property(e => e.Amount)
				.HasPrecision(9, 2);

			modelBuilder.Entity<Cart>()
				.Property(e => e.SubTotal)
				.HasPrecision(9, 2);

			modelBuilder.Entity<Category>()
				.Property(e => e.CategoryName)
				.IsUnicode(false);

			modelBuilder.Entity<Category>()
				.HasMany(e => e.SubCategories)
				.WithRequired(e => e.Category)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Deposit>()
				.Property(e => e.DepositAmount)
				.HasPrecision(9, 2);

			modelBuilder.Entity<Discount>()
				.Property(e => e.Percentage)
				.HasPrecision(5, 2);

			modelBuilder.Entity<Discount>()
				.HasMany(e => e.OrderDetails)
				.WithRequired(e => e.Discount)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Discount>()
				.HasMany(e => e.Products)
				.WithRequired(e => e.Discount)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Except>()
				.Property(e => e.InnerException)
				.IsUnicode(false);

			modelBuilder.Entity<Except>()
				.Property(e => e.Message)
				.IsUnicode(false);

			modelBuilder.Entity<Except>()
				.Property(e => e.Data)
				.IsUnicode(false);

			modelBuilder.Entity<HelpDesk>()
				.Property(e => e.FirstName)
				.IsUnicode(false);

			modelBuilder.Entity<HelpDesk>()
				.Property(e => e.LastName)
				.IsUnicode(false);

			modelBuilder.Entity<HelpDesk>()
				.Property(e => e.Title)
				.IsUnicode(false);

			modelBuilder.Entity<HelpDesk>()
				.Property(e => e.DescriptionText)
				.IsUnicode(false);

			modelBuilder.Entity<OrderDetail>()
				.Property(e => e.SubTotal)
				.HasPrecision(9, 2);

			modelBuilder.Entity<Order>()
				.Property(e => e.Amount)
				.HasPrecision(9, 2);

			modelBuilder.Entity<Order>()
				.Property(e => e.OrderStatus)
				.IsFixedLength();

			modelBuilder.Entity<Order>()
				.HasMany(e => e.OrderDetails)
				.WithRequired(e => e.Order)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Product>()
				.Property(e => e.ProductName)
				.IsUnicode(false);

			modelBuilder.Entity<Product>()
				.Property(e => e.ProductDescription)
				.IsUnicode(false);

			modelBuilder.Entity<Product>()
				.Property(e => e.Cost)
				.HasPrecision(8, 2);

			modelBuilder.Entity<Product>()
				.Property(e => e.Comment)
				.IsUnicode(false);

			modelBuilder.Entity<Product>()
				.HasMany(e => e.Carts)
				.WithRequired(e => e.Product)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Product>()
				.HasMany(e => e.OrderDetails)
				.WithRequired(e => e.Product)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<ReceivedLog>()
				.Property(e => e.ReceivedAmount)
				.HasPrecision(9, 2);

			modelBuilder.Entity<ReceivedLog>()
				.HasMany(e => e.Transfer_ReceiveLog)
				.WithRequired(e => e.ReceivedLog)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Role>()
				.Property(e => e.RoleName)
				.IsUnicode(false);

			modelBuilder.Entity<Role>()
				.HasMany(e => e.Users)
				.WithRequired(e => e.Role)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<ShippingDetail>()
				.Property(e => e.FirstName)
				.IsUnicode(false);

			modelBuilder.Entity<ShippingDetail>()
				.Property(e => e.LastName)
				.IsUnicode(false);

			modelBuilder.Entity<ShippingDetail>()
				.Property(e => e.ShippingAddress)
				.IsUnicode(false);

			modelBuilder.Entity<ShippingDetail>()
				.Property(e => e.State)
				.IsUnicode(false);

			modelBuilder.Entity<ShippingDetail>()
				.Property(e => e.Country)
				.IsUnicode(false);

			modelBuilder.Entity<ShippingDetail>()
				.HasMany(e => e.Orders)
				.WithRequired(e => e.ShippingDetail)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<SubCategory>()
				.Property(e => e.SubCategoryName)
				.IsUnicode(false);

			modelBuilder.Entity<SubCategory>()
				.HasMany(e => e.Products)
				.WithRequired(e => e.SubCategory)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<TransferLog>()
				.Property(e => e.TransferAmount)
				.HasPrecision(9, 2);

			modelBuilder.Entity<TransferLog>()
				.HasMany(e => e.Transfer_ReceiveLog)
				.WithRequired(e => e.TransferLog)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<User>()
				.Property(e => e.FirstName)
				.IsUnicode(false);

			modelBuilder.Entity<User>()
				.Property(e => e.LastName)
				.IsUnicode(false);

			modelBuilder.Entity<User>()
				.Property(e => e.Email)
				.IsUnicode(false);

			modelBuilder.Entity<User>()
				.Property(e => e.Address)
				.IsUnicode(false);

			modelBuilder.Entity<User>()
				.HasOptional(e => e.Balance)
				.WithRequired(e => e.User);

			modelBuilder.Entity<User>()
				.HasMany(e => e.Carts)
				.WithRequired(e => e.User)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<User>()
				.HasMany(e => e.Deposits)
				.WithRequired(e => e.User)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<User>()
				.HasMany(e => e.Orders)
				.WithRequired(e => e.User)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<User>()
				.HasMany(e => e.ReceivedLogs)
				.WithRequired(e => e.User)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<User>()
				.HasMany(e => e.ShippingDetails)
				.WithRequired(e => e.User)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<User>()
				.HasMany(e => e.Withdrawals)
				.WithRequired(e => e.User)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Withdrawal>()
				.Property(e => e.WithdrawalAmount)
				.HasPrecision(9, 2);

			modelBuilder.Entity<Withdrawal>()
				.Property(e => e.Comment)
				.IsUnicode(false);

			modelBuilder.Entity<vCartProduct>()
				.Property(e => e.ProductName)
				.IsUnicode(false);

			modelBuilder.Entity<vCartProduct>()
				.Property(e => e.ProductDescription)
				.IsUnicode(false);

			modelBuilder.Entity<vCartProduct>()
				.Property(e => e.Cost)
				.HasPrecision(8, 2);

			modelBuilder.Entity<vCartProduct>()
				.Property(e => e.SubTotal)
				.HasPrecision(9, 2);

			modelBuilder.Entity<vCartProduct>()
				.Property(e => e.Discount)
				.HasPrecision(5, 2);

			modelBuilder.Entity<vCategoryProduct>()
				.Property(e => e.ProductName)
				.IsUnicode(false);

			modelBuilder.Entity<vCategoryProduct>()
				.Property(e => e.ProductDescription)
				.IsUnicode(false);

			modelBuilder.Entity<vCategoryProduct>()
				.Property(e => e.Cost)
				.HasPrecision(8, 2);
		}
	}
}
