using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAPI.Models
{
    public class Deposit
    {
        public Deposit()
        {
            
        }

        public Deposit(int bankUserId, DateTime createdAt, int amount)
        {
            BankUserId = bankUserId;
            CreatedAt = createdAt;
            Amount = amount;
        }

        public int BankUserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Amount { get; set; }
    }
}
