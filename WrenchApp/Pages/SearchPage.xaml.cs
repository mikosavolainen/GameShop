﻿using System;
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
        private List<string> selectedtags = new List<string>();
        private bool passedfilter;

        public SearchPage(string tag = "", string search = "")
        {
            InitializeComponent();

            Searchbox.Text = search;
            order = "descending";

            GetGames("0", "200");
        }

        async private void GetGames(string minprice, string maxprice)
        {
            // Create httpClient
            HttpClient httpClient = new HttpClient();

            try
            {
                // Attempt to get all games
                HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/search-game?minPrice={minprice}&maxPrice={maxprice}&text={Searchbox.Text}");

                // Ensure response is ok
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                games = JArray.Parse(responseBody);

                DisplayGames(games);

            } catch
            {
                GameHolder.Children.Clear();

                var notfound = new TextBlock
                {
                    Style = (Style)FindResource("RowTitle")
                };

                notfound.Text = "No games found with matching price point!";

                GameHolder.Children.Add(notfound);
                FoundResults.Text = "0 Results";
            }
        }

        private void AddTag(string tagname)
        {
            selectedtags.Add(tagname);
            DisplayGames(games);
        }

        private void DeleteTag(string tagname)
        {
            selectedtags.Remove(tagname);
            DisplayGames(games);
        }

        private void DisplayGames(JArray games)
        {
            passedfilter = false;
            GameHolder.Children.Clear();
            int i = 0;

            foreach (JObject item in games)
            {
                i += 1;
                FoundResults.Text = $"{i} Results";

                // Create outer StackPanel
                var outerStackPanel = new StackPanel
                {
                    Style = (Style)FindResource("RowHolder")
                };
                outerStackPanel.MouseDown += (s, e) => Game_Screen(item["_id"].ToString());

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

                    passedfilter = selectedtags == null || selectedtags.All(c => categories.Contains(c));

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

                            categorytag.Checked += (s, e) => AddTag(tagname: cat);
                            categorytag.Unchecked += (s, e) => DeleteTag(tagname: cat);

                            Tags.Children.Add(categorytag);
                        }
                    }
                }

                // Add TextBlocks to inner StackPanel
                innerStackPanel.Children.Add(titleTextBlock);
                innerStackPanel.Children.Add(descTextBlock);
                innerStackPanel.Children.Add(priceTextBlock);

                // Add Image and inner StackPanel to outer StackPanel
                outerStackPanel.Children.Add(image);
                outerStackPanel.Children.Add(innerStackPanel);

                // Add the outer StackPanel to the gameholder StackPanel if not filtered out
                if (passedfilter)
                {
                    GameHolder.Children.Add(outerStackPanel);
                }
            }
        }

        private void priceChange(object sender, MouseButtonEventArgs e)
        {
            GetGames(minPrice.Value.ToString(), maxPrice.Value.ToString());
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

        private void Game_Screen(string id)
        {
            this.NavigationService.Navigate(new GameScreen(id));
        }

        private void FilterUpdate(object sender, RoutedEventArgs e)
        {
            GetGames("0", "200");
        }
    }
}
