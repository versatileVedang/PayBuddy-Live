namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Transfer_ReceiveLog
    {
        [Key]
        public int TRLogid { get; set; }

        public int TransferId { get; set; }

        public int ReceivedId { get; set; }

        public DateTime TransactionDate { get; set; }

        public bool TR_Status { get; set; }

        public virtual ReceivedLog ReceivedLog { get; set; }

        public virtual TransferLog TransferLog { get; set; }
    }
}
