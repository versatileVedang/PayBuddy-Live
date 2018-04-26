using PayBuddy.Models;
using System;
using System.Collections.Generic;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Domain.UserDomain.Interface;


namespace PayBuddy.Domain.UserDomain
{
    public class UserDomain : BaseDomain, IUserDomain
    {
        public UserDomain(IUow uow)
        {
            Uow = uow;
        }
        public IEnumerable<User> GetUser()
        {
            return Uow.Repository<User>().All();
        }
        public string PostUser(User user)
        {
            try
            {
                if (user != null)
                {
                    Uow.Repository<User>().Add(user);
                    Uow.Save();
                    return "User added.";
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
        public string PutUser(User user)
        {
            
            try
            {
                if (user != null)
                {
                    Uow.Repository<User>().Update(user);
                    Uow.Save();
                    return "User Edited.";
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
        public string DeleteUser(User user)
        {
           
            try
            {
                if (user != null)
                {
                    Uow.Repository<User>().Delete(user);
                    Uow.Save();
                    return "User Deleted.";
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
        public User GetBy(int id)
        {
            var data = Uow.Repository<User>().FirstOrDefault(a => a.UserId == id);
            return data;
        }
    }
}
