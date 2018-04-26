using PayBuddy.Infrastructure.UnitofWork.Interface;

namespace PayBuddy.Domain
{
    public abstract class BaseDomain
    {
        public IUow Uow { get; set; }
    }
}
