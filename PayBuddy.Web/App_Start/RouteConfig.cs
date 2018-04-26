
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace PayBuddy.Web
{
    public class RouteConfig
    {
        public static string ControllerOnly = "ApiControllerOnly";
        public static string ControllerAndId = "ApiControllerAndIntegerId";
        public static string ControllerAction = "ApiControllerAction";
        public static string ControllerAndIdWithAction = "ControllerAndIdWithAction";

        public static void RegisterRoutes(RouteCollection routes)
        {

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // ex: api/technologies
            routes.MapHttpRoute(
               name: ControllerOnly,
               routeTemplate: "api/{controller}"
           );

            //  ex: api/project/1
            routes.MapHttpRoute(
                name: ControllerAndId,
                routeTemplate: "api/{controller}/{id}",
                defaults: null,
                constraints: new { id = @"^\d+$" }
            );

            routes.MapHttpRoute(
               name: ControllerAndIdWithAction,
               routeTemplate: "api/{controller}/{action}/{id}",
               defaults: null,
               constraints: new { id = @"^\d+$" }
           );

            // ex: api/question/all
            // ex: api/technology/microsoft
            routes.MapHttpRoute(
                name: ControllerAction,
                routeTemplate: "api/{controller}/{action}"
            );

            routes.MapRoute(
                name: "Defaultss",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Upload", action = "uploadTeamLogo", id = UrlParameter.Optional });

        }
    }

}
