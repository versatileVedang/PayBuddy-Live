namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ReceivedLog")]
    public partial class ReceivedLog
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ReceivedLog()
        {
            Transfer_ReceiveLog = new HashSet<Transfer_ReceiveLog>();
        }

        [Key]
        public int ReceivedId { get; set; }

        public int UserId { get; set; }

        public decimal ReceivedAmount { get; set; }

        public virtual User User { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Transfer_ReceiveLog> Transfer_ReceiveLog { get; set; }
    }
}
