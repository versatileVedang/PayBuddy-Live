using PayBuddy.Domain.AppUow.Interface;
using PayBuddy.Domain.Models;
using PayBuddy.Domain.UserDomain.Interface;
using PayBuddy.Infrastructure.SendMail;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using PayBuddy.Web.Models.CustomModels;
using System;
using System.Linq;
using System.Web.Http;


namespace PayBuddy.Web.Controllers.api
{
    public class UserAuthenticationController : ApiBaseController
    {
        public UserAuthenticationController(IUow uow, IAppUow appUow, IUserDomain userDomain)
        {
            Uow = uow;
            AppUow = appUow;
			UserDomain = userDomain;
        }

        [HttpPost]
        public IHttpActionResult Post(LoginModel user)
        {

			if (user.email != null && user.password != null)
			{
				var data = Uow.Repository<User>().FirstOrDefault(c => c.Email == user.email);
				if (data != null)
				{
					byte[] userPassword = AppUow.PasswordEncryption.Encrypt(user.password, data.Salt);
					if (AppUow.PasswordEncryption.VerifyPassword(data.Password, userPassword))
					{
						return Ok(new { data = data, message = true });
					}
					else
					{
						return Ok(4);
					}
				}
				else
				{
					return Ok(5);
				}

			}
			else
			{
				return Ok("Please Enter Your Email and Password");

			}
        }

		[HttpPut]
		public IHttpActionResult PutForgotPassword(UserModel user)
		{

			if (user.Email != null)
			{
				var data = Uow.Repository<User>().FirstOrDefault(c => c.Email == user.Email);
				if (data != null)
				{
					var passwordHash = AppUow.PasswordEncryption.Encrypt("Yournewpassword1");
					data.Password = passwordHash.PasswordHash;
					data.Salt = passwordHash.Salt;
					var message = UserDomain.PutUser(data);
					SendMail sendMail = new SendMail();
					bool mail = sendMail.sendSMTPMail(user.Email, "PasswordReset", "Yournewpassword1");
					if (message == "User Edited.")
					{
						return Ok("successfull");
					}
					else
					{
						return Ok("error");
					}
				}
				else
				{
					return Ok("Email Does Not Exist");
				}

			}

			else
			{
				return Ok("Please Enter Your Email");
			}
		}

	}
}
