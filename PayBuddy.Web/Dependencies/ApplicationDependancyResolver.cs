using Microsoft.Practices.ServiceLocation;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Dependencies;


namespace PayBuddy.Web.Dependencies
{
    public class ApplicationDependencyResolver : ApplicationDependencyScope, IDependencyResolver
    {
        public ApplicationDependencyResolver(IContainer container)
            : base(container)
        {
        }

        public IDependencyScope BeginScope()
        {
            var child = Container.GetNestedContainer();
            return new ApplicationDependencyResolver(child);
        }
    }
    public class ApplicationDependencyScope : ServiceLocatorImplBase, IDependencyScope
    {
        protected readonly IContainer Container;

        public ApplicationDependencyScope(IContainer container)
        {
            if (container == null) { throw new ArgumentNullException("container"); }

            Container = container;
        }

        public object GetService(Type serviceType)
        {
            if (serviceType == null) { return null; }
            try
            {
                return serviceType.IsAbstract || serviceType.IsInterface
                ? Container.TryGetInstance(serviceType)
                : Container.GetInstance(serviceType);
            }
            catch
            {
                return null;
            }
        }

        protected override object DoGetInstance(Type serviceType, string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                return Container.GetInstance(serviceType);
            }
            return Container.GetInstance(serviceType, key);
        }

        protected override IEnumerable<object> DoGetAllInstances(Type serviceType)
        {
            return Container.GetAllInstances(serviceType).Cast<object>();
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return Container.GetAllInstances(serviceType).Cast<object>();
        }

        public void Dispose()
        {
            Container.Dispose();
        }
    }
}