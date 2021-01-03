using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAPI.Models
{
    public class Account
    {

        public Account()
        {
            
        }

        public int BankUserId { get; set; }
        public int AccountNo { get; set; }
        public bool IsStudent { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public int InterestRate { get; set; }
        public int Amount { get; set; }

    }
}
