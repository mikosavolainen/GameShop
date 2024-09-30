using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Configuration;
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
    /// Interaction logic for HomePage.xaml
    /// </summary>
    public partial class HomePage : Page
    {
        public HomePage()
        {
            InitializeComponent();
            
            if (ConfigurationManager.AppSettings["editmode"] == "false")
            {
                InitializeItems();
            }
        }

        void InitializeItems()
        {
            // Featured

            // Popular

            // Newest
        }

        private void Search_Tag(object sender, RoutedEventArgs e)
        {
            Border clickedBorder = sender as Border;

            string tagToSearch = clickedBorder.Tag as String;

            this.NavigationService.Navigate(new SearchPage(tag: tagToSearch));
        }

        private void Game_Screen(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new GameScreen("1"));
        }

        private void SearchButton_Click(object sender, RoutedEventArgs e)
        {
            string searchedGame = Searchbox.Text;
            this.NavigationService.Navigate(new SearchPage(search: searchedGame));
        }

        private void Publish_Screen(object sender, RoutedEventArgs e)
        {
            Window gamepublishscreen = new GamePublishScreen();
            gamepublishscreen.Show();
        }
    }
}
