using PayBuddy.Domain.AdminDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using System;
using System.Collections.Generic;

namespace PayBuddy.Domain.AdminDomain
{
    public class AdminDomain : BaseDomain, IAdminDomain
    {
        public AdminDomain(IUow uow)
        {
            Uow = uow;
        }
        public IEnumerable<Product> GetProduct()
        {
            return Uow.Repository<Product>().All();
        }
        public string PostProduct(Product product)
        {
            try
            {
                if (product != null)
                {
                    Uow.Repository<Product>().Add(product);
                    Uow.Save();
                    return "Product added.";
                }
                else
                {
                    return "error";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string PutProduct(Product product)
        {

            try
            {
                if (product != null)
                {
                    Uow.Repository<Product>().Update(product);
                    Uow.Save();
                    return "User Edited.";
                }
                else
                {
                    return "error";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public string DeleteProduct(Product product)
        {
            try
            {
                if (product != null)
                {
                    Uow.Repository<Product>().Delete(product);
                    Uow.Save();
                    return "User Deleted.";
                }
                else
                {
                    return "error";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public Product GetBy(int id)
        {
            var data = Uow.Repository<Product>().FirstOrDefault(a => a.ProductId == id);
            return data;
        }
        public IEnumerable<Product> GetBySubCategory(int id)
        {
            var subCategoryProduct = Uow.Repository<Product>().FindBy(x => x.SubCategoryId == id);
            return subCategoryProduct;
        }
        public IEnumerable<vCategoryProduct> GetByCategory(int id)
        {
            var categoryProduct = Uow.Repository<vCategoryProduct>().FindBy(x => x.CategoryId == id);
            return categoryProduct;
        }
        public IEnumerable<Product> GetByBrand(int id)
        {
            var brandProduct = Uow.Repository<Product>().FindBy(x => x.BrandId == id);
            return brandProduct;
        }
    }
}
