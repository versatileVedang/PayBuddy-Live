using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PayBuddy.Models;
using PayBuddy.Infrastructure.UnitofWork;
using PayBuddy.Infrastructure.UnitofWork.Interface;

namespace PayBuddy.Domain.CartDomain.Interface
{
    public class CartDomain : BaseDomain, ICartDomain
    {
        public CartDomain(IUow uow)
        {
            Uow = uow;
        }

        public IEnumerable<Cart> GetItem()
        {
            return Uow.Repository<Cart>().All();
        }

        public Cart GetBy(int id)
        {
            var data = Uow.Repository<Cart>().FirstOrDefault(a => a.UserId == id);
            return data;
        }

        public string Post(Cart cart)        
        {
            try
            {
                if (cart != null)
                {
                    Uow.Repository<Cart>().Add(cart);
                    Uow.Save();
                    return "Item Added";
                }
                else
                {
                    return "error";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public string Delete(Cart cart)     
        {
            try
            {
                if (cart != null)
                {
                    Uow.Repository<Cart>().Delete(cart);
                    Uow.Save();
                    return "Item Deleted.";
                }
                else
                {
                    return "error";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string Put(Cart cart)
        {
            try
            {
                if (cart != null)
                {
                    Uow.Repository<Cart>().Update(cart);
                    Uow.Save();
                    return "Item Updated.";
                }
                else
                {
                    return "error";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}

