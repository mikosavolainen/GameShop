using CredentialManagement;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Net;
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
    public partial class GameScreen : Page
    {

        private int score = 5;
        private JObject gameData;
        private string id_;

        HttpClient httpClient = new HttpClient();

        public GameScreen(string id)
        {
            InitializeComponent();
            id_ = id;

            GetData();
            DisplayReviews();
        }
        
        private async void GetData()
        {
            

            HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-game-by-id?id={id_}");
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

        private async void DisplayReviews()
        {
            ReviewColumn.Children.Clear();
            ReviewColumn2.Children.Clear();
            HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-reviews?id={id_}");
            string responseBody = await response.Content.ReadAsStringAsync();
            var reviewData = JArray.Parse(responseBody);

            try
            {
                int i = 1;
                foreach (var review in reviewData)
                {
                    i++;
                    DisplayReview(review, i);
                }
            } catch
            {
                var alert = new TextBlock
                {
                    Text = "No reviews yet!",
                    Foreground = Brushes.White,
                    FontSize = 25
                };

                ReviewColumn.Children.Add(alert);
            }
        }

        // Display reviews from other users
        private void DisplayReview(JToken review, int state)
        {
            // Create the main StackPanel
            StackPanel mainPanel = new StackPanel();

            // Create the inner horizontal StackPanel
            StackPanel innerPanel = new StackPanel
            {
                Orientation = Orientation.Horizontal
            };

            // Create the profile picture section
            StackPanel profilePanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                Width = 440
            };

            // Create the Border for profile picture
            Border profileBorder = new Border
            {
                CornerRadius = new CornerRadius(100),
                Height = 50,
                Width = 50,
                Margin = new Thickness(0, 0, 15, 5)
            };

            // Set the background image (profile picture)
            ImageBrush profileImageBrush = new ImageBrush
            {
                ImageSource = new BitmapImage(new Uri("pack://application:,,,/WrenchApp;component/Images/placeholderpfp.png"))
            };
            profileBorder.Background = profileImageBrush;

            // Create the StackPanel for username and date
            StackPanel userInfoPanel = new StackPanel
            {
                VerticalAlignment = VerticalAlignment.Center
            };

            // Create the username TextBlock
            TextBlock usernameText = new TextBlock
            {
                Text = review["writer"][0]["username"].ToString(),
                Foreground = Brushes.White,
                FontSize = 20
            };

            // Create the date TextBlock
            TextBlock dateText = new TextBlock
            {
                Text = review["date"].ToString(),
                Foreground = Brushes.Gray,
                FontSize = 15
            };

            // Add username and date to user info panel
            userInfoPanel.Children.Add(usernameText);
            userInfoPanel.Children.Add(dateText);

            // Add profile picture and user info panel to the profile panel
            profilePanel.Children.Add(profileBorder);
            profilePanel.Children.Add(userInfoPanel);

            // Create the rating label
            Label ratingLabel = new Label
            {
                Content = $"Rated: ({review["rating"]}/5)",
                Width = 150,
                Height = 55,
                VerticalContentAlignment = VerticalAlignment.Center,
                HorizontalContentAlignment = HorizontalAlignment.Right,
                Foreground = Brushes.White,
                FontSize = 20
            };

            // Add profile panel and rating label to the inner panel
            innerPanel.Children.Add(profilePanel);
            innerPanel.Children.Add(ratingLabel);

            // Create the RichTextBox for the review content
            RichTextBox reviewTextBox = new RichTextBox
            {
                Foreground = Brushes.LightGray,
                FontSize = 15
            };

            // Add review text to the RichTextBox
            FlowDocument reviewDocument = new FlowDocument();
            Paragraph reviewParagraph = new Paragraph(new Run(review["desc"].ToString()));
            reviewDocument.Blocks.Add(reviewParagraph);
            reviewTextBox.Document = reviewDocument;

            // Add inner panel and review text box to the main panel
            mainPanel.Children.Add(innerPanel);
            mainPanel.Children.Add(reviewTextBox);

            if (state % 2 == 0)
            {
                ReviewColumn.Children.Add(mainPanel);
            } else
            {
                ReviewColumn2.Children.Add(mainPanel);
            }
        }

        private void Review_Score(object sender, EventArgs e)
        {
            var selection = sender as TextBlock;
            score = Convert.ToInt32(selection.Tag);

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

        private async void PublishReview(object sender, EventArgs e)
        {
            var formData = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                { "token", ConfigurationManager.AppSettings["JWT"] },
                { "game_id", id_ },
                { "desc", new TextRange(ReviewBox.Document.ContentStart, ReviewBox.Document.ContentEnd).Text },
                { "stars", score.ToString() }
            });

            HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/add-review", formData);

            switch ((int)response.StatusCode)
            {
                case 200:
                    MessageBox.Show("Successfully submitted review!");
                    DisplayReviews();
                    break;
                case 400:
                    MessageBox.Show("You need to own the game to sumbit a review!");
                    break;
                case 444:
                    MessageBox.Show("You have already submitted a review");
                    break;
                default:
                    MessageBox.Show("An error has occurred");
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
