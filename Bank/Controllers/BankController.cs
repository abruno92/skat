using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAPI;
using System.Data.SqlClient;
using System.Net.Http;
using BankAPI.Models;

namespace TheBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankController : ControllerBase
    {
        private static HttpClient client = new HttpClient();

        private const string conn =
            "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=BankDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        //static List<BankUser> BankUsers;
        DateTime currentTime = DateTime.Now;

        // GET: api/<BankController>
        [HttpGet("BankUsers")]
        public List<BankUser> Get()
        {
            var result = new List<BankUser>();
            string sql = "SELECT * FROM BankUser";

            SqlConnection connection = new SqlConnection(conn);
            connection.Open();
            var selectCommand = new SqlCommand(sql, connection);
            var reader = selectCommand.ExecuteReader();
            if (!reader.HasRows)
            {
                return result;
            }

            while (reader.Read())
            {
                result.Add(new BankUser(reader.GetInt32(0), reader.GetDateTime(1), reader.GetDateTime(2)));
            }

            return result;
        }

        // GET: api/<BankController>
        [HttpGet("Deposits")]
        public List<Deposit> Get(int id)
        {
            var result = new List<Deposit>();
            string sql = "SELECT * FROM Deposit WHERE id =" + id;

            SqlConnection connection = new SqlConnection(conn);
            connection.Open();
            var selectCommand = new SqlCommand(sql, connection);
            var reader = selectCommand.ExecuteReader();
            if (!reader.HasRows)
            {
                return result;
            }

            while (reader.Read())
            {
                result.Add(new Deposit(reader.GetInt32(0), reader.GetDateTime(1), reader.GetInt32(2)));
            }

            return result;
        }

        // POST: api/<BankController>
        [HttpPost("add-deposit")]
        public void addDeposit(Account account, int id)
        {
            if (account.Amount == null | account.Amount < 0)
            {
                StatusCode(404);
            }
            else
            {
                //List<string> data = new List<string>();
                //data.Add(bankUser.Amount.ToString());
                //data.Add(id.ToString());

                //var response = client.PostAsync("InterestRateFunctionURL", bankUser.Amount);
                int response = InterestRate(account.Amount);
                

                var sql = "UPDATE Account SET Amount = @Amount WHERE id =" + id;
                SqlParameter[] p = new SqlParameter[0];
                p[0] = new SqlParameter("@Amount", response);

                SqlConnection connection = new SqlConnection(conn);
                connection.Open();

                var selectCommand = new SqlCommand(sql, connection);

                void InsertIntoDepoTable()
                {
                    string sqlDepo = "INSERT INTO Deposit (id, UserId, CreatedAt, Amount )" +
                                  $"VALUES (NULL, '{id}', '{currentTime}', '{response}')";

                    selectCommand.ExecuteNonQuery();
                }

                InsertIntoDepoTable();

                StatusCode(200);
            }
        }

        // POST: api/<BankController>
        [HttpPost("create-loan")]
        public void createLoan(Account account, int id)
        {
                 //var response = client.PostAsync("LoanFunctionURL", account.Amount);
                bool response = LoanFunc(account.Amount, id);

                if (response == false)
                {
                    string sql = "INSERT INTO Loan (Id, UserId, CreatedAt, ModifiedAt, Amount)" +
                                 $"VALUES (NULL, '{id}', '{currentTime}', '{currentTime}', '{response}')";

                    SqlConnection connection = new SqlConnection(conn);
                    connection.Open();

                    var selectCommand = new SqlCommand(sql, connection);
                    selectCommand.ExecuteNonQuery();
                }
                else
                {
                    StatusCode(403);
                }
        }

        // GET api/<BankController>/5
        [HttpGet("{id}", Name = "Get")]
        public BankUser GetByID(int id)
        {
            BankUser myBankUser = new BankUser();

            string sql = "SELECT * FROM BankUser WHERE id =" + id;

            SqlConnection connection = new SqlConnection(conn);
            connection.Open();
            var selectCommand = new SqlCommand(sql, connection);
            var reader = selectCommand.ExecuteReader();

            if (!reader.HasRows)
            {
                return myBankUser;
            }

            while (reader.Read())
            {
                myBankUser = new BankUser(reader.GetInt32(0), reader.GetDateTime(1), reader.GetDateTime(2));

            }

            return myBankUser;
        }

        //POST api/<BankUserController>
        [HttpPost]
        public void Post(BankUser myBankUser)
        {
            string sql = "INSERT INTO BankUser (Id, UserId, CreatedAt, ModifiedAt)" +
                      $"VALUES (NULL, '{myBankUser.UserId}', '{myBankUser.CreatedAt}', '{myBankUser.ModifiedAt}')";

            SqlConnection connection = new SqlConnection(conn);
            connection.Open();

            var selectCommand = new SqlCommand(sql, connection);
            selectCommand.ExecuteNonQuery();
        }

        // PUT api/<BankController>/5
        [HttpPut("{id}")]
        public void Put(int id, BankUser bankUserInput)
        {
            string sql =
                "UPDATE BankUser SET UserId = @UserId, CreatedAt = @CreatedAt, ModifiedAt = @ModifiedAtWHERE id =" + id;
            SqlParameter[] p = new SqlParameter[3];
            p[0] = new SqlParameter("@UserId", bankUserInput.UserId);
            p[1] = new SqlParameter("@CreatedAt", bankUserInput.CreatedAt);
            p[2] = new SqlParameter("@ModifiedAt", bankUserInput.ModifiedAt);

            SqlConnection connection = new SqlConnection(conn);
            connection.Open();

            var selectCommand = new SqlCommand(sql, connection);
            selectCommand.ExecuteNonQuery();

        }

        // DELETE api/<BankController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            string sql = "DELETE FROM BankUser where id =" + id;

            SqlConnection connection = new SqlConnection(conn);
            connection.Open();

            var selectCommand = new SqlCommand(sql, connection);
            selectCommand.ExecuteNonQuery();

        }

        //PUT api/<BankUserController>
        [HttpPut("withdrawl-money")]
        public void Put(int Amount, int id)
        {
            try
            {
                string sql = "UPDATE Account SET Amount = Amount -" + Amount + " WHERE id =" + id;

                SqlConnection connection = new SqlConnection(conn);
                connection.Open();

                var selectCommand = new SqlCommand(sql, connection);
                selectCommand.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw;
            }
        }

        //POST api/<BankUserController>
        [HttpPost("InterestRate")]
        public int InterestRate(int Amount)
        {
           // int calculatedAmount = Amount * 1.02;
           int result = Convert.ToInt32(Amount * 1.02);
           return result;
        }

        //POST api/<BankUserController>
        [HttpPost("LoanFunc")]
        public bool LoanFunc(int loanAmount, int id)
        {
            Account account = new Account();
            List<int> AccountList = new List<int>();

            string sql = "SELECT Amount FROM Account WHERE BankUserId =" + id;
            //DataTable tbl = new DataTable();

            SqlConnection connection = new SqlConnection(conn);
            connection.Open();
            var selectCommand = new SqlCommand(sql, connection);
            var reader = selectCommand.ExecuteReader();
            int accountAmount = reader.GetInt32(0);

                //int accountAmount;

            //foreach (var i in AccountList)
            //{
            //    accountAmount = i;
            //}
            //bool exceeds75;
            //int calculatedAmount = loanAmount * 0.75;

            if (loanAmount < accountAmount * 0.75)
            {
                //StatusCode(200);
                //exceeds75 = false;
                return false;
            }
            else
            {
                //exceeds75 = true;
                //StatusCode(403);
                return true;
            }
        }
    }
}
