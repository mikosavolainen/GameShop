using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WrenchApp.Pages
{
    /// <summary>
    /// Interaction logic for LibraryPage.xaml
    /// </summary>
    public partial class LibraryPage : Page
    {
        public LibraryPage()
        {
            InitializeComponent();
            DisplayGames();
        }

        private async void DisplayGames()
        {
            var formData = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                { "token", ConfigurationManager.AppSettings["JWT"] }
            });

            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-all-owned-games", formData);
            string responseBody = await response.Content.ReadAsStringAsync();

            MessageBox.Show(responseBody);
        }
    }
}
