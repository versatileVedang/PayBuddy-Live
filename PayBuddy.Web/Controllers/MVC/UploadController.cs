using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using PayBuddy.Infrastructure.UnitofWork;
using PayBuddy.Models;
using Rx.Infrastructure.Extentions;

namespace PayBuddy.Web.Controllers.MVC
{
	public class UploadController : Controller
	{
		[HttpPost]
		[ActionName("UploadImage")]
		public dynamic UploadImage(HttpPostedFileBase FileData, string Path)
		{
			string uploadedFile = HttpContext.Request.Files[0].FileName;
			string strExtention = System.IO.Path.GetExtension(uploadedFile);
			if (strExtention != string.Empty)
			{
				strExtention = strExtention.Substring(1);
			}
			else
			{
				strExtention = string.Empty;
			}
			Stream stream = HttpContext.Request.Files[0].InputStream;
			var buf = new byte[stream.Length];
			double uploadedFileSize = Math.Round(stream.Length / Math.Pow(1024, 2), 1);

			stream.Read(buf, 0, buf.Length);
			var fil = new FileCollection()
			{
				url = buf.BaseStringJpeg(),
				Name = System.IO.Path.GetFileName(uploadedFile),
				type = strExtention,
				FileContent = buf
			};
			return Json(fil, JsonRequestBehavior.AllowGet);
		}

	}


	public class FileCollection
	{
		public string url { get; set; }

		public string thumbnailUrl { get; set; }

		public string Name { get; set; }

		public string type { get; set; }

		public int size { get; set; }

		public string deleteUrl { get; set; }

		public string deleteType { get; set; }

		public string Content { get; set; }

		public byte[] FileContent { get; set; }
	}
}