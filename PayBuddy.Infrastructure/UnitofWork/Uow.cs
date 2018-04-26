using Rx.Repository;
using System;
using System.Transactions;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;

namespace PayBuddy.Infrastructure.UnitofWork
{
    public class Uow : IUow
    {
        public PayBuddyDbContext DbContext { get; set; }
        protected IRepositoryProvider RepositoryProvider { get; set; }
        public Uow(IRepositoryProvider repositoryProvider)
        {
            CreateDBContext();
            repositoryProvider.DbContext = DbContext;
            repositoryProvider.DbContext.Database.CommandTimeout = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["dbConnectionTimeOut"]);
            RepositoryProvider = repositoryProvider;
        }
        private void CreateDBContext()
        {
            DbContext = new PayBuddyDbContext();
            DbContext.Configuration.ProxyCreationEnabled = false;
            DbContext.Configuration.LazyLoadingEnabled = false;
            DbContext.Configuration.ValidateOnSaveEnabled = false;
        }

        public void BeginTransaction()
        {
            throw new NotImplementedException();
        }

        public void Commit()
        {
            throw new NotImplementedException();
        }

        public IRepository<T> Repository<T>() where T : class
        {
            return RepositoryProvider.Repository<T>();
        }

        public void Rollback()
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            using (var scope = new TransactionScope())
            {
                DbContext.SaveChanges();
                scope.Complete();
            }
        }
    }
}

