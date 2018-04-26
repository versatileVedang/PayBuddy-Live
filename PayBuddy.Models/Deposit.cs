namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Deposit")]
    public partial class Deposit
    {
        public int DepositId { get; set; }

        public int UserId { get; set; }

        public int DepositTypeId { get; set; }

        public decimal DepositAmount { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime DepositDate { get; set; }

        public bool DepositStatus { get; set; }

        public int AccountId { get; set; }

        public int BalanceId { get; set; }

        public virtual AccountDetail AccountDetail { get; set; }

        public virtual ApplicationObject ApplicationObject { get; set; }

        public virtual Balance Balance { get; set; }

        public virtual User User { get; set; }
    }
}
