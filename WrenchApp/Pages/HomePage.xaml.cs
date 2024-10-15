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
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace WrenchApp.Pages
{
    public partial class HomePage : Page
    {

        HttpClient httpClient = new HttpClient();

        public HomePage()
        {
            InitializeComponent();
            
            if (ConfigurationManager.AppSettings["editmode"] == "false")
            {
                InitializeItems();
            }
        }

        async void InitializeItems()
        {
            HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/search-game?page=1&limit=15");
            string responseBody = await response.Content.ReadAsStringAsync();
            var games = JArray.Parse(responseBody);
            int i = 0;

            // Featured
            while (i < 5)
            {
;               var game = games[i];

                if (i == 0)
                {
                    // Big
                } else
                {
                    // Small
                }

                i++;
            }

            // Popular

            while (i < 15)
            {
                var game = games[i];

                // Create the outer StackPanel
                StackPanel outerStackPanel = new StackPanel
                {
                    Style = (Style)FindResource("RowHolder"),
                    // Attach MouseDown event handler
                };
                outerStackPanel.MouseDown += (s, e) => Game_Screen(game["_id"].ToString());

                // Create the Image
                Image popularImage = new Image
                {
                    Style = (Style)FindResource("RowImg")
                };

                // Create the inner StackPanel
                StackPanel innerStackPanel = new StackPanel();

                // Create the Title TextBlock
                TextBlock titleTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowTitle"),
                    Text = game["name"].ToString()
                };

                // Create the Description TextBlock
                TextBlock descTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowDesc"),
                    Text = game["desc"].ToString()
                };

                // Create the Price TextBlock
                TextBlock priceTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowDesc"),
                    Text = game["price"].ToString()
                };

                // Add the TextBlocks to the inner StackPanel
                innerStackPanel.Children.Add(titleTextBlock);
                innerStackPanel.Children.Add(descTextBlock);
                innerStackPanel.Children.Add(priceTextBlock);

                // Add the Image and inner StackPanel to the outer StackPanel
                outerStackPanel.Children.Add(popularImage);
                outerStackPanel.Children.Add(innerStackPanel);

                if (i < 10)
                {
                    Popular.Children.Add(outerStackPanel);
                } else
                {
                    Newest.Children.Add(outerStackPanel);
                }

                i++;
            }
        }

        private void Game_Screen(string id)
        {
            this.NavigationService.Navigate(new GameScreen(id));
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
