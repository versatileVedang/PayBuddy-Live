namespace PayBuddy.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Except
    {
        [Key]
        public int ExceptionId { get; set; }

        public string InnerException { get; set; }

        public string Message { get; set; }

        public string Data { get; set; }
    }
}
