using PayBuddy.Infrastructure.SendMail.Interface;
using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;


namespace PayBuddy.Infrastructure.SendMail
{
	public class SendMail : ISendMail
	{
		public bool sendSMTPMail(string mailTo, string mailSubject, string mailBody)
		{
			try
			{
				var WebMailFrom = ConfigurationManager.AppSettings["from"];
				var WebMailUserName = ConfigurationManager.AppSettings["username"];
				var WebMailPassword = ConfigurationManager.AppSettings["password"];
				var WebMailSmtpServer = ConfigurationManager.AppSettings["smtpserver"];
				var WebMailSmtpPort = ConfigurationManager.AppSettings["smtpport"];
				var WebMailEnableSsl = ConfigurationManager.AppSettings["enablessl"];

				MailMessage message = new MailMessage(WebMailFrom, mailTo, mailSubject, mailBody);
				message.IsBodyHtml = true;

				var fromAddress = new MailAddress(WebMailUserName, "Bidmo");

				SmtpClient mySmtpClient = new SmtpClient
				{
					Host = WebMailSmtpServer,
					Port = Convert.ToInt32(WebMailSmtpPort),
					EnableSsl = Convert.ToBoolean(WebMailEnableSsl),
					DeliveryMethod = SmtpDeliveryMethod.Network,
					UseDefaultCredentials = false,
					Credentials = new NetworkCredential(fromAddress.Address, WebMailPassword)
				};
				mySmtpClient.Send(message);

				message.Dispose();
				mySmtpClient = null;

				return true;
			}
			catch (Exception ex)
			{
				return false;
			}

		}
	}


}