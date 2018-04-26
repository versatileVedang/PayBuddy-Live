using PayBuddy.Web.App_Start;
using PayBuddy.Web.Dependencies;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace PayBuddy.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            Bootstrapper.SetUp();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            GlobalConfig.CustomizeConfig(GlobalConfiguration.Configuration);
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
             GlobalConfiguration.Configuration.EnsureInitialized();
        }
    }
}
