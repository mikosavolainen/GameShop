using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
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
    /// Interaction logic for ProfilePage.xaml
    /// </summary>
    public partial class ProfilePage : Page
    {
        public ProfilePage()
        {
            InitializeComponent();
            Username.Text = ConfigurationManager.AppSettings["username"];
        }

        private void Navigate_Library(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new LibraryPage());
        }

        private void Game_Screen(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new GameScreen("1"));
        }
    }
}
