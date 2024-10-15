using Newtonsoft.Json.Linq;
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
    /// Interaction logic for ProfilePage.xaml
    /// </summary>
    public partial class ProfilePage : Page
    {
        HttpClient httpClient = new HttpClient();

        public ProfilePage()
        {
            InitializeComponent();
            Username.Text = ConfigurationManager.AppSettings["username"];

            GetUserData();
            GetGameData();
        }

        private async void GetUserData()
        {
            HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-user-data?username={Username.Text}");
            string responseBody = await response.Content.ReadAsStringAsync();

            var userData = JObject.Parse(responseBody);

            Description.Text = userData["description"].ToString();
        }

        private async void GetGameData()
        {
            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("token", ConfigurationManager.AppSettings["JWT"])
            });

            HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-all-owned-games", formContent);
            string responseBody = await response.Content.ReadAsStringAsync();

            var ownedGames = JArray.Parse(responseBody);
            int i = 0;

            // Display owned games
            foreach (var game in ownedGames[0]["games"])
            {
                i++;
                var outerStackPanel = new StackPanel
                {
                    Style = (Style)FindResource("RowHolder")
                };
                outerStackPanel.MouseDown += (s, e) => Game_Screen(game["_id"].ToString());

                // Create Image
                var image = new Image
                {
                    Style = (Style)FindResource("RowImg")
                };

                image.Source = new BitmapImage(new Uri("https://noimgfuncyet.jpg", UriKind.Absolute));

                // Event handler for loading a placeholder if the image fails to load
                image.ImageFailed += (s, e) =>
                {
                    image.Source = new BitmapImage(new Uri("pack://application:,,,/WrenchApp;component/Images/placeholder.png", UriKind.Absolute));
                };

                // Create inner StackPanel
                var innerStackPanel = new StackPanel();

                // Create TextBlocks
                var titleTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowTitle"),
                    Text = game["name"].ToString()
                };

                var descTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowDesc"),
                    Text = game["desc"].ToString()
                };

                var priceTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowDesc"),
                    Text = game["price"].ToString() + "€"
                };

                // Add TextBlocks to inner StackPanel
                innerStackPanel.Children.Add(titleTextBlock);
                innerStackPanel.Children.Add(descTextBlock);
                innerStackPanel.Children.Add(priceTextBlock);

                // Add Image and inner StackPanel to outer StackPanel
                outerStackPanel.Children.Add(image);
                outerStackPanel.Children.Add(innerStackPanel);


                OwnedGames.Children.Add(outerStackPanel);

                if (i > 3)
                {
                    break;
                }
            }

            // If user owns no games
            if (ownedGames.Count == 0)
            {
                TextBlock textblock = new TextBlock
                {
                    Text = "No games owned",
                    Foreground = Brushes.White,
                    FontSize = 20
                };
            }
        }

        private async void EditDesc(object sender, MouseButtonEventArgs e)
        {
            EditDesc editDesc = new EditDesc();

            if (editDesc.ShowDialog() == true)
            {
                string description = editDesc.InputText;

                var formContent = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("token", ConfigurationManager.AppSettings["JWT"]),
                    new KeyValuePair<string, string>("newDescription", description)
                });

                HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/update-desc", formContent);
                string responseBody = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    Description.Text = description;
                    MessageBox.Show("Description successfully changed!");

                }
                else
                {
                    MessageBox.Show("An error has occurred: " + responseBody);
                }
            }
        }

        private void Game_Screen(string id)
        {
            this.NavigationService.Navigate(new GameScreen(id));
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
