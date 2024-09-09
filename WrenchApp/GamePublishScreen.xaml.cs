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
using System.Windows.Shapes;

namespace WrenchApp
{
    /// <summary>
    /// Interaction logic for GamePublishScreen.xaml
    /// </summary>
    public partial class GamePublishScreen : Window
    {
        public GamePublishScreen()
        {
            InitializeComponent();
        }

        private void Drag_Screen(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
            {
                this.DragMove();
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult anwser = MessageBox.Show("Are you sure you want to cancel?", "", MessageBoxButton.YesNo);
            
            if (anwser == MessageBoxResult.Yes)
            {
                this.Close();
            }
        }
    }
}
