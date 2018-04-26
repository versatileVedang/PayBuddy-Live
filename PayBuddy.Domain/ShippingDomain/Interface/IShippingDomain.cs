using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.ShippingDomain.Interface
{
    public interface IShippingDomain
    {
        IEnumerable<ShippingDetail> Get();
        string Post(ShippingDetail order);
        string Delete(ShippingDetail order);
        string Put(ShippingDetail order);
        ShippingDetail GetBy(int id);
    }
}
