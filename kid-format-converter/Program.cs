using Koek;
using System;

namespace ConsoleApp21
{
    // Converts kid/key from GUID/base64 to the Clear Key base64url/base64url format.
    class Program
    {
        static void Main(string[] args)
        {
            // audio
            var kid = new Guid("87dc5c00-a7ca-4230-90f0-2995abd9f3bf");
            var key64 = "wTv15KZkRq2EJOWQhxQnog==";

            // video
            //var kid = new Guid("0a409770-9ea1-40d0-b937-39867584fee6");
            //var key64 = "OjOf9CpXfjPuqBiA8nVtdA==";

            var kidBytes = kid.ToBigEndianByteArray();
            var kid64url = Helpers.Convert.ByteArrayToBase64Url(kidBytes);

            Console.WriteLine($"KID: {kid64url}");

            var keyBytes = Convert.FromBase64String(key64);
            var key64Url = Helpers.Convert.ByteArrayToBase64Url(keyBytes);

            Console.WriteLine($"Key: {key64Url}");
        }
    }
}
