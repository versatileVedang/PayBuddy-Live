namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class BankBranch
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BankBranch()
        {
            AccountDetails = new HashSet<AccountDetail>();
        }

        public int BankBranchId { get; set; }

        [Required]
        [StringLength(20)]
        public string IFSC_Code { get; set; }

        public int BankId { get; set; }

        [Required]
        [StringLength(30)]
        public string BankBranchName { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AccountDetail> AccountDetails { get; set; }

        public virtual Bank Bank { get; set; }
    }
}
