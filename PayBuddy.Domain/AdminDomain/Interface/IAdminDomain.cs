using PayBuddy.Models;
using System.Collections.Generic;

namespace PayBuddy.Domain.AdminDomain.Interface
{
    public interface IAdminDomain
    {
        IEnumerable<Product> GetProduct();
        string PostProduct(Product product);
        string PutProduct(Product product);
        string DeleteProduct(Product product);
        Product GetBy(int id);
        IEnumerable<Product> GetBySubCategory(int id);
        IEnumerable<vCategoryProduct> GetByCategory(int id);
        IEnumerable<Product> GetByBrand(int id);
    }
}
