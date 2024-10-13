using CredentialManagement;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
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
using static System.Net.Mime.MediaTypeNames;

namespace WrenchApp.Pages
{
    /// <summary>
    /// Interaction logic for GameScreen.xaml
    /// </summary>
    public partial class GameScreen : Page
    {

        private JObject gameData;
        private string id_;

        public GameScreen(string id)
        {
            InitializeComponent();
            id_ = id;
            GetData(id);
        }
        
        private async void GetData(string id)
        {
            HttpClient httpClient = new HttpClient();

            HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-game-by-id?id={id}");
            string responseBody = await response.Content.ReadAsStringAsync();
            gameData = JObject.Parse(responseBody);

            DisplayData(gameData);
        }

        private void DisplayData(JObject gameData)
        {
            // Add basic information
            GameTitle.Text = gameData["name"].ToString();
            ShortDesc.Text = gameData["desc"].ToString();
            Publisher.Text = gameData["author"].ToString();
            LongDesc.Text = gameData["desc"].ToString();

            // Add tags
            foreach (var tag in gameData["category"])
            {
                Border border = new Border
                {
                    BorderBrush = Brushes.Gray,
                    BorderThickness = new Thickness(1),
                    CornerRadius = new CornerRadius(6),
                    Margin = new Thickness(0, 0, 10, 0)
                };

                Label label = new Label
                {
                    Foreground = Brushes.White,
                    Content = tag
                };

                border.Child = label;
                Tags.Children.Add(border);
            }

            // Add rating
            int a = 0;
            int b = 0;

            foreach (var rating in gameData["ratings"])
            {
                a++;
                b += Convert.ToInt32(rating);
            }

            try
            {
                Rating.Text = $"{b / a}/5";
            } catch
            {
                Rating.Text = "No reviews yet!";
            }

            // Add image
            image.Source = new BitmapImage(new Uri("https://noimgfuncyet.jpg", UriKind.Absolute));
            image.ImageFailed += (s, e) =>
            {
                image.Source = new BitmapImage(new Uri("pack://application:,,,/WrenchApp;component/Images/placeholder.png", UriKind.Absolute));
            };

            // Add small images
            for (int i = 0; i < 5; i++)
            {
                var tinyimg = new System.Windows.Controls.Image
                {
                    Width = 150,
                    Height = 80,
                    Stretch = Stretch.UniformToFill
                };

                // Change image
                tinyimg.Source = new BitmapImage(new Uri("pack://application:,,,/WrenchApp;component/Images/placeholder.png", UriKind.Absolute));

                SmallImages.Children.Add(tinyimg);
            }
        }

        private void Review_Score(object sender, EventArgs e)
        {
            var selection = sender as TextBlock;
            int score = Convert.ToInt32(selection.Tag);

            switch (score)
            {
                case 1:
                    star1.Text = "★"; star2.Text = "☆"; star3.Text = "☆"; star4.Text = "☆"; star5.Text = "☆";
                    break;
                case 2:
                    star1.Text = "★"; star2.Text = "★"; star3.Text = "☆"; star4.Text = "☆"; star5.Text = "☆";
                    break;
                case 3:
                    star1.Text = "★"; star2.Text = "★"; star3.Text = "★"; star4.Text = "☆"; star5.Text = "☆";
                    break;
                case 4:
                    star1.Text = "★"; star2.Text = "★"; star3.Text = "★"; star4.Text = "★"; star5.Text = "☆";
                    break;
                default:
                    star1.Text = "★"; star2.Text = "★"; star3.Text = "★"; star4.Text = "★"; star5.Text = "★";
                    break;
            }
        }

        private void AddToCart(object sender, MouseButtonEventArgs e)
        {
            List<string> collection = ConfigurationManager.AppSettings["shoppingcart"].Split('/').ToList();

            if (collection.Contains(id_))
            {
                MessageBoxResult result = MessageBox.Show("Game already in shopping cart!\nRemove game from shopping cart?", "", MessageBoxButton.YesNo);

                if (result == MessageBoxResult.Yes)
                {
                    collection.Remove(id_);
                    ConfigurationManager.AppSettings["shoppingcart"] = string.Join("/", collection);
                }
            } else
            {
                collection.Add(id_);
                ConfigurationManager.AppSettings["shoppingcart"] = string.Join("/", collection);

                MessageBox.Show("Game added to shopping cart!", "");
            }
        }

        private void Hyperlink_RequestNavigate(object sender, RequestNavigateEventArgs e)
        {
            Process.Start(new ProcessStartInfo(e.Uri.AbsoluteUri) { UseShellExecute = true });
            e.Handled = true;
        }
    }
}
