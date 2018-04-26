namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Card
    {
        public int CardId { get; set; }

        public int CardTypeId { get; set; }

        public int CardCompanyId { get; set; }

        [Required]
        [StringLength(30)]
        public string CardHolderName { get; set; }

        [Required]
        [StringLength(50)]
        public string CardNumber { get; set; }

        public int Cvv { get; set; }

        public int ExpiryMonth { get; set; }

        public int ExpiryYear { get; set; }

        public int AccountId { get; set; }

        public decimal Amount { get; set; }

        public virtual AccountDetail AccountDetail { get; set; }

        public virtual ApplicationObject ApplicationObject { get; set; }

        public virtual ApplicationObject ApplicationObject1 { get; set; }

        public virtual ApplicationObject ApplicationObject2 { get; set; }

        public virtual ApplicationObject ApplicationObject3 { get; set; }
    }
}
