using Newtonsoft.Json.Serialization;
using System.Web.Http;

namespace PayBuddy.Web.App_Start
{
    public class GlobalConfig
    {
        public static void CustomizeConfig(HttpConfiguration config)
        {
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            var oldDefault = GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedEncodings[0];
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedEncodings.Add(oldDefault);
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedEncodings.RemoveAt(0);

        }
    }
}