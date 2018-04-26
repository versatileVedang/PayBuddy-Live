using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.CartDomain.Interface
{
    public interface ICartDomain
    {
        IEnumerable<Cart> GetItem();
        string Post(Cart cart);
        string Delete(Cart cart);
        string Put(Cart cart);
        Cart GetBy(int id);


    }
}
