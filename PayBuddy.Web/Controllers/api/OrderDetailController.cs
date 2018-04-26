using PayBuddy.Domain.BalanceDomain;
using PayBuddy.Domain.CardDomain.Interface;
using PayBuddy.Domain.CartDomain.Interface;
using PayBuddy.Domain.Models;
using PayBuddy.Domain.OrderDetailsDomain.Interface;
using PayBuddy.Domain.OrderDomain.Interface;
using PayBuddy.Infrastructure.UnitofWork;
using PayBuddy.Infrastructure.UnitofWork.Interface;
using PayBuddy.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace PayBuddy.Web.Controllers.api
{
	public class OrderDetailController : ApiBaseController
	{
		public OrderDetailController(IUow uow, IOrderDetailDomain orderDetailDomain, ICartDomain cartDomain, IOrderDomain orderDomain, ICardDomain cardDomain, IBalanceDomain balanceDomain)
		{
			Uow = uow;
			OrderDetailDomain = orderDetailDomain;
			CartDomain = cartDomain;
			OrderDomain = orderDomain;
			CardDomain = cardDomain;
			BalanceDomain = balanceDomain;
		}

		public static string Encrypt(string toEncrypt, bool useHashing)
		{
			byte[] keyArray;
			byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);

			System.Configuration.AppSettingsReader settingsReader = new AppSettingsReader();
			// Get the key from config file

			string key = (string)settingsReader.GetValue("SecurityKey", typeof(String));
			//System.Windows.Forms.MessageBox.Show(key);
			//If hashing use get hashcode regards to your key
			if (useHashing)
			{
				MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
				keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
				//Always release the resources and flush data
				//of the Cryptographic service provide. Best Practice

				hashmd5.Clear();
			}
			else
				keyArray = UTF8Encoding.UTF8.GetBytes(key);

			TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
			//set the secret key for the tripleDES algorithm
			tdes.Key = keyArray;
			//mode of operation. there are other 4 modes. We choose ECB(Electronic code Book)
			tdes.Mode = CipherMode.ECB;
			//padding mode(if any extra byte added)
			tdes.Padding = PaddingMode.PKCS7;

			ICryptoTransform cTransform = tdes.CreateEncryptor();
			//transform the specified region of bytes array to resultArray
			byte[] resultArray = cTransform.TransformFinalBlock
					(toEncryptArray, 0, toEncryptArray.Length);
			//Release resources held by TripleDes Encryptor
			tdes.Clear();
			//Return the encrypted data into unreadable string format
			return Convert.ToBase64String(resultArray, 0, resultArray.Length);
		}


		[HttpGet]
		public IHttpActionResult Get()
		{
			return Ok();
		}


		[HttpPost]
		public IHttpActionResult Post(OrderDetailsModel orderDetail)
		{
			if (orderDetail.PaymentTypeId == 33)
			{
				var encryption = Encrypt((orderDetail.CardNumber).ToString(), true);
				var card = Uow.Repository<Card>().FirstOrDefault(c => (c.CardNumber == encryption) && (c.Cvv == orderDetail.CVV));
				if (card != null)
				{
					if (card.Amount >= orderDetail.Amount)
					{
						var cartList = Uow.Repository<Cart>().All();
						if (cartList != null)
						{
							string message;
							int flag = 0;
							List<OrderDetail> orderDetailList = new List<OrderDetail>();
							foreach (var item in cartList)
							{
								if (item.UserId == orderDetail.UserId)
								{
									OrderDetail detailTemp = new OrderDetail();
									detailTemp.ProductId = item.ProductId;
									detailTemp.Quantity = item.Quantity;
									detailTemp.SubTotal = item.SubTotal;
									var product = Uow.Repository<Product>().FirstOrDefault(p => p.ProductId == item.ProductId);
									detailTemp.DiscountId = product.DiscountId;
									detailTemp.OrderId = orderDetail.OrderId;
									orderDetailList.Add(detailTemp);
								}
							}

							if (orderDetailList != null)
							{
								try
								{
									message = (OrderDetailDomain.Post(orderDetailList));
									if (message != "Order Placed!!")
									{
										flag = 1;
									}
								}
								catch (Exception ex)
								{
									throw ex;
								}
							}

							if (flag != 1)
							{
								var Order = Uow.Repository<Order>().FirstOrDefault(o => o.OrderId == orderDetail.OrderId);
								Order.OrderStatus = "true";
								Order.PaymentTypeId = orderDetail.PaymentTypeId;
								OrderDomain.Put(Order);
								card.Amount = card.Amount - orderDetail.Amount;
								CardDomain.Put(card);
								return Ok("items ordered");
							}
							else
							{
								return Ok("Order Not Placed!");
							}
						}
						else
						{
							return Ok("cart is empty");
						}
					}

					else
					{
						return Ok("Insufficient amount in card");
					}
				}
				else
				{
					return Ok();
				}

			}
			else if (orderDetail.PaymentTypeId == 34)
			{
				var balanceCheck = BalanceDomain.GetBy(orderDetail.UserId);
				if (balanceCheck.BalanceAmount >= orderDetail.Amount)  
				{
					balanceCheck.BalanceAmount = balanceCheck.BalanceAmount - orderDetail.Amount;
					var message = BalanceDomain.Put(balanceCheck);
					if (message == "Item Updated.")
					{		
							return Ok("items ordered");
					}
					else
					{

						return Ok();
					}
				}
				else
				{
					return Ok("balance is not enough");
				}
			}
			else
			{
				return Ok("error");
			}
		}

		public bool deleteCart(int userId)
		{
			var cart = Uow.Repository<Cart>().All();
			foreach (var item in cart)
			{
				if (item.UserId == userId)
				{
					var cartTemp = Uow.Repository<Cart>().FirstOrDefault(c => c.UserId == userId);
					Uow.Repository<Cart>().Delete(cartTemp);
				}
			}
			return true;
		}
	}
}
