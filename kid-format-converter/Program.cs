using System;
using System.IO;

namespace ConsoleApp22
{
    class Program
    {
        static void Main(string[] args)
        {
            var filesList = @"
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0001.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0002.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0003.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0004.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0005.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0006.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0007.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0008.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0009.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0010.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0011.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0012.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0013.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0014.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0015.m4s
c:\Users\sasaares\OneDrive\Asdf\encrypted\out\audio_out2\Encrypted_Cbcs\1\0016.m4s
";

            var files = filesList.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);

            using var outFile = File.Create("media.mp4");

            foreach (var inFile in files)
            {
                using var inStream = File.OpenRead(inFile);

                inStream.CopyTo(outFile);
            }
        }
    }
}
