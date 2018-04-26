using PayBuddy.Domain.AdminDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using System.Web.Http;
using PayBuddy.Domain.AdminDomain;
using PayBuddy.Domain.CartDomain.Interface;
using PayBuddy.Domain.Models;
using System.Collections.Generic;
using PayBuddy.Models;
using System.Linq;
using PayBuddy.Web.Controllers.MVC;
using Rx.Infrastructure.Extentions;
using System;

namespace PayBuddy.Web.Controllers.api
{
	public class CartController : ApiBaseController
	{
		public CartController(ICartDomain CartDomain, IUow Uow)
		{
			try
			{
				this.Uow = Uow;
				this.CartDomain = CartDomain;
				Console.WriteLine("hi");
			}
			catch (Exception ex)
			{

				Except exception = new Except();
				exception.Message = ex.Message;
				Uow.Repository<Except>().Add(exception);
			}


		}
		[HttpGet]
		public IHttpActionResult Get(int id)
		{
			var cartList = new List<CartModel>();
			var product = Uow.Repository<vCartProduct>().All().Where(c => c.UserId == id).ToList();
			foreach (var item in product)
			{
				var cart = new CartModel();
				cart.CartId = item.CartId;
				cart.ProductId = item.ProductId;
				cart.ProductName = item.ProductName;
				cart.ProductDescription = item.ProductDescription;
				var fil = new FileCollection() { url = (item.ProductImageBaseString).BaseStringJpeg() };
				cart.ProductImageBaseString = fil.url;
				cart.Cost = item.Cost;
				cart.Quantity = item.Quantity;
				cart.SubTotal = item.SubTotal;
				cartList.Add(cart);
			}
			return Ok(product);
		}

		[HttpPost]
		public IHttpActionResult Post(Cart item)
		{

			return Ok(CartDomain.Post(item));
		}

		[HttpPut]
		public IHttpActionResult Put(CartListModel cartList)
		{
			foreach (var cartItem in cartList.cartModel)
			{
				var product = Uow.Repository<Product>().FirstOrDefault(c => c.ProductId == cartItem.ProductId);
				if (cartItem.Quantity > product.Quantity)
				{
					return Ok(new { message = "Not enough in stock!", quantity = product.Quantity });
				}
				else
				{
					var item = Uow.Repository<Cart>().FirstOrDefault(c => c.CartId == cartItem.CartId);
					item.Quantity = cartItem.Quantity;
					item.SubTotal = cartItem.SubTotal;
					CartDomain.Put(item);
				}
			}
			return Ok(true);
		}

		[HttpDelete]
		[ActionName("deleteCartItem")]
		public IHttpActionResult Delete(Cart item)
		{
			var delCartItem = Uow.Repository<Cart>().FirstOrDefault(c => c.CartId == item.CartId);
			return Ok(CartDomain.Delete(delCartItem));
		}


		[HttpDelete]
		[ActionName("deleteCart")]
		public IHttpActionResult deleteCart(Cart cart)
		{

			var delCart = Uow.Repository<Cart>().FindBy(c => c.UserId == cart.UserId).ToList();
			delCart.ForEach(t =>
			{
				CartDomain.Delete(t);
			});
			return Ok();
		}
	}
}
