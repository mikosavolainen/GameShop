using System;
using System.Collections.Generic;
using System.Linq;
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
    /// Interaction logic for SearchPage.xaml
    /// </summary>
    public partial class SearchPage : Page
    {
        public SearchPage() : this("", "")
        {
        }

        private string order;

        public SearchPage(string tag = "", string search = "")
        {
            InitializeComponent();

            if (tag != "") {
                switch (tag)
                {
                    case "arc":
                        arcadeCb.IsChecked = true;
                        break;
                    case "rpg":
                        rpgCb.IsChecked = true;
                        break;
                    case "adv":
                        adventureCb.IsChecked = true;
                        break;
                    case "str":
                        strategyCb.IsChecked = true;
                        break;
                    case "spo":
                        sportsCb.IsChecked = true;
                        break;
                    case "rac":
                        racingCb.IsChecked = true;
                        break;
                    case "puz":
                        puzzleCb.IsChecked = true;
                        break;
                    case "sim":
                        simulationCb.IsChecked = true;
                        break;
                    default:
                        break;
                }
            }
        
            Searchbox.Text = search;
            order = "descending";
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
