namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Cart")]
    public partial class Cart
    {
        public int CartId { get; set; }

        public decimal SubTotal { get; set; }

        public int Quantity { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public virtual User User { get; set; }
    }
}
