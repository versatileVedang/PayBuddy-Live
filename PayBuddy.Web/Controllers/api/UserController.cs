using PayBuddy.Domain.AppUow.Interface;
using PayBuddy.Domain.Models;
using PayBuddy.Domain.UserDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using System.Web.Http;

namespace PayBuddy.Web.Controllers.api
{
    public class UserController : ApiBaseController
    {
        public UserController(IUow uow, IAppUow appUow, IUserDomain userDomain)
        {
            Uow = uow;
            AppUow = appUow;
            UserDomain = userDomain;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(UserDomain.GetUser());
        }

        [HttpPost]
        public IHttpActionResult Post(UserModel user)
        {

            User userTemp = new User();

            if (user != null)
            {
                if (user.Email != null)
                {
                    var userObj = Uow.Repository<User>().FirstOrDefault(t => t.Email == user.Email);
                    if (userObj != null)
                    {
                        return Ok("Same Email Exists");
                    }
                }

                var passwordHash = AppUow.PasswordEncryption.Encrypt(user.Password);
                userTemp.Password = passwordHash.PasswordHash;
                userTemp.Salt = passwordHash.Salt;
                userTemp.FirstName = user.FirstName;
                userTemp.LastName = user.LastName;
                userTemp.Email = user.Email;
                userTemp.Contact = user.Contact;
                userTemp.Address = user.Address;
                userTemp.RoleId = 2;
                userTemp.GenderId = user.GenderId;
                Uow.Save();
            }
            return Ok(UserDomain.PostUser(userTemp));
        }

        [HttpPut]
        public IHttpActionResult Put(UserModel user)
        {
            User userTemp = UserDomain.GetBy(user.UserId);
            if (user.Email != null)
            {
                userTemp.FirstName = user.FirstName;
                userTemp.LastName = user.LastName;
                userTemp.Email = user.Email;
                userTemp.Contact = user.Contact;
                userTemp.Address = user.Address;
                userTemp.GenderId = user.GenderId;
            }
            else
            {
                byte[] userPassword = AppUow.PasswordEncryption.Encrypt(user.Password, userTemp.Salt);
                if (AppUow.PasswordEncryption.VerifyPassword(userTemp.Password, userPassword))
                {
                    return Ok(false);
                }
                else
                {
                    userTemp.Password = userPassword;
                }
            }

            return Ok(UserDomain.PutUser(userTemp));
        }

        [HttpGet]
        [ActionName("getUser")]
        public IHttpActionResult Get(int id)
        {
            var user = UserDomain.GetBy(id);
            return Ok(user);
        }

		[HttpGet]
		[ActionName("getCount")]
		public IHttpActionResult GetCount(int id)
		{
			var count = Uow.Repository<vCartCount>().FindBy(c => c.UserId == id);
			foreach (var item in count)
			{
				return Ok(item);
			}
			return Ok();
		}


		[HttpDelete]
        public IHttpActionResult Delete(User user)
        {
            var newUser = Uow.Repository<User>().FirstOrDefault(c => c.UserId == user.UserId);
            return Ok(UserDomain.DeleteUser(newUser));
        }
    }
}
