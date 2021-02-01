using System.Threading.Tasks;
using ZwajApp.API.Model;

namespace ZwajApp.API.Data
{
    public interface IAuthRepository
    {
         Task<User>Register(User user,string Password);
         Task<User>Login(string username,string password);

         Task<bool> UserExists(string username);
    }
}