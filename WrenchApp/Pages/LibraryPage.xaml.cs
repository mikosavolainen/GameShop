using Microsoft.SqlServer.Server;
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
    /// Interaction logic for LibraryPage.xaml
    /// </summary>
    public partial class LibraryPage : Page
    {
        HttpClient httpClient = new HttpClient();

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

            HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-all-owned-games", formData);
            string responseBody = await response.Content.ReadAsStringAsync();
            var games = JArray.Parse(responseBody);

            foreach (var game in games[0]["games"])
            {
                // Create the StackPanel
                StackPanel stackPanel = new StackPanel
                {
                    Margin = new Thickness(25),
                    Width = 250,
                    Height = 250,
                    Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#303030"))
                };

                // Create the Image
                Image image = new Image
                {
                    Source = new BitmapImage(new Uri("pack://application:,,,/WrenchApp;component/Images/placeholder.png")),
                    Height = 150,
                    Width = 250,
                    Stretch = System.Windows.Media.Stretch.UniformToFill
                };

                // Create the TextBlock
                TextBlock textBlock = new TextBlock
                {
                    Text = game["name"].ToString(),
                    Foreground = Brushes.White,
                    FontSize = 20,
                    Margin = new Thickness(5, 5, 0, 0)
                };

                // Create the Button
                Button button = new Button
                {
                    HorizontalAlignment = HorizontalAlignment.Center,
                    Height = 45,
                    Width = 200,
                    Content = "Play",
                    Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#6A0DAD")),
                    Foreground = Brushes.White,
                    FontSize = 20,
                    Margin = new Thickness(0, 5, 0, 0),
                    Cursor = Cursors.Hand
                };

                // Add the controls to the StackPanel
                stackPanel.Children.Add(image);
                stackPanel.Children.Add(textBlock);
                stackPanel.Children.Add(button);

                GameHolder.Children.Add(stackPanel);
            }
        
            if (games.Count < 1)
            {
                TextBlock textblock = new TextBlock
                {
                    Text = "No games owned brokie",
                    Foreground = Brushes.White,
                    FontSize = 20
                };

                GameHolder.Children.Add(textblock);
            }
        }
    }
}
