using Rx.Repository;

namespace PayBuddy.Infrastructure.UnitofWork.Interface
{
    public interface IUow
    {
        void Save();
        IRepository<T> Repository<T>() where T : class;
        void BeginTransaction();
        void Rollback();
        void Commit();
    }
}
