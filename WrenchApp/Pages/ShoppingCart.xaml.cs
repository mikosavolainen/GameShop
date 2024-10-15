using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
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
    public partial class ShoppingCart : Page
    {
        HttpClient httpClient = new HttpClient();

        public ShoppingCart()
        {
            InitializeComponent();
            DisplayCart();
        }

        public async void DisplayCart()
        {
            MainHolder.Children.Clear();

            List<string> collection = ConfigurationManager.AppSettings["shoppingcart"].Split('/').ToList();
            collection.Remove("");

            if (collection.Count == 0)
            {
                TextBlock alert = new TextBlock
                {
                    Style = (Style)FindResource("RowTitle"),
                    Text = "No games in shopping cart"
                };
                MainHolder.Children.Add(alert);
                Purchase.Visibility = Visibility.Hidden;
            }

            foreach (string item in collection)
            {
                HttpResponseMessage response = await httpClient.GetAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/get-game-by-id?id={item}");

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    JObject gamedata = JObject.Parse(responseBody);

                    StackPanel rowHolder = new StackPanel
                    {
                        Style = (Style)FindResource("RowHolder")
                    };

                    Image Img = new Image
                    {
                        Style = (Style)FindResource("RowImg")
                    };
                    Img.MouseDown += (s, e) => ShowGame(item);

                    StackPanel rowTextHolder = new StackPanel
                    {
                        Style = (Style)FindResource("RowTextHolder")
                    };

                    TextBlock Title = new TextBlock
                    {
                        Style = (Style)FindResource("RowTitle"),
                        Text = gamedata["name"].ToString()
                    };

                    TextBlock Desc = new TextBlock
                    {
                        Style = (Style)FindResource("RowDesc"),
                        Text = gamedata["desc"].ToString()
                    };

                    TextBlock Price = new TextBlock
                    {
                        Style = (Style)FindResource("RowDesc"),
                        Text = gamedata["price"].ToString() + "€"
                    };

                    rowTextHolder.Children.Add(Title);
                    rowTextHolder.Children.Add(Desc);
                    rowTextHolder.Children.Add(Price);

                    Grid deleteGame = new Grid
                    {
                        Style = (Style)FindResource("DeleteGame")
                    };

                    TextBlock deleteButton = new TextBlock
                    {
                        Style = (Style)FindResource("DeleteButton")
                    };
                    deleteButton.MouseDown += (s, e) => DeleteGame(item);

                    deleteGame.Children.Add(deleteButton);

                    rowHolder.Children.Add(Img);
                    rowHolder.Children.Add(rowTextHolder);
                    rowHolder.Children.Add(deleteGame);

                    MainHolder.Children.Add(rowHolder);
                }
            } 
        }

        private void DeleteGame(string id)
        {
            List<string> collection = ConfigurationManager.AppSettings["shoppingcart"].Split('/').ToList();
            collection.Remove(id);

            ConfigurationManager.AppSettings["shoppingcart"] = String.Join("/", collection);
            DisplayCart();
        }

        private async void PurchaseGames(object sender, RoutedEventArgs e)
        {
            List<string> collection = ConfigurationManager.AppSettings["shoppingcart"].Split('/').ToList();

            bool success = true;
            foreach (var item in collection)
            {
                if (item == null || item == "") continue;

                var formData = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    { "token", ConfigurationManager.AppSettings["JWT"] },
                    { "game_id", item }
                });

                HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/buy-game", formData);
            
                if (response.IsSuccessStatusCode)
                {
                    continue;
                } else
                {
                    MessageBox.Show("Error purchasing games :(");
                    success = false;
                    break;
                }
            }

            if (success)
            {
                MessageBox.Show("Successfully bought games!");
                Purchase.Visibility = Visibility.Hidden;
                MainHolder.Children.Clear();
                ConfigurationManager.AppSettings["shoppingcart"] = "";
            }
        }

        private void ShowGame(string id)
        {
            this.NavigationService.Navigate(new GameScreen(id));
        }
    }
}
