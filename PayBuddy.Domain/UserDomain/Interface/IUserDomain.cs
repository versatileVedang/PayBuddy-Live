using System.Collections.Generic;
using PayBuddy.Models;

namespace PayBuddy.Domain.UserDomain.Interface
{
    public interface IUserDomain
    {
        IEnumerable<User> GetUser();
        string PostUser(User user);
        string PutUser(User user);
        string DeleteUser(User user);
        User GetBy(int id);



    }
}
