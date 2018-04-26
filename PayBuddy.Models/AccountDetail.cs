namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("AccountDetail")]
    public partial class AccountDetail
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AccountDetail()
        {
            Cards = new HashSet<Card>();
            Deposits = new HashSet<Deposit>();
            Withdrawals = new HashSet<Withdrawal>();
        }

        [Key]
        public int AccountId { get; set; }

        [Required]
        [StringLength(30)]
        public string AccountNumber { get; set; }

        [Required]
        [StringLength(30)]
        public string AccountName { get; set; }

        public decimal AccountBalance { get; set; }

        public int BankBranchId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Card> Cards { get; set; }

        public virtual BankBranch BankBranch { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Deposit> Deposits { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Withdrawal> Withdrawals { get; set; }
    }
}
