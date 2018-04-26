using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayBuddy.Domain.HelpDeskDomain.Interface
{
	public interface IHelpDeskDomain
	{
		IEnumerable<HelpDesk> Get();
		string Post(HelpDesk desk);
	}
}
