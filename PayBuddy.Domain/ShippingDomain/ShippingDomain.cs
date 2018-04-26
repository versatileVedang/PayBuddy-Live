using PayBuddy.Domain.ShippingDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;

namespace PayBuddy.Domain.ShippingDomain
{
    public class ShippingDomain : BaseDomain, IShippingDomain
    {
        public ShippingDomain(IUow uow)
        {
            Uow = uow;
        }

        public string Delete(ShippingDetail shippingDetail)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ShippingDetail> Get()
        {
            return Uow.Repository<ShippingDetail>().All();
        }

        public ShippingDetail GetBy(int id)
        {
            var details = Uow.Repository<ShippingDetail>().FirstOrDefault(s => s.ShippingId == id);
            return details;
        }

        public string Post(ShippingDetail shippingDetail)
        {
            try
            {
                if (shippingDetail != null)
                {
                    Uow.Repository<ShippingDetail>().Add(shippingDetail);
                    Uow.Save();
                    return "Order Placed!";
                }
                else
                {
                    return "Order not placed!";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string Put(ShippingDetail shippingDetail)
        {
            throw new NotImplementedException();
        }
    }
}
