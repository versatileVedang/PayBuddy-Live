using System.Web;
using System.Web.Optimization;

namespace PayBuddy.Web
{
    public class BundleConfig
    {
    
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/jQuery").Include(
					   ////"~/Scripts/lib/JQuery/jquery-1.10.2.js",
					   //"~/Scripts/lib/JQuery/jquery-1.10.2.min.js",
					   //"~/Scripts/lib/JQuery/jquery-1.10.2.min.map",
					   //"~/Scripts/lib/JQuery/jquery.maskedinput.min.js"
					   // //"~/Scripts/lib/JQuery/jquery-1.10.2.intellisense.js"

					    "~/Scripts/lib/jQuery/jquery-2.1.1.min.js",
						"~/Scripts/lib/jQuery/amplify.min.js",
						"~/Scripts/lib/jQuery/toastr.min.js",
						"~/Scripts/lib/jQuery/moment.min.js",
						"~/Scripts/lib/jQuery/bootstrap-datepicker.min.js",
						"~/Scripts/lib/jQuery/bootstrap-datetimepicker.min.js",
						"~/Scripts/lib/jQuery/underscore.min.js",
						"~/Scripts/lib/bootstrap/bootstrap.min.js",
						"~/Scripts/lib/bootstrap/bootstrap-colorpicker.js",
						"~/Scripts/lib/fileupload/jquery.ui.widget.js",
						"~/Scripts/lib/fileupload/jquery.iframe-transport.js",
						"~/Scripts/lib/fileupload/jquery.fileupload.js",
						"~/Content/vendor/select2/select2.js",
						"~/Scripts/lib/jQuery/jquery.maskedinput.min.js",
						"~/Scripts/lib/tinymce/jquery.tinymce.min.js",
						"~/Scripts/lib/tinymce/tinymce.min.js"
					   ));

			bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
						"~/Scripts/lib/modernizr/modernizr-2.6.2.js"));

			bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
					  //"~/Scripts/lib/bootstrap/bootstrap.js",
					  "~/Scripts/lib/bootstrap/bootstrap.min.js",
					  //"~/Scripts/lib/bootstrap/respond.js",
					  "~/Scripts/lib/bootstrap/respond.min.js",
					  "~/Scripts/lib/bootstrap/bootstrap-datepicker.min.js"
					  ));

			bundles.Add(new ScriptBundle("~/bundles/angular").Include(
						"~/Scripts/lib/angular/angular.min.js",
						"~/Scripts/lib/angular/angular-cookies.min.js",
						"~/Scripts/lib/angular/angular-resource.min.js",
						"~/Scripts/lib/angular/angular-route.min.js"
					   ));

			bundles.Add(new ScriptBundle("~/bundles/amplify").Include(
						"~/Scripts/lib/amplify/amplify.min.js"));

			bundles.Add(new ScriptBundle("~/bundles/fileupload").Include(
						"~/Scripts/lib/fileupload/jquery.fileupload.js",
						"~/Scripts/lib/fileupload/jquery.iframe-transport.js",
						"~/Scripts/lib/fileupload/jquery.ui.widget.js"
						));

			bundles.Add(new ScriptBundle("~/bundles/rx").Include(
					  "~/Scripts/lib/rx/rx.js"));

			bundles.Add(new ScriptBundle("~/bundles/appStart").IncludeDirectory("~/Scripts/app/appStart", "*.js", searchSubdirectories: true));

			bundles.Add(new ScriptBundle("~/bundles/controllers").IncludeDirectory("~/Scripts/app/controllers", "*.js", searchSubdirectories: true));

			bundles.Add(new ScriptBundle("~/bundles/dataServices").IncludeDirectory("~/Scripts/app/dataServices", "*.js", searchSubdirectories: true));

            bundles.Add(new ScriptBundle("~/bundles/logic").IncludeDirectory("~/Scripts/app/logic", "*.js", searchSubdirectories: true));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/bootstrap.css",
                     "~/Content/Site.css",
                      "~/Content/Images",
                       "~/Content/MainTheme/application.css",
                       "~/Content/Footer/footer.css",
                        "~/Content/rx.css",
                        "~/Content/font-awesome_232.min.css",
                         "~/Content/Cart.css"
                     ));
        }
	}
}

