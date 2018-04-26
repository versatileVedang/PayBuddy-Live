namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public int OrderId { get; set; }

        [Column(TypeName = "date")]
        public DateTime OrderDate { get; set; }

        public decimal Amount { get; set; }

        public int UserId { get; set; }

        public int ShippingId { get; set; }

        [Required]
        [StringLength(10)]
        public string OrderStatus { get; set; }

        public int? PaymentTypeId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        public virtual ShippingDetail ShippingDetail { get; set; }

        public virtual User User { get; set; }
    }
}
