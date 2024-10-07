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

namespace WrenchApp.Pages
{
    /// <summary>
    /// Interaction logic for GameScreen.xaml
    /// </summary>
    public partial class GameScreen : Page
    {

        private JObject gameData;

        public GameScreen(string id)
        {
            InitializeComponent();
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
            GameTitle.Text = gameData["name"].ToString();
            ShortDesc.Text = gameData["desc"].ToString();
            Publisher.Text = gameData["author"].ToString();
            LongDesc.Text = gameData["desc"].ToString();

            BuyGame.Text = $"Add To Cart ({gameData["price"].ToString()}€)";
            BuyGame.MouseDown += (s, e) => AddToCart(gameData["_id"].ToString());
        }

        private void AddToCart(string id)
        {
            List<string> collection = ConfigurationManager.AppSettings["shoppingcart"].Split('/').ToList();

            if (collection.Contains(id))
            {
                MessageBoxResult anwser = MessageBox.Show("Game already in shopping cart!\nDo you wish to remove game from shopping cart?", "", MessageBoxButton.YesNo);
                if (anwser == MessageBoxResult.Yes)
                {
                    collection.Remove(id);
                    ConfigurationManager.AppSettings["shoppingcart"] = String.Join("/", collection);
                    MessageBox.Show("Game removed from shopping cart!");
                }
            } else
            {
                ConfigurationManager.AppSettings["shoppingcart"] += id + "/";
                MessageBox.Show("Game added to shopping cart!");
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

        private void Hyperlink_RequestNavigate(object sender, RequestNavigateEventArgs e)
        {
            Process.Start(new ProcessStartInfo(e.Uri.AbsoluteUri) { UseShellExecute = true });
            e.Handled = true;
        }
    }
}
