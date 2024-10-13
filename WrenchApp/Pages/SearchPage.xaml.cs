using System;
using System.Collections.Generic;
using System.ComponentModel;
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
using static System.Net.Mime.MediaTypeNames;

namespace WrenchApp.Pages
{
    public partial class SearchPage : Page
    {
        public SearchPage() : this("")
        {
        }

        // this string includes all tags that will appear in the program
        string categoryString = "Action,Adventure,Fantasy,Multiplayer,Puzzle,RPG,Sci-fi,Shooter,Simulation,Stealth,Strategy";

        private int pagenmbr = 1;
        private string order;
        private JArray games;
        private List<string> selectedtags = new List<string>();

        // Initialization
        public SearchPage(string search = "")
        {
            InitializeComponent();

            Searchbox.Text = search;
            order = "descending";

            GetGames();
            AddTags();
            PageInit();
        }

        // Function to add tags to tag list (more concise than adding them directly to xaml)
        private void AddTags()
        {
            var categories = categoryString.Trim('[', ']', ' ')
                                    .Replace("'", "") // Remove single quotes
                                    .Split(',')
                                    .Select(c => c.Trim())
                                    .ToList();

            foreach ( var cat in categories )
            {
                var categorytag = new CheckBox
                {
                    Content = cat
                };

                categorytag.Checked += (s, e) => ChangeTag(tag: cat);
                categorytag.Unchecked += (s, e) => ChangeTag(tag: cat);

                Tags.Children.Add(categorytag);
            } 
        }

        // Function for recording what tags are selected
        private void ChangeTag(string tag)
        {
            if (selectedtags.Contains(tag))
            {
                selectedtags.Remove(tag);
            } 
            else
            {
                selectedtags.Add(tag);
            }
        }

        // Initialize page data
        private void PageInit()
        {
            NextPage.MouseDown += (s, e) => PageChange("forward");
            LastPage.MouseDown += (s, e) => PageChange("back");
            LastPage.IsEnabled = false;
        }

        // Change page number
        private void PageChange(string status)
        {
            pagenmbr += (status == "forward") ? 1 : -1;

            LastPage.Text = (pagenmbr - 1).ToString();
            CurrentPage.Text = (pagenmbr).ToString();
            NextPage.Text = (pagenmbr + 1).ToString();

            if (pagenmbr == 1)
            {
                LastPage.IsEnabled = false;
            }
            else
            {
                LastPage.IsEnabled = true;
            }

            GetGames();
            ScrollViewer.ScrollToTop();
        }

        // Function for fetching games from server
        async private void GetGames()
        {
            // Create httpClient
            HttpClient httpClient = new HttpClient();

            try
            {
                string filters = FilterCheck();

                // Attempt to get all games
                HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/search-game?page={pagenmbr}&limit=10{filters}");

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

                notfound.Text = "No games found!";

                GameHolder.Children.Add(notfound);
                FoundResults.Text = "0 Results";
            }
        }

        // Check all filters and add them if needed
        private string FilterCheck()
        {
            string finalfilter = "";

            // Check for checked tags
            if (selectedtags.ToString() != "")
            {
                foreach (var cat in selectedtags)
                {
                    finalfilter += $"&category={cat}";
                }
            }

            // Check for given name
            if (Searchbox.Text != "")
            {
                finalfilter += $"&text={Searchbox.Text}";
            }

            // Check for price range
            if (maxPrice.Value != 0)
            {
                finalfilter += $"&minPrice={minPrice.Value}";
                finalfilter += $"&maxPrice={maxPrice.Value}";
            }

            // Return filter
            return finalfilter;
        }

        // Function for displaying all games gotten from GetGames()
        private void DisplayGames(JArray games)
        {
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
                var image = new System.Windows.Controls.Image
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


                GameHolder.Children.Add(outerStackPanel);
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

        private void Game_Screen(string id)
        {
            this.NavigationService.Navigate(new GameScreen(id));
        }

        private void SearchForGames(object sender, RoutedEventArgs e)
        {
            pagenmbr = 2;
            PageChange("back");
        }
    }
}
