namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Withdrawal")]
    public partial class Withdrawal
    {
        public int WithdrawalId { get; set; }

        public decimal WithdrawalAmount { get; set; }

        public int UserId { get; set; }

        public int BankId { get; set; }

        public DateTime WithdrawDate { get; set; }

        public bool WithdrawStatus { get; set; }

        public int BalanceId { get; set; }

        public int AccountId { get; set; }

        [Required]
        [StringLength(50)]
        public string Comment { get; set; }

        public virtual AccountDetail AccountDetail { get; set; }

        public virtual Balance Balance { get; set; }

        public virtual Bank Bank { get; set; }

        public virtual User User { get; set; }
    }
}
