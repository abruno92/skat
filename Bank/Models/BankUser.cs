using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAPI
{
    public class BankUser
    {
        public BankUser()
        {
            
        }


        public BankUser(int userId, DateTime createdAt, DateTime modifiedAt)
        {
            UserId = userId;
            CreatedAt = createdAt;
            ModifiedAt = modifiedAt;
        }

        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

    }
}
