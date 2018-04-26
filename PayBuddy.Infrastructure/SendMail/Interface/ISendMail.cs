using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Infrastructure.SendMail.Interface
{
	interface ISendMail
	{
		bool sendSMTPMail(string mailTo, string mailSubject, string mailBody);
	}
}
