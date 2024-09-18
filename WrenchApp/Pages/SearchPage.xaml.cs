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
using Newtonsoft.Json.Linq;

namespace WrenchApp.Pages
{
    /// <summary>
    /// Interaction logic for SearchPage.xaml
    /// </summary>
    public partial class SearchPage : Page
    {
        public SearchPage() : this("", "")
        {
        }

        private string order;
        private JArray games;

        public SearchPage(string tag = "", string search = "")
        {
            InitializeComponent();

            Searchbox.Text = search;
            order = "descending";

            GetGames();
        }

        async private void GetGames()
        {
            // Create httpClient
            HttpClient httpClient = new HttpClient();

            // Attempt to get all games
            HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-all-games", null);

            // Ensure response is ok
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            games = JArray.Parse(responseBody);

            DisplayGames(games);
        }

        private void DisplayGames(JArray games)
        {
            foreach (JObject item in games)
            {
                // Create outer StackPanel
                var outerStackPanel = new StackPanel
                {
                    Style = (Style)FindResource("RowHolder")
                };
                outerStackPanel.MouseDown += Game_Screen;

                // Create Image
                var image = new Image
                {
                    Style = (Style)FindResource("RowImg")
                };

                // Create inner StackPanel
                var innerStackPanel = new StackPanel();

                // Create TextBlocks
                var titleTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowTitle"),
                    Text = item["name"].ToString()
                };

                var descTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowDesc"),
                    Text = item["desc"].ToString()
                };

                var priceTextBlock = new TextBlock
                {
                    Style = (Style)FindResource("RowDesc"),
                    Text = item["price"].ToString() + "€"
                };

                // Add TextBlocks to inner StackPanel
                innerStackPanel.Children.Add(titleTextBlock);
                innerStackPanel.Children.Add(descTextBlock);
                innerStackPanel.Children.Add(priceTextBlock);

                // Add Image and inner StackPanel to outer StackPanel
                outerStackPanel.Children.Add(image);
                outerStackPanel.Children.Add(innerStackPanel);

                // Add the outer StackPanel to the gameholder StackPanel
                GameHolder.Children.Add(outerStackPanel);

                // Add categories to tags
                foreach (JValue category in item["category"])
                {
                    var categoryString = category.ToString();

                    // Remove the brackets and split by comma, then trim spaces and quotes
                    var categories = categoryString.Trim('[', ']', ' ')
                                    .Replace("'", "") // Remove single quotes
                                    .Split(',')
                                    .Select(c => c.Trim())
                                    .ToList();

                    foreach (var cat in categories)
                    {
                        // Check if a CheckBox with the same content already exists
                        bool exists = Tags.Children.OfType<CheckBox>().Any(cb => cb.Content.ToString() == cat);

                        if (!exists)
                        {
                            var categorytag = new CheckBox
                            {
                                Content = cat
                            };

                            Tags.Children.Add(categorytag);
                        }
                    }
                }
            }
        }

        private void changeOrder(object sender, EventArgs e)
        {
            if (order == "descending")
            {
                order = "ascending";
                orderBy.Source = new BitmapImage(new Uri("pack://application:,,,/WrenchApp;component/Images/Icons/ascending.png"));
            }
            else
            {
                order = "descending";
                orderBy.Source = new BitmapImage(new Uri("pack://application:,,,/WrenchApp;component/Images/Icons/descending.png"));
            }
        }

        private void Game_Screen(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new GameScreen());
        }
    }


}
